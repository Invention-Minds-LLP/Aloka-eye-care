import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { RevealDirective } from '../../shared/reveal.directive';

interface Review {
  author: string;
  authorUrl: string;
  photo: string;
  rating: number;
  when: string;
  text: string;
}
interface Reviews {
  source: 'google' | 'manual' | 'none';
  rating: number | null;
  count: number | null;
  reviewsUrl: string;
  writeUrl: string;
  mapsUrl: string;
  reviews: Review[];
}

/** Google reviews, from public/site-data/google-reviews.json (written at build time by scripts/fetch-reviews.mjs). */
@Component({
  selector: 'app-google-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    @if (data(); as d) {
      <section class="gr" id="reviews" aria-labelledby="reviews-title">
        <div class="wrap">
          <div class="gr__head">
            <div>
              <p class="gr__brand" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7Z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9Z"/></svg>
                Google reviews
              </p>
              <h2 id="reviews-title" appReveal>What families say on Google</h2>
            </div>

            @if (d.rating) {
              <div class="score" appReveal style="--delay: 0.1s">
                <span class="score__num">{{ d.rating.toFixed(1) }}</span>
                <span class="score__meta">
                  <span class="stars" [attr.aria-label]="d.rating.toFixed(1) + ' out of 5 stars'" role="img">
                    @for (s of five; track s) {
                      <span class="star" [style.--fill]="fill(d.rating, s)"></span>
                    }
                  </span>
                  @if (d.count) {
                    <span class="score__count">{{ d.count.toLocaleString('en-IN') }} reviews</span>
                  }
                </span>
              </div>
            }
          </div>

          @if (d.reviews.length) {
            <div class="rail-wrap">
              <ul class="rail" #rail tabindex="0" aria-label="Reviews" (scroll)="onScroll()">
                @for (r of d.reviews; track r.author + r.when; let i = $index) {
                  <li class="rev" appReveal [style.--delay]="i * 0.06 + 's'">
                    <div class="rev__who">
                      @if (r.photo) {
                        <img class="rev__photo" [src]="r.photo" alt="" width="40" height="40" loading="lazy" referrerpolicy="no-referrer" />
                      } @else {
                        <span class="rev__photo rev__photo--initial" aria-hidden="true">{{ r.author.charAt(0) }}</span>
                      }
                      <span class="rev__name">
                        @if (r.authorUrl) {
                          <a [href]="r.authorUrl" target="_blank" rel="noopener">{{ r.author }}</a>
                        } @else {
                          {{ r.author }}
                        }
                        @if (r.when) {
                          <span class="rev__when">{{ r.when }}</span>
                        }
                      </span>
                    </div>
                    <span class="stars stars--sm" [attr.aria-label]="r.rating + ' out of 5 stars'" role="img">
                      @for (s of five; track s) {
                        <span class="star" [style.--fill]="fill(r.rating, s)"></span>
                      }
                    </span>
                    <p class="rev__text" [class.is-open]="open().has(i)">{{ r.text }}</p>
                    @if (r.text.length > 220) {
                      <button type="button" class="rev__more" (click)="toggle(i)" [attr.aria-expanded]="open().has(i)">
                        {{ open().has(i) ? 'Show less' : 'Read more' }}
                      </button>
                    }
                  </li>
                }
              </ul>
              @if (d.reviews.length > 1 && !(atStart() && atEnd())) {
                <div class="rail__nav">
                  <button type="button" (click)="page(-1)" [disabled]="atStart()" aria-label="Previous reviews">←</button>
                  <button type="button" (click)="page(1)" [disabled]="atEnd()" aria-label="Next reviews">→</button>
                </div>
              }
            </div>
          }

          <div class="gr__actions">
            <a class="gr__all" [href]="d.mapsUrl || d.reviewsUrl" target="_blank" rel="noopener">
              {{ d.reviews.length ? 'Read all reviews on Google' : 'Read our reviews on Google' }}
            </a>
            <a class="gr__write" [href]="d.writeUrl" target="_blank" rel="noopener">Visited us? Leave a review</a>
          </div>
          @if (d.source === 'google') {
            <p class="gr__note">Reviews and rating from Google, updated automatically.</p>
          }
        </div>
      </section>
    }
  `,
  styleUrl: './google-reviews.scss',
})
export class GoogleReviews {
  protected readonly data = toSignal(inject(HttpClient).get<Reviews>('/site-data/google-reviews.json').pipe(catchError(() => of(null))));
  protected readonly five = [1, 2, 3, 4, 5];
  protected readonly open = signal(new Set<number>());
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);
  private readonly rail = viewChild<ElementRef<HTMLElement>>('rail');

  constructor() {
    // once the reviews render, grey out the arrows that have nowhere to go
    afterRenderEffect(() => {
      this.data();
      if (this.rail()) this.onScroll();
    });
  }

  /** How much of star `s` is filled, as a percentage. */
  protected fill(rating: number, s: number): string {
    return Math.round(Math.min(1, Math.max(0, rating - (s - 1))) * 100) + '%';
  }
  protected toggle(i: number): void {
    this.open.update((o) => {
      const n = new Set(o);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  }
  protected page(dir: 1 | -1): void {
    const el = this.rail()?.nativeElement;
    el?.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  }
  protected onScroll(): void {
    const el = this.rail()?.nativeElement;
    if (!el) return;
    this.atStart.set(el.scrollLeft < 8);
    this.atEnd.set(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }
}
