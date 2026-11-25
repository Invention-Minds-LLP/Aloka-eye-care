import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { Rings } from '../../shared/rings';
import { SiteFooter } from '../../shared/site-footer';
import { BlogService, formatDate } from './blog.service';
import { PageBar } from './page-bar';

@Component({
  selector: 'app-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Rings, ParallaxDirective],
  template: `
    <app-page-bar />
    <main class="blog" id="main">
      <section class="page-hero blog-hero" aria-labelledby="blog-title">
        <app-rings [appParallax]="-0.12" />
        <div class="wrap">
          <ol class="crumbs" aria-label="Breadcrumb">
            <li><a routerLink="/">Home</a></li>
            <li aria-current="page">Blog</li>
          </ol>
          <span class="eyebrow blog-hero__eyebrow">Blog</span>
          <h1 id="blog-title">Eye care, explained for parents</h1>
          <p class="page-hero__lede">
            Short, clear articles by Dr. Aloka Hedau on children's eyes, squint, myopia and when to get your child's eyes checked.
          </p>
          @if (posts(); as all) {
            <p class="blog-hero__count">{{ all.length }} articles · written for families, not textbooks</p>
          }
        </div>
      </section>

      <section class="blog__list" aria-label="Articles">
        <div class="wrap">
          @if (posts() === undefined) {
            <p class="blog__state" role="status">Loading articles…</p>
          } @else if (posts() === null) {
            <p class="blog__state" role="alert">The articles couldn't be loaded. Please refresh the page.</p>
          } @else {
            @if (categories().length > 1) {
              <div class="filters" role="group" aria-label="Filter by topic">
                <button type="button" [class.is-on]="!topic()" [attr.aria-pressed]="!topic()" (click)="topic.set(null)">All topics</button>
                @for (c of categories(); track c) {
                  <button type="button" [class.is-on]="topic() === c" [attr.aria-pressed]="topic() === c" (click)="topic.set(c)">{{ c }}</button>
                }
              </div>
            }

            @if (shown(); as list) {
              @if (list.length === 0) {
                <p class="blog__state">No articles in this topic yet.</p>
              }
              <ol class="posts">
                @for (p of list; track p.slug; let first = $first; let i = $index) {
                  <li class="post" [class.post--lead]="first && !topic()" [style.--delay]="delay(i)" appReveal>
                    <a class="post__link" [routerLink]="['/blog', p.slug]">
                      <span class="post__img">
                        @if (p.image) {
                          <img [src]="p.image" [alt]="p.imageAlt" loading="lazy" decoding="async" />
                        }
                      </span>
                      <span class="post__body">
                        <span class="post__top">
                          @if (p.categories[0]; as c) {
                            <span class="post__chip">{{ c }}</span>
                          }
                          <span class="post__meta">{{ date(p.date) }} · {{ p.readingMinutes }} min read</span>
                        </span>
                        <span class="post__title">{{ p.title }}</span>
                        <span class="post__desc">{{ p.description }}</span>
                        <span class="more post__more">Read article <span aria-hidden="true">→</span></span>
                      </span>
                    </a>
                  </li>
                }
              </ol>
            }
          }
        </div>
      </section>
    </main>
    <app-site-footer />
  `,
  styleUrl: './blog-list.scss',
})
export default class BlogList {
  private readonly blog = inject(BlogService);
  /** undefined while loading, null on error. */
  protected readonly posts = toSignal(this.blog.list().pipe(catchError(() => of(null))));
  protected readonly topic = signal<string | null>(null);
  protected readonly categories = computed(() => [...new Set((this.posts() ?? []).flatMap((p) => p.categories))].sort());
  protected readonly shown = computed(() => {
    const t = this.topic();
    const all = this.posts() ?? [];
    return t ? all.filter((p) => p.categories.includes(t)) : all;
  });
  protected readonly date = formatDate;

  /** Cards in a row rise in one after another. */
  protected delay(i: number): string {
    return `${((i % 3) * 0.09).toFixed(2)}s`;
  }

  constructor() {
    inject(SeoService).set({
      title: "Children's Eye Health Blog | Dr. Aloka's Eye Care, Kukatpally, Hyderabad",
      description:
        'Articles by paediatric ophthalmologist Dr. Aloka Hedau on children’s eyes, squint, myopia and when to get your child’s eyes checked, from Kukatpally, Hyderabad.',
      path: '/blog/',
      jsonLd: [breadcrumbs(['Blog', '/blog/'])],
    });
  }
}
