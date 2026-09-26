import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SPECIALITIES, TIMELINE } from './home.content';

/** The four Lea picture symbols children name in the eye test, used as list marks. */
const LEA = ['house', 'apple', 'circle', 'square'] as const;

@Component({
  selector: 'app-doctor-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <section class="doc" id="doctor" aria-labelledby="doctor-title">
      <div class="wrap doc__grid">
        <figure class="doc__photo" appReveal>
          <img
            srcset="images/doctor-900.webp 900w, images/doctor-1600.webp 1600w"
            sizes="(max-width: 900px) 92vw, 40vw"
            src="images/doctor-900.webp"
            alt="Dr. Aloka Hedau in a white coat over a Pochampally-style saree, seated at a desk and smiling"
            width="1600"
            height="1200"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>Dr. Aloka Hedau</strong>
            DNB (Ophthalmology) · Fellow, Paediatric Ophthalmology · FICO (UK)
          </figcaption>
        </figure>

        <div class="doc__body">
          <h2 id="doctor-title" appReveal>A specialist in children's eyes and squint, for over twenty years.</h2>
          <p class="doc__lede">
            Senior Paediatric Ophthalmologist and Adult Strabismus Surgeon. Trained at Aravind Eye Hospital, Madurai, practising in
            Hyderabad since 2012, and speaker at more than fifty national and international conferences.
          </p>

          <div class="spec">
            <div>
              <h3>For children</h3>
              <ul>
                @for (s of specialities.children; track s; let i = $index) {
                  <li><svg class="lea" viewBox="0 0 16 16" aria-hidden="true">@switch (lea[i % 4]) { @case ('house') { <path d="M2 8 8 2.5 14 8v5.5H2Z" /> } @case ('apple') { <path class="lea--apple" d="M8 4.5c-1-1.2-5-1.5-5 3 0 3.5 2.5 6 3.5 6 .6 0 1-.4 1.5-.4s.9.4 1.5.4c1 0 3.5-2.5 3.5-6 0-4.5-4-4.2-5-3ZM8 4.5 9 1.8" /> } @case ('circle') { <circle cx="8" cy="8" r="5.5" /> } @default { <rect x="2.5" y="2.5" width="11" height="11" /> } }</svg>{{ s }}</li>
                }
              </ul>
            </div>
            <div>
              <h3>For adults</h3>
              <ul>
                @for (s of specialities.adults; track s; let i = $index) {
                  <li><svg class="lea" viewBox="0 0 16 16" aria-hidden="true">@switch (lea[(i + 2) % 4]) { @case ('house') { <path d="M2 8 8 2.5 14 8v5.5H2Z" /> } @case ('apple') { <path class="lea--apple" d="M8 4.5c-1-1.2-5-1.5-5 3 0 3.5 2.5 6 3.5 6 .6 0 1-.4 1.5-.4s.9.4 1.5.4c1 0 3.5-2.5 3.5-6 0-4.5-4-4.2-5-3ZM8 4.5 9 1.8" /> } @case ('circle') { <circle cx="8" cy="8" r="5.5" /> } @default { <rect x="2.5" y="2.5" width="11" height="11" /> } }</svg>{{ s }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ol class="wrap career" aria-label="Training and career">
        @for (t of timeline; track t.year) {
          <li><span class="career__year">{{ t.year }}</span>{{ t.text }}</li>
        }
      </ol>
    </section>
  `,
  styleUrl: './doctor-section.scss',
})
export class DoctorSection {
  protected readonly specialities = SPECIALITIES;
  protected readonly timeline = TIMELINE;
  protected readonly lea = LEA;
}
