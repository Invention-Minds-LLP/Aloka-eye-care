import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { GALLERY } from '../pages.content';
import { CLINIC } from './home.content';

/** Every photo in the clinic's "Surgical outcomes" album. */
const RESULTS = GALLERY.filter((p) => p.album === 'outcomes');

/**
 * Patient results, high on the page: one large before/after photo at a time,
 * with thumbnails to jump to any of them. Moves on by itself every few seconds
 * until the visitor touches it; never moves with reduced motion.
 */
@Component({
  selector: 'app-results-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, RouterLink],
  template: `
    <section class="res" id="results" aria-labelledby="results-title">
      <div class="wrap">
        <header class="res__head">
          <div>
            <p class="res__eyebrow">Patient results</p>
            <h2 id="results-title" appReveal>Real patients. Real results.</h2>
          </div>
          <p class="res__lede">
            Before and after photos of Dr. Aloka's patients: squint correction in children and adults, and nystagmus surgery. Photographs as
            published by the clinic.
          </p>
        </header>

        <div
          class="stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Before and after photos"
          (pointerenter)="hold.set(true)"
          (pointerleave)="hold.set(false)"
          (focusin)="hold.set(true)"
          (focusout)="hold.set(false)"
          (touchstart)="touchStart($event)"
          (touchend)="touchEnd($event)"
        >
          <figure class="stage__fig" [attr.aria-live]="touched() ? 'polite' : 'off'">
            @for (p of [current()]; track p.src) {
              <img class="stage__img" [src]="p.src" [alt]="p.caption" [width]="p.w" [height]="p.h" decoding="async" />
            }
            <figcaption>
              <span class="stage__count">{{ index() + 1 }} / {{ results.length }}</span>
              {{ current().caption }}
            </figcaption>
          </figure>
          <button type="button" class="stage__nav stage__nav--prev" (click)="go(-1)">
            <app-icon name="arrow" /><span class="visually-hidden">Previous result</span>
          </button>
          <button type="button" class="stage__nav stage__nav--next" (click)="go(1)">
            <app-icon name="arrow" /><span class="visually-hidden">Next result</span>
          </button>
        </div>

        <ul class="thumbs" aria-label="Choose a result">
          @for (p of results; track p.src; let i = $index) {
            <li>
              <button type="button" [class.is-on]="i === index()" [attr.aria-current]="i === index() ? 'true' : null" (click)="pick(i)">
                <img [src]="p.thumb" alt="" [width]="p.w" [height]="p.h" loading="lazy" decoding="async" />
                <span class="visually-hidden">Show result {{ i + 1 }}: {{ p.caption }}</span>
              </button>
            </li>
          }
        </ul>

        <div class="res__foot">
          <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Book a consultation <app-icon name="arrow" /></a>
          <a class="res__more" routerLink="/gallery/" fragment="outcomes">See all photos in the gallery</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .res {
      background: var(--paper);
      padding-block: clamp(4.5rem, 11vh, 7rem);
      border-block: 1px solid var(--steel-300);
    }
    .res__head {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 1rem 3rem;
      align-items: end;
      margin-bottom: 2rem;
    }
    .res__eyebrow { font-size: var(--step-small); font-weight: 650; color: var(--teal-ink); margin-bottom: 0.6rem; }
    h2 { font-size: var(--step-1); }
    .res__lede { color: var(--ink-soft); max-width: 52ch; }

    .stage {
      position: relative;
      border-radius: calc(var(--radius) * 1.4);
      background: var(--card);
      box-shadow: var(--lift);
      overflow: hidden;
    }
    .stage__fig {
      margin: 0;
      display: grid;
      grid-template-rows: minmax(0, 1fr) auto;
      height: clamp(300px, 46vw, 520px);
    }
    .stage__img {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 0;
      object-fit: contain;
      padding: clamp(0.75rem, 2vw, 1.5rem) clamp(3.5rem, 7vw, 5.5rem);
    }
    :host-context(html.motion-ok) .stage__img { animation: fade 0.5s var(--ease-out); }
    @keyframes fade { from { opacity: 0; } }
    figcaption {
      display: flex;
      gap: 0.9rem;
      align-items: baseline;
      padding: 0.9rem 1.25rem;
      background: #fff;
      border-top: 1px solid #e7e1d6;
      color: var(--ink-dark);
      font-weight: 600;
    }
    .stage__count {
      flex: none;
      font-size: var(--step-small);
      font-weight: 700;
      color: var(--ink-dark-soft);
      font-variant-numeric: tabular-nums;
    }
    .stage__nav {
      --icon: 1.3rem;
      position: absolute;
      top: calc(50% - 1.6rem);
      translate: 0 -50%;
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border: 0;
      border-radius: 999px;
      background: var(--ink-dark);
      color: #fff;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover { background: var(--hope-action); }
    }
    /* the arrow icon points up-right; the round button turns it */
    .stage__nav--prev { left: 0.75rem; rotate: -135deg; }
    .stage__nav--next { right: 0.75rem; rotate: 45deg; }

    .thumbs {
      list-style: none;
      margin: 1rem 0 0;
      padding: 0.25rem 0.1rem 0.5rem;
      display: flex;
      gap: 0.6rem;
      overflow-x: auto;
      scrollbar-width: thin;
      button {
        display: block;
        padding: 0;
        border: 0;
        border-radius: 10px;
        overflow: hidden;
        background: var(--card);
        cursor: pointer;
        opacity: 0.55;
        box-shadow: inset 0 0 0 2px transparent;
        transition: opacity 0.2s, box-shadow 0.2s;
        &:hover { opacity: 0.9; }
        &.is-on { opacity: 1; outline: 3px solid var(--hope); outline-offset: 2px; }
      }
      img { display: block; height: 64px; width: auto; max-width: 180px; object-fit: cover; }
    }
    .res__foot {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem 1.75rem;
      margin-top: 2rem;
    }
    .res__more { color: var(--teal-ink); font-weight: 600; }

    @media (max-width: 800px) {
      .res__head { grid-template-columns: minmax(0, 1fr); }
      .stage__fig { height: clamp(240px, 70vw, 420px); }
      .stage__img { padding-inline: 0.75rem; }
      .stage__nav { width: 2.5rem; height: 2.5rem; top: auto; bottom: 4.2rem; translate: none; }
      figcaption { font-size: var(--step-small); }
    }
  `,
})
export class ResultsSection {
  protected readonly clinic = CLINIC;
  protected readonly results = RESULTS;
  protected readonly index = signal(0);
  protected readonly current = computed(() => RESULTS[this.index()]);
  /** Pointer or focus inside the carousel: don't move. */
  protected readonly hold = signal(false);
  /** Once the visitor picks a photo, the carousel stops moving for good. */
  protected readonly touched = signal(false);
  private touchX = 0;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let visible = false;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
      io.observe(host);
      const timer = window.setInterval(() => {
        if (visible && !this.hold() && !this.touched() && document.visibilityState === 'visible') this.step(1);
      }, 4500);
      destroyRef.onDestroy(() => {
        io.disconnect();
        clearInterval(timer);
      });
    });
  }

  protected go(by: number): void {
    this.touched.set(true);
    this.step(by);
  }
  protected pick(i: number): void {
    this.touched.set(true);
    this.index.set(i);
  }
  protected touchStart(e: TouchEvent): void {
    this.touchX = e.touches[0].clientX;
  }
  protected touchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchX;
    if (Math.abs(dx) > 50) this.go(dx < 0 ? 1 : -1);
  }
  private step(by: number): void {
    const n = RESULTS.length;
    this.index.update((i) => (i + by + n) % n);
  }
}
