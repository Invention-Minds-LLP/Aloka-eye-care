import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Icon } from '../../shared/icon';
import { SiteFooter } from '../../shared/site-footer';
import { CLINIC } from '../home/home.content';
import { Doctor } from '../home/story/people';
import { BlogService, Post, formatDate } from './blog.service';
import { BlogAside } from './blog-aside';
import { PageBar } from './page-bar';

type State = { status: 'loading' } | { status: 'missing' } | { status: 'ok'; post: Post };

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, Icon, Doctor, BlogAside],
  template: `
    <app-page-bar />
    <!-- how far through the article: a thin line that fills as you read -->
    <div class="progress" aria-hidden="true"><span [style.transform]="'scaleX(' + read() + ')'"></span></div>
    <main class="article" id="main">
      @switch (state().status) {
        @case ('loading') {
          <p class="wrap article__state" role="status">Loading the article…</p>
        }
        @case ('missing') {
          <div class="wrap article__state">
            <h1>This article isn't here</h1>
            <p>It may have moved. <a routerLink="/blog">See all articles</a>.</p>
          </div>
        }
        @case ('ok') {
          @if (post(); as p) {
            <div class="wrap layout">
            <article class="layout__main">
              <header class="article__head">
                <a class="article__back" routerLink="/blog"><span aria-hidden="true">←</span> All articles</a>
                <h1>{{ p.title }}</h1>
                <p class="article__meta">
                  <span>{{ p.author }}</span>
                  <span aria-hidden="true">·</span>
                  <time [attr.datetime]="p.date">{{ date(p.date) }}</time>
                  <span aria-hidden="true">·</span>
                  <span>{{ p.readingMinutes }} min read</span>
                </p>
                @if (p.categories.length) {
                  <ul class="article__tags" aria-label="Topics">
                    @for (c of p.categories; track c) {
                      <li>{{ c }}</li>
                    }
                  </ul>
                }
              </header>

              @if (p.image) {
                <figure class="article__cover">
                  <img [src]="p.image" [alt]="p.imageAlt" decoding="async" />
                </figure>
              }

              <!-- Built at deploy time from the clinic's own Markdown; trusted. -->
              <div class="prose article__body" [innerHTML]="html()" (input)="onBlockInput($event)"></div>

              <aside class="article__cta" aria-labelledby="cta-title">
                <app-doctor class="article__doctor" mood="joy" arm="wave" />
                <div class="article__cta-copy">
                <h2 id="cta-title">Have a question about your child's eyes?</h2>
                <p>Dr. Aloka Hedau sees children and adults Monday to Saturday, 10 am – 5 pm, in KPHB Phase 6, Kukatpally.</p>
                <div class="article__actions">
                  <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">
                    Book an appointment
                    <app-icon name="arrow" />
                  </a>
                  <a class="btn-wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener">
                    <app-icon name="whatsapp" />
                    WhatsApp
                  </a>
                </div>
                </div>
              </aside>

              @if (p.newer || p.older) {
                <nav class="article__pager" aria-label="More articles">
                  @if (p.older) {
                    <a class="pager pager--older" [routerLink]="['/blog', p.older.slug]">
                      <span class="pager__label">Older</span>
                      <span class="pager__title">{{ p.older.title }}</span>
                    </a>
                  }
                  @if (p.newer) {
                    <a class="pager pager--newer" [routerLink]="['/blog', p.newer.slug]">
                      <span class="pager__label">Newer</span>
                      <span class="pager__title">{{ p.newer.title }}</span>
                    </a>
                  }
                </nav>
              }
            </article>
            <aside class="layout__side" aria-label="From the clinic"><app-blog-aside /></aside>
            </div>
          }
        }
      }
    </main>
    <app-site-footer />
  `,
  styleUrl: './blog-post.scss',
})
export default class BlogPost {
  /** From the route: /blog/:slug */
  readonly slug = input.required<string>();

  private readonly blog = inject(BlogService);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly clinic = CLINIC;
  protected readonly date = formatDate;
  /** 0..1, how much of the article has been scrolled past. */
  protected readonly read = signal(0);

  protected readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        this.blog.post(slug).pipe(
          map((post): State => ({ status: 'ok', post })),
          catchError(() => of<State>({ status: 'missing' })),
          startWith<State>({ status: 'loading' }),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as State },
  );
  protected readonly post = computed(() => {
    const s = this.state();
    return s.status === 'ok' ? s.post : null;
  });
  /** The HTML comes only from scripts/build-blog.mjs rendering the repo's own posts, so it is trusted as-is
   *  (the sanitizer would otherwise strip the before/after slider's range input). */
  protected readonly html = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.post()?.html ?? ''));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = () => {
        const body = document.querySelector<HTMLElement>('.article__body');
        if (!body) return;
        const r = body.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.6;
        this.read.set(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / Math.max(1, total))));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
      // Pin the sidebar so its whole height can always be reached.
      const fitSide = () => {
        const side = document.querySelector<HTMLElement>('.layout__side');
        if (!side) return;
        const top = Math.min(96, window.innerHeight - side.offsetHeight - 24);
        side.style.setProperty('--side-top', top + 'px');
      };
      const ro = new ResizeObserver(fitSide);
      let watched: HTMLElement | null = null;
      const watch = () => {
        const side = document.querySelector<HTMLElement>('.layout__side');
        if (side && side !== watched) {
          watched = side;
          ro.observe(side);
        }
        fitSide();
      };
      setTimeout(watch, 0);
      window.addEventListener('scroll', watch, { passive: true, once: true });
      window.addEventListener('resize', fitSide, { passive: true });
      destroyRef.onDestroy(() => {
        ro.disconnect();
        window.removeEventListener('resize', fitSide);
      });
    });
    const seo = inject(SeoService);
    effect(() => {
      const p = this.post();
      if (!p) return;
      seo.set({
        title: `${p.title} | Dr. Aloka's Eye Care, Hyderabad`,
        description: p.description,
        path: `/blog/${p.slug}/`,
        image: p.image || undefined,
        type: 'article',
        jsonLd: [
          breadcrumbs(['Blog', '/blog/'], [p.title, `/blog/${p.slug}/`]),
          {
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            image: p.image ? SITE + p.image : undefined,
            author: { '@id': SITE + '/#doctor' },
            publisher: { '@id': SITE + '/#clinic' },
            mainEntityOfPage: `${SITE}/blog/${p.slug}/`,
            inLanguage: 'en-IN',
          },
        ],
      });
    });
  }

  /** The before/after block's slider: move the wipe as the range moves. */
  protected onBlockInput(e: Event): void {
    const range = e.target as HTMLInputElement;
    if (!range.classList?.contains('blk-compare__range')) return;
    range.closest<HTMLElement>('.blk-compare')?.style.setProperty('--reveal', `${range.value}%`);
  }
}
