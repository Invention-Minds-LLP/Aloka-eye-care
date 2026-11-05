import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { CLINIC, FIGURES, TELUGU } from './home.content';

/** Quick routes for parents who already know what they are looking for. */
const NEEDS = [
  { label: 'Squint treatment', link: '/', fragment: 'squint-surgery' },
  { label: 'Myopia control', link: '/', fragment: 'myopia' },
  { label: 'Lazy eye & vision therapy', link: '/services/', fragment: undefined },
  { label: 'Paediatric cataract', link: '/surgeries/', fragment: undefined },
  { label: 'Adult squint', link: '/surgeries/', fragment: undefined },
] as const;

/**
 * The first screen: who, what, where and how to book, readable in a few seconds.
 * A real photo of Dr. Aloka; the illustrated family story lives on /our-story/.
 */
@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  template: `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="wrap hero__grid">
        <div class="hero__text">
          <p class="hero__eyebrow">Paediatric Ophthalmologist &amp; Squint Surgeon · KPHB, Kukatpally</p>
          <h1 id="hero-title">Expert eye care for children, and squint treatment at any age.</h1>
          <p class="hero__lede">
            Led by <strong>Dr. Aloka Hedau</strong>, trained at Aravind Eye Hospital, Madurai, with more than twenty years of experience
            treating children's eyes and squint in children and adults.
          </p>
          <p class="hero__te"><span lang="te">{{ te.welcome }}</span> <span class="hero__te-en">{{ te.welcomeEn }}</span></p>

          <div class="hero__actions">
            <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">
              <span>Book an appointment</span>
              <app-icon name="arrow" />
            </a>
            <a class="btn-wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener">
              <app-icon name="whatsapp" />
              WhatsApp
            </a>
            <a class="link-call" [href]="clinic.phoneHref">
              <app-icon name="phone" />
              <span>{{ clinic.phoneDisplay }}</span>
            </a>
          </div>
          <p class="hero__hours"><app-icon name="clock" /> Monday to Saturday, 10 am – 5 pm · near Forum Srujana Mall</p>

          <nav class="needs" aria-label="I'm looking for">
            @for (n of needs; track n.label) {
              <a [routerLink]="n.link" [fragment]="n.fragment">{{ n.label }}</a>
            }
          </nav>
        </div>

        <figure class="hero__photo">
          <img
            srcset="images/doctor-900.webp 900w, images/doctor-1600.webp 1600w"
            sizes="(max-width: 900px) 92vw, 46vw"
            src="images/doctor-900.webp"
            alt="Dr. Aloka Hedau in a white coat, seated at her desk at the clinic and smiling"
            width="1600"
            height="1200"
            fetchpriority="high"
            decoding="async"
          />
          <figcaption>
            <strong>Dr. Aloka Hedau</strong>
            DNB (Ophthalmology) · Fellow, Paediatric Ophthalmology · FICO (UK)
          </figcaption>
        </figure>
      </div>

      <div class="wrap">
        <ul class="figures" aria-label="The clinic's published figures">
          @for (f of figures; track f.label) {
            <li><strong>{{ f.value }}</strong><span>{{ f.label }}</span></li>
          }
        </ul>
        <p class="hero__story">
          <a routerLink="/our-story/">See a family's visit, as an illustrated story <app-icon name="arrow" /></a>
        </p>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .hero {
      position: relative;
      padding-block: clamp(6.5rem, 14vh, 8.5rem) clamp(2.5rem, 6vh, 4rem);
      background:
        radial-gradient(60rem 40rem at 85% 10%, rgb(79 179 217 / 0.14), transparent 60%),
        radial-gradient(40rem 30rem at 0% 100%, rgb(232 121 47 / 0.08), transparent 60%),
        var(--white);
    }
    .hero__grid {
      display: grid;
      grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
      gap: clamp(2rem, 5vw, 4.5rem);
      align-items: center;
    }
    .hero__eyebrow {
      font-size: var(--step-small);
      font-weight: 650;
      letter-spacing: 0.02em;
      color: var(--teal-ink);
    }
    h1 {
      margin-top: 1rem;
      font-size: clamp(2.3rem, 1.3rem + 3.4vw, 4.2rem);
      max-width: 16ch;
    }
    .hero__lede {
      margin-top: 1.25rem;
      max-width: 52ch;
      font-size: var(--step-3);
      line-height: 1.55;
      color: var(--ink-soft);
      strong { color: var(--ink); font-weight: 650; }
    }
    .hero__te {
      margin-top: 0.9rem;
      font-size: var(--step-small);
      color: var(--ink-faint);
      [lang='te'] { font-size: 1.1em; font-weight: 600; color: var(--ink-soft); margin-right: 0.35rem; }
    }
    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem 1rem;
      margin-top: 2rem;
    }
    .hero__hours {
      --icon: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      font-size: var(--step-small);
      color: var(--ink-soft);
    }
    .needs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--steel-300);
      a {
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        font-size: var(--step-small);
        font-weight: 600;
        text-decoration: none;
        background: var(--steel-100);
        box-shadow: inset 0 0 0 1px var(--steel-300);
        transition: background-color 0.2s, box-shadow 0.2s;
        &:hover { background: var(--tint); box-shadow: inset 0 0 0 1px var(--teal); }
      }
    }
    .hero__photo {
      margin: 0;
      img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 4 / 4.2;
        object-fit: cover;
        object-position: 50% 18%;
        border-radius: calc(var(--radius) * 1.4);
        box-shadow: var(--lift);
      }
      figcaption {
        margin-top: 0.9rem;
        font-size: var(--step-small);
        color: var(--ink-soft);
        strong { display: block; font-family: var(--font-display); font-size: var(--step-3); color: var(--ink); }
      }
    }
    .figures {
      list-style: none;
      margin: clamp(2.5rem, 6vh, 4rem) 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
      li {
        padding: 1.1rem 1.25rem;
        border-radius: var(--radius);
        background: var(--paper);
        box-shadow: inset 0 0 0 1px var(--steel-300);
      }
      strong {
        display: block;
        font-family: var(--font-display);
        font-size: var(--step-2);
        color: var(--hope);
        font-variant-numeric: tabular-nums;
      }
      span { font-size: var(--step-small); color: var(--ink-soft); }
    }
    .hero__story {
      margin-top: 1.25rem;
      font-size: var(--step-small);
      a {
        --icon: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--teal-ink);
        font-weight: 600;
      }
    }
    @media (max-width: 900px) {
      .hero__grid { grid-template-columns: minmax(0, 1fr); }
      .hero__photo { max-width: 34rem; }
      .hero__photo img { aspect-ratio: 4 / 3; object-position: 50% 22%; }
      .figures { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 480px) {
      .figures li { padding: 0.9rem 1rem; }
    }
  `,
})
export class HeroSection {
  protected readonly clinic = CLINIC;
  protected readonly figures = FIGURES;
  protected readonly te = TELUGU;
  protected readonly needs = NEEDS;
}
