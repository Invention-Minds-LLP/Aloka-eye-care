import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RevealDirective } from '../../shared/reveal.directive';
import { BlogService, formatDate } from '../blog/blog.service';

/** The three newest articles, on the home page. Hidden if the blog has nothing to show. */
@Component({
  selector: 'app-blog-teaser',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
  template: `
    @if (latest().length) {
      <section class="teaser" aria-labelledby="teaser-title">
        <div class="wrap">
          <div class="teaser__head">
            <h2 id="teaser-title" appReveal>From Dr. Aloka's blog</h2>
            <a class="teaser__all" routerLink="/blog">All articles <span aria-hidden="true">→</span></a>
          </div>
          <ul class="teaser__list">
            @for (p of latest(); track p.slug; let i = $index) {
              <li appReveal [style.--delay]="i * 0.08 + 's'">
                <a class="item" [routerLink]="['/blog', p.slug]">
                  <span class="item__img">
                    @if (p.image) {
                      <img [src]="p.image" [alt]="p.imageAlt" loading="lazy" decoding="async" />
                    }
                  </span>
                  <span class="item__meta">{{ date(p.date) }} · {{ p.readingMinutes }} min read</span>
                  <span class="item__title">{{ p.title }}</span>
                </a>
              </li>
            }
          </ul>
        </div>
      </section>
    }
  `,
  styles: `
    :host { display: block; }
    .teaser {
      background: var(--paper);
      padding-block: clamp(5rem, 12vh, 7rem);
    }
    .teaser__head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
    }
    h2 { font-size: var(--step-1); }
    .teaser__all {
      font-weight: 650;
      color: var(--hope);
      text-decoration: none;
    }
    .teaser__all:hover { text-decoration: underline; }
    .teaser__list {
      list-style: none;
      margin: 2.5rem 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: clamp(1.5rem, 3vw, 2.5rem);
    }
    .item {
      display: grid;
      gap: 0.6rem;
      text-decoration: none;
    }
    .item__img {
      display: block;
      aspect-ratio: 16 / 10;
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--card);
      margin-bottom: 0.4rem;
    }
    .item__img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: scale 0.6s var(--ease-out);
    }
    .item:hover img { scale: 1.04; }
    .item:hover .item__title { text-decoration: underline; text-underline-offset: 0.2em; }
    .item__meta {
      font-size: var(--step-small);
      color: var(--ink-faint);
    }
    .item__title {
      font-family: var(--font-display);
      font-size: var(--step-3);
      font-weight: 650;
      line-height: 1.3;
      letter-spacing: -0.015em;
      color: var(--ink);
    }
    @media (max-width: 900px) {
      .teaser__list { grid-template-columns: minmax(0, 1fr); }
    }
  `,
})
export class BlogTeaser {
  private readonly posts = toSignal(inject(BlogService).list().pipe(catchError(() => of([]))), { initialValue: [] });
  protected readonly latest = computed(() => this.posts().slice(0, 3));
  protected readonly date = formatDate;
}
