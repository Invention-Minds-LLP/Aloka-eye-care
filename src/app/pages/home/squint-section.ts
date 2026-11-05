import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { MotionService, clamp } from '../../core/motion.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CLINIC } from './home.content';

/**
 * Squint surgery. The pair of eyes above the heading straightens as the section scrolls in:
 * the turned eye comes round until both look the same way.
 */
@Component({
  selector: 'app-squint-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective],
  template: `
    <section class="sq" id="squint-surgery" aria-labelledby="squint-title">
      <div class="wrap">
        <div class="sq__top">
          <div class="eyes" #eyes aria-hidden="true">
            <svg viewBox="0 0 300 110" focusable="false">
              <path d="M20 55 Q75 5 130 55 Q75 105 20 55 Z" fill="#fbf8f2" />
              <circle cx="75" cy="55" r="23" fill="#6b4a32" /><circle cx="75" cy="55" r="11" fill="#1f1614" />
              <circle cx="67" cy="47" r="5" fill="#fff" />
              <path d="M170 55 Q225 5 280 55 Q225 105 170 55 Z" fill="#fbf8f2" />
              <g class="eyes__turn">
                <circle cx="225" cy="55" r="23" fill="#6b4a32" /><circle cx="225" cy="55" r="11" fill="#1f1614" />
                <circle cx="217" cy="47" r="5" fill="#fff" />
              </g>
              <!-- brows lift a little once the eyes are straight -->
              <path class="eyes__brow" d="M30 22 Q75 6 120 20 M180 20 Q225 6 270 22" fill="none" stroke="#1f1614" stroke-width="6" stroke-linecap="round" />
            </svg>
          </div>
          <div class="sq__head">
            <h2 id="squint-title" appReveal>Squint surgery, for children and adults</h2>
            <p class="sq__lede" appReveal style="--delay: 0.1s">
              A squint is more than how the eyes look. Correcting it helps both eyes work as a team again, for depth, reading and
              confidence. Dr. Aloka Hedau is a paediatric ophthalmologist and adult
              squint surgeon with more than twenty years of experience, and treats complex squints too.
            </p>
          </div>
        </div>

        <div class="paths">
          <article class="path" appReveal>
            <h3>For children</h3>
            <p>
              A child with a squint should ideally be treated before the age of 8, while vision is still developing. Waiting longer risks
              losing binocular vision for good.
            </p>
            <ul>
              <li>Pain-free, under safe anaesthesia</li>
              <li>Glasses, patching or vision therapy first, where they can work</li>
              <li>Surgery when it's the right step for your child</li>
            </ul>
          </article>
          <article class="path" appReveal style="--delay: 0.1s">
            <h3>For adults</h3>
            <p>Age is no bar. Adults can have a long-standing squint corrected, whether it is cosmetic or caused by weak eye muscles.</p>
            <ul>
              <li>Cosmetic and paralytic squint correction</li>
              <li>Complex cases: Duane's and Brown's syndrome</li>
              <li>Botox injection as an alternative for paralytic squint</li>
            </ul>
          </article>
        </div>

        <div class="tech" appReveal>
          <p class="tech__label">Techniques used</p>
          <ul>
            <li>Sutureless</li>
            <li>Micro-incision</li>
            <li>Absorbable sutures</li>
            <li>Adjustable sutures</li>
          </ul>
        </div>

        <dl class="answers">
          <div appReveal>
            <dt>Is it painful?</dt>
            <dd>No. It is done under local or general anaesthesia.</dd>
          </div>
          <div appReveal style="--delay: 0.08s">
            <dt>Will there be a scar?</dt>
            <dd>Minimal incisions and absorbable sutures leave no external scarring.</dd>
          </div>
          <div appReveal style="--delay: 0.16s">
            <dt>Is it only cosmetic?</dt>
            <dd>No. It restores binocular vision and depth perception, and helps reverse lazy eye.</dd>
          </div>
          <div appReveal style="--delay: 0.24s">
            <dt>How many has the clinic done?</dt>
            <dd><strong>20K+</strong> paediatric and adult squint surgeries, as published by the clinic.</dd>
          </div>
        </dl>

        <div class="sq__cta">
          <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Book a squint consultation <app-icon name="arrow" /></a>
          <a class="btn-wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener"><app-icon name="whatsapp" /> Ask on WhatsApp</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './squint-section.scss',
})
export class SquintSection {
  protected readonly clinic = CLINIC;
  private readonly eyes = viewChild.required<ElementRef<HTMLElement>>('eyes');

  constructor() {
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.eyes().nativeElement;
      let p = 0;
      motion.register(
        {
          read: () => {
            const r = el.getBoundingClientRect();
            p = clamp((motion.viewportH - r.top) / (motion.viewportH * 0.6));
          },
          write: () => {
            const v = motion.reduced() ? 1 : clamp((p - 0.3) / 0.55);
            el.style.setProperty('--straight', v.toFixed(3));
          },
        },
        destroyRef,
      );
    });
  }
}
