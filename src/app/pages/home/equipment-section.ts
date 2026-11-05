import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { EQUIPMENT } from './home.content';

/** The clinic's machines with photos as cards, then the other tests as a compact list. */
@Component({
  selector: 'app-equipment-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, RouterLink],
  template: `
    <section class="eq" id="equipment" aria-labelledby="equipment-title">
      <div class="wrap">
        <header class="eq__head">
          <p class="eq__eyebrow">At the clinic</p>
          <h2 id="equipment-title" appReveal>Modern equipment for accurate results</h2>
          <p class="eq__lede">
            The machines and tests Dr. Aloka uses to measure your child's eyes precisely and follow their progress at every visit.
          </p>
        </header>

        <ul class="cards">
          @for (e of withPhoto; track e.name; let i = $index) {
            <li class="card" appReveal [style.--delay]="i * 0.1 + 's'">
              <figure class="card__img">
                <img
                  [src]="e.image!.src"
                  [srcset]="e.image!.srcset"
                  sizes="(max-width: 800px) 92vw, 40vw"
                  [width]="e.image!.w"
                  [height]="e.image!.h"
                  [alt]="e.image!.alt"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div class="card__body">
                <p class="card__use">{{ e.use }}</p>
                <h3>{{ e.name }}</h3>
                <p>{{ e.body }}</p>
              </div>
            </li>
          }
        </ul>

        @if (others.length) {
          <ul class="others" aria-label="Other tests at the clinic">
            @for (e of others; track e.name) {
              <li>
                <p class="card__use">{{ e.use }}</p>
                <h3>{{ e.name }}</h3>
                <p>{{ e.body }}</p>
              </li>
            }
          </ul>
        }
        <p class="eq__more"><a routerLink="/gallery/" fragment="equipment">See the clinic and equipment in the gallery</a></p>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .eq { background: var(--white); padding-block: clamp(4.5rem, 11vh, 7rem); }
    .eq__head { max-width: 46rem; margin-bottom: 2.5rem; }
    .eq__eyebrow { font-size: var(--step-small); font-weight: 650; color: var(--teal-ink); margin-bottom: 0.6rem; }
    h2 { font-size: var(--step-1); }
    .eq__lede { margin-top: 1rem; color: var(--ink-soft); font-size: var(--step-3); line-height: 1.55; }
    ul { list-style: none; margin: 0; padding: 0; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 26rem), 1fr));
      gap: 1.25rem;
    }
    .card {
      display: grid;
      grid-template-rows: auto 1fr;
      border-radius: calc(var(--radius) * 1.2);
      overflow: hidden;
      background: var(--paper);
      box-shadow: inset 0 0 0 1px var(--steel-300);
    }
    .card__img {
      margin: 0;
      background: #fff;
      img { display: block; width: 100%; height: clamp(220px, 24vw, 300px); object-fit: contain; padding: 1rem; }
    }
    .card__body { padding: 1.4rem 1.5rem 1.6rem; }
    .card__use {
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hope);
    }
    h3 { margin-top: 0.4rem; font-size: var(--step-2); }
    .card__body p:last-child, .others li p:last-child { margin-top: 0.6rem; color: var(--ink-soft); }
    .others {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
      gap: 1.25rem;
      margin-top: 1.25rem;
      li {
        padding: 1.2rem 1.3rem;
        border-radius: var(--radius);
        border-top: 3px solid var(--teal);
        background: var(--paper);
      }
      h3 { font-size: var(--step-3); }
    }
    .eq__more { margin-top: 1.75rem; a { color: var(--teal-ink); font-weight: 600; } }
  `,
})
export class EquipmentSection {
  protected readonly withPhoto = EQUIPMENT.filter((e) => e.image);
  protected readonly others = EQUIPMENT.filter((e) => !e.image);
}
