import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GALLERY } from '../pages/pages.content';

/** The wide before/after pairs from the clinic's "Surgical outcomes" album. */
const STRIPS = GALLERY.filter((p) => p.album === 'outcomes' && p.w / p.h > 2.6);

/**
 * Real surgery results from the clinic's gallery, drifting slowly past like a film strip.
 * Hover or focus pauses it; with reduced motion it becomes a row you can scroll.
 */
@Component({
  selector: 'app-results-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="strip" role="region" aria-label="Before and after surgery, from the clinic's gallery">
      <div class="strip__track">
        <!-- the list twice, so the loop has no seam; the copy is hidden from screen readers -->
        @for (copy of [0, 1]; track copy) {
          <ul class="strip__set" [attr.aria-hidden]="copy === 1 ? 'true' : null">
            @for (p of strips; track p.src) {
              <li>
                <a routerLink="/gallery/" fragment="outcomes" [attr.tabindex]="copy === 1 ? -1 : null">
                  <img [src]="p.thumb" [alt]="copy === 1 ? '' : p.caption" [width]="p.w" [height]="p.h" loading="lazy" decoding="async" />
                </a>
              </li>
            }
          </ul>
        }
      </div>
    </div>
    <p class="strip__note">
      Patients before and after squint and nystagmus surgery, as published by the clinic.
      <a routerLink="/gallery/" fragment="outcomes">See all results in the gallery →</a>
    </p>
  `,
  styles: `
    :host { display: block; }
    .strip {
      overflow: hidden;
      /* soft edges, so photos glide in and out rather than being cut off */
      mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
    }
    .strip__track {
      display: flex;
      width: max-content;
    }
    .strip__set {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0 1rem 0 0;
    }
    li a {
      display: block;
      border-radius: 12px;
      overflow: hidden;
      background: var(--mist);
      box-shadow: inset 0 0 0 1px var(--steel-300);
      transition: transform 0.35s var(--ease-out);
      &:hover { transform: translateY(-3px); }
      &:focus-visible { outline: 3px solid var(--teal-ink); outline-offset: 3px; }
    }
    img {
      display: block;
      height: clamp(96px, 11vw, 132px);
      width: auto;
    }
    :host-context(html.motion-ok) .strip__track {
      animation: drift 70s linear infinite;
    }
    .strip:hover .strip__track,
    .strip:focus-within .strip__track {
      animation-play-state: paused;
    }
    @keyframes drift {
      to { transform: translateX(-50%); }
    }
    /* no motion: a plain row to scroll by hand, without the duplicate */
    @media (prefers-reduced-motion: reduce) {
      .strip { overflow-x: auto; mask-image: none; }
      .strip__set[aria-hidden] { display: none; }
    }
    .strip__note {
      margin-top: 0.9rem;
      font-size: var(--step-small);
      color: var(--ink-soft);
      a { color: var(--teal-ink); font-weight: 600; white-space: nowrap; }
    }
  `,
})
export class ResultsStrip {
  protected readonly strips = STRIPS;
}
