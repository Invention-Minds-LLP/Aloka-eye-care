import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { FIGURES, VOICES } from './home.content';

/** Lens theme: the result is seen through a trial lens, as in the eye test itself. */
@Component({
  selector: 'app-families-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="fam" id="families" aria-labelledby="families-title">
      <div class="wrap fam__grid">
        <figure class="compare" [style.--reveal]="reveal() + '%'">
          <div class="lens" #lens (pointermove)="glint($event)" (pointerleave)="glintReset()">
            <div class="lens__glass">
              <img src="images/squint-before.webp" alt="" width="420" height="420" loading="lazy" decoding="async" />
              <img class="compare__after" src="images/squint-after.webp" alt="" width="420" height="420" loading="lazy" decoding="async" />
              <span class="compare__edge" aria-hidden="true"></span>
            </div>
            <span class="lens__rim" aria-hidden="true"></span>
            <span class="lens__shine" aria-hidden="true"></span>
            <span class="lens__arm" aria-hidden="true"><span class="lens__tab">{{ reveal() > 50 ? 'After' : 'Before' }}</span></span>
          </div>
          <label class="compare__control">
            <span class="visually-hidden">Slide to compare the photo before and after squint correction</span>
            <input
              type="range"
              min="0"
              max="100"
              [value]="reveal()"
              (input)="reveal.set(+$any($event.target).value)"
              [attr.aria-valuetext]="reveal() + '% showing after'"
            />
          </label>
          <figcaption>Slide through the lens: a child before and after squint correction. Photographs as published on the clinic's website.</figcaption>
        </figure>

        <div class="fam__body">
          <h2 id="families-title" appReveal>Families leave with more than a diagnosis.</h2>
          <ul class="figures" aria-label="The clinic's published figures">
            @for (f of figures; track f.label; let i = $index) {
              <li appReveal [style.--delay]="i * 0.08 + 's'">
                <span class="mini-lens"><strong>{{ f.value }}</strong></span>
                <span class="figures__label">{{ f.label }}</span>
              </li>
            }
          </ul>
          <p class="figures__note">Figures as published by the clinic.</p>
          @for (v of voices; track v.name; let i = $index) {
            <blockquote class="voice" appReveal [style.--delay]="i * 0.1 + 's'">
              <p>“{{ v.quote }}”</p>
              <footer>{{ v.name }}</footer>
            </blockquote>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './families-section.scss',
})
export class FamiliesSection {
  protected readonly figures = FIGURES;
  protected readonly voices = VOICES;
  /** How much of the "after" photo shows, 0–100. */
  protected readonly reveal = signal(50);
  private readonly lens = viewChild.required<ElementRef<HTMLElement>>('lens');

  /** The highlight on the glass follows the pointer, as light does on a real lens. */
  protected glint(e: PointerEvent): void {
    const el = this.lens().nativeElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--hx', `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--hy', `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  }
  protected glintReset(): void {
    const el = this.lens().nativeElement;
    el.style.removeProperty('--hx');
    el.style.removeProperty('--hy');
  }
}
