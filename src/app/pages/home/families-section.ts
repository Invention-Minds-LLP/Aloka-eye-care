import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { FIGURES, VOICES } from './home.content';

@Component({
  selector: 'app-families-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="fam" id="families" aria-labelledby="families-title">
      <div class="wrap fam__grid">
        <figure class="compare" [style.--reveal]="reveal() + '%'">
          <div class="compare__frame">
            <img src="images/squint-before.webp" alt="" width="420" height="420" loading="lazy" decoding="async" />
            <img class="compare__after" src="images/squint-after.webp" alt="" width="420" height="420" loading="lazy" decoding="async" />
            <span class="compare__tag compare__tag--before">Before</span>
            <span class="compare__tag compare__tag--after">After</span>
            <span class="compare__edge" aria-hidden="true"></span>
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
          <figcaption>A child before and after squint correction. Photographs as published on the clinic's website.</figcaption>
        </figure>

        <div class="fam__body">
          <h2 id="families-title" appReveal>Families leave with more than a diagnosis.</h2>
          <p class="fam__figures">
            The clinic reports <strong>{{ figures[0].value }} {{ figures[0].label }}</strong>,
            <strong>{{ figures[1].value }} {{ figures[1].label }}</strong>,
            <strong>{{ figures[2].value }} {{ figures[2].label }}</strong> and
            <strong>{{ figures[3].value }} {{ figures[3].label }}</strong>.
          </p>
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
}
