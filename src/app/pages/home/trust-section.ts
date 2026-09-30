import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Kite } from '../../shared/kite';
import { RevealDirective } from '../../shared/reveal.directive';
import { ANSWERS, CLINIC, TELUGU, TRUST } from './home.content';

/** Sankranti paper: each reason flies on its own kite. */
const PAPER: [string, string][] = [
  ['#e0457b', '#b02457'],
  ['#f2b134', '#d9931a'],
  ['#4fb3d9', '#2a8cb0'],
  ['#f7d56b', '#d9ae2a'],
  ['#9a6fd6', '#6f49ad'],
  ['#f08a3e', '#c9621f'],
];

@Component({
  selector: 'app-trust-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Kite, RevealDirective, RouterLink],
  template: `
    <section class="trust" id="trust" aria-labelledby="trust-title">
      <!-- the evening sky over Hyderabad, full of kites -->
      <div class="sky" aria-hidden="true">
        @for (k of sky; track $index) {
          <app-kite
            class="sky__kite"
            [style.left.%]="k.x"
            [style.top.%]="k.y"
            [style.width.px]="k.w"
            [style.--r]="k.r + 'deg'"
            [style.--d]="k.d + 's'"
            [style.opacity]="k.o"
            [left]="k.paper[0]"
            [right]="k.paper[1]"
          />
        }
      </div>

      <div class="wrap">
        <div class="trust__head">
          <h2 id="trust-title" appReveal>Why Hyderabad families trust Dr. Aloka</h2>
          <p class="trust__myth" appReveal style="--delay: 0.1s">
            <span lang="te">{{ te.myth }}</span>
            <span class="trust__myth-en">{{ te.mythEn }} An untreated squint causes irreversible vision loss and hurts a child's
              self-esteem. The years before age 8 matter most.</span>
          </p>
        </div>

        <ul class="points">
          @for (t of trust; track t.title; let i = $index) {
            <li class="point" appReveal [style.--delay]="(i % 3) * 0.12 + 's'" [style.--sway]="(i % 2 ? -1 : 1) * 5 + 'deg'">
              <span class="point__flight" aria-hidden="true">
                <app-kite class="point__kite" [left]="paper[i % paper.length][0]" [right]="paper[i % paper.length][1]" />
                <span class="point__string"></span>
              </span>
              <h3>{{ t.title }}</h3>
              <p>{{ t.body }}</p>
            </li>
          }
        </ul>

        <div class="faq">
          <h3 class="faq__title">What parents and grandparents ask first</h3>
          @for (a of answers; track a.q) {
            <details>
              <summary>{{ a.q }}</summary>
              <p>{{ a.a }}</p>
            </details>
          }
          <a class="faq__more" routerLink="/faq/">More answers on the FAQ page</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './trust-section.scss',
})
export class TrustSection {
  protected readonly trust = TRUST;
  protected readonly answers = ANSWERS;
  protected readonly te = TELUGU;
  protected readonly clinic = CLINIC;
  protected readonly paper = PAPER;

  /** Kites at every depth in the sky behind: smaller = farther = fainter. */
  protected readonly sky = (() => {
    let s = 21;
    const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 14 }, (_, i) => {
      const depth = r();
      return {
        x: r() * 94,
        y: r() * 88,
        w: 18 + depth * 34,
        r: -20 + r() * 40,
        d: -r() * 8,
        o: 0.18 + depth * 0.32,
        paper: PAPER[i % PAPER.length],
      };
    });
  })();
}
