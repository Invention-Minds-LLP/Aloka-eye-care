import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { ANSWERS, CLINIC, TELUGU, TRUST } from './home.content';

@Component({
  selector: 'app-trust-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="trust" id="trust" aria-labelledby="trust-title">
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
            <li appReveal [style.--delay]="(i % 3) * 0.08 + 's'">
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
          <a class="faq__more" [href]="clinic.legacySite + '/faq/'">More answers on the FAQ page</a>
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
}
