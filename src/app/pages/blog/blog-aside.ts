import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Lea } from '../../shared/lea';
import { CLINIC } from '../home/home.content';
import { Banner, BlogService } from './blog.service';

const ROTATE_MS = 7000;

/**
 * The article sidebar, edited by the clinic in the CMS (content/banners.yml):
 * a rotating "At the clinic" slot (offers and announcements), the clinic's published figures,
 * and families' words. Items with dates only show between their start and end.
 */
@Component({
  selector: 'app-blog-aside',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Lea],
  template: `
    @if (updates().length) {
      <section class="card card--update" aria-labelledby="aside-update" (mouseenter)="hold.set(true)" (mouseleave)="hold.set(false)">
        <h2 id="aside-update" class="card__label">
          <app-lea shape="house" />{{ current().kind === 'offer' ? 'Offer at the clinic' : 'At the clinic' }}
        </h2>
        @for (b of [current()]; track b.title + b.text) {
          <div class="slide" aria-live="polite">
            @if (b.title) {
              <p class="update__title">{{ b.title }}</p>
            }
            @if (b.text) {
              <p class="update__text">{{ b.text }}</p>
            }
            @if (until(b); as u) {
              <p class="update__until">{{ u }}</p>
            }
            @if (b.link) {
              <a class="btn-book update__btn" [href]="b.link" [attr.target]="external(b.link) ? '_blank' : null" rel="noopener">{{ b.linkLabel || 'Find out more' }}</a>
            }
          </div>
        }
        @if (updates().length > 1) {
          <div class="dots" role="group" aria-label="Choose an update">
            @for (b of updates(); track $index; let i = $index) {
              <button type="button" [class.is-on]="i === updateIdx()" [attr.aria-label]="'Update ' + (i + 1)" [attr.aria-pressed]="i === updateIdx()" (click)="updateIdx.set(i)"></button>
            }
          </div>
        }
      </section>
    }

    @if (figures().length) {
      <section class="card" aria-labelledby="aside-figures">
        <h2 id="aside-figures" class="card__label"><app-lea shape="circle" />Families we have helped</h2>
        <ul class="figures">
          @for (f of figures(); track f.title + f.text) {
            <li>
              <strong>{{ f.title }}</strong>
              <span>{{ f.text }}</span>
            </li>
          }
        </ul>
        <p class="figures__note">Figures as published by the clinic.</p>
      </section>
    }

    @if (voices().length) {
      <section class="card card--voice" aria-labelledby="aside-voices" (mouseenter)="hold.set(true)" (mouseleave)="hold.set(false)">
        <h2 id="aside-voices" class="card__label"><app-lea shape="apple" />What parents say</h2>
        @for (v of [voice()]; track v.text) {
          <blockquote class="slide">
            <p>“{{ v.text }}”</p>
            @if (v.author) {
              <footer>{{ v.author }}</footer>
            }
          </blockquote>
        }
        @if (voices().length > 1) {
          <div class="dots" role="group" aria-label="Choose a review">
            @for (v of voices(); track $index; let i = $index) {
              <button type="button" [class.is-on]="i === voiceIdx()" [attr.aria-label]="'Review ' + (i + 1)" [attr.aria-pressed]="i === voiceIdx()" (click)="voiceIdx.set(i)"></button>
            }
          </div>
        }
      </section>
    }

    <a class="card card--wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener">
      <span class="wa__title">Have a quick question?</span>
      <span class="wa__text">Message the clinic on WhatsApp</span>
    </a>
  `,
  styleUrl: './blog-aside.scss',
})
export class BlogAside {
  protected readonly clinic = CLINIC;
  private readonly all = toSignal(inject(BlogService).banners().pipe(catchError(() => of([] as Banner[]))), { initialValue: [] });
  /** Re-checked every minute, so scheduled items start and stop on time. */
  private readonly now = signal(Date.now());
  private readonly live = computed(() => {
    const t = this.now();
    return this.all().filter((b) => (!b.start || Date.parse(b.start) <= t) && (!b.end || Date.parse(b.end) >= t));
  });

  /** Offers first, then announcements. */
  protected readonly updates = computed(() => [
    ...this.live().filter((b) => b.kind === 'offer'),
    ...this.live().filter((b) => b.kind === 'announcement'),
  ]);
  protected readonly figures = computed(() => this.live().filter((b) => b.kind === 'figure'));
  protected readonly voices = computed(() => this.live().filter((b) => b.kind === 'testimonial'));

  protected readonly updateIdx = signal(0);
  protected readonly voiceIdx = signal(0);
  protected readonly hold = signal(false);
  protected readonly current = computed(() => this.updates()[this.updateIdx() % Math.max(1, this.updates().length)]);
  protected readonly voice = computed(() => this.voices()[this.voiceIdx() % Math.max(1, this.voices().length)]);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const clock = setInterval(() => this.now.set(Date.now()), 60_000);
      // Rotate on its own, but never while the visitor is reading a card or the tab is hidden.
      const spin = still
        ? 0
        : setInterval(() => {
            if (this.hold() || document.hidden) return;
            if (this.updates().length > 1) this.updateIdx.update((i) => (i + 1) % this.updates().length);
            if (this.voices().length > 1) this.voiceIdx.update((i) => (i + 1) % this.voices().length);
          }, ROTATE_MS);
      destroyRef.onDestroy(() => {
        clearInterval(clock);
        if (spin) clearInterval(spin);
      });
    });
  }

  protected until(b: Banner): string {
    if (!b.end) return '';
    const d = new Date(b.end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' });
    return `Until ${d}`;
  }
  protected external(link: string): boolean {
    return /^https?:\/\//.test(link) && !link.startsWith('https://dralokaseyecare.com');
  }
}
