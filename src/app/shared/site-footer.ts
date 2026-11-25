import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLINIC } from '../pages/home/home.content';

/** The teal footer (Clinic Light): the clinic, its pages, the address and the ways to reach it. */
@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="foot">
      <div class="wrap foot__grid">
        <div class="foot__brand">
          <a class="flogo" routerLink="/" aria-label="Dr. Aloka's Eye Care, home">
            <svg viewBox="0 0 40 24" aria-hidden="true">
              <path d="M2 12C7 4.5 13 1.5 20 1.5S33 4.5 38 12c-5 7.5-11 10.5-18 10.5S7 19.5 2 12Z" fill="none" stroke="currentColor" stroke-width="2.4" />
              <circle cx="20" cy="12" r="6" fill="none" stroke="#f08a4b" stroke-width="3" />
              <circle cx="20" cy="12" r="2.2" fill="currentColor" />
            </svg>
            Dr. Aloka’s Eye Care
          </a>
          <p>Paediatric eye care and squint care for children and adults, by Dr. Aloka Hedau in Kukatpally, Hyderabad.</p>
        </div>
        <nav aria-label="More from the clinic">
          <h2>Pages</h2>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about-us/">About Dr. Aloka</a></li>
            <li><a routerLink="/services/">Services</a></li>
            <li><a routerLink="/surgeries/">Surgeries</a></li>
            <li><a routerLink="/gallery/">Gallery</a></li>
            <li><a routerLink="/blog">Blog</a></li>
            <li><a routerLink="/faq/">FAQ</a></li>
            <li><a routerLink="/contact-us/">Contact &amp; directions</a></li>
          </ul>
        </nav>
        <div>
          <h2>Visit</h2>
          <address>
            Third Floor, Plot no 6, 9th Phase Road, near Forum Srujana Mall, KPHB Phase 6, Kukatpally, Hyderabad 500085
          </address>
          <p class="foot__hours">Monday – Saturday, 10 am – 5 pm · Sunday closed</p>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a [href]="clinic.phoneHref">{{ clinic.phoneDisplay }}</a></li>
            <li><a [href]="clinic.whatsappHref" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a [href]="'mailto:' + clinic.email">{{ clinic.email }}</a></li>
            <li><a [href]="clinic.bookingHref" target="_blank" rel="noopener">Appointment information</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap foot__base">
        <p>© {{ year }} Dr. Aloka's Eye Care, Kukatpally, Hyderabad.</p>
        <p>Designed and developed by <a href="https://inventionminds.com/" target="_blank" rel="noopener">Invention Minds LLP</a></p>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    .foot { background: var(--teal-3); color: #e4f1ef; padding-top: clamp(2.8rem, 6vw, 4rem); }
    .foot__grid { display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)); gap: 2rem clamp(1.5rem, 4vw, 3rem); }
    .flogo { display: inline-flex; align-items: center; gap: 0.6rem; font-weight: 800; font-size: 1.15rem; color: #fff; text-decoration: none; }
    .flogo svg { width: 2.3rem; height: 1.4rem; }
    .foot__brand p { margin-top: 0.9rem; max-width: 34ch; color: #b9d8d4; }
    h2 { margin: 0 0 0.8rem; font-size: 0.82rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8fc3bd; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.45rem; }
    a { color: #fff; text-decoration: none; }
    ul a:hover { text-decoration: underline; text-underline-offset: 0.22em; }
    address { font-style: normal; color: #d7ecea; max-width: 30ch; }
    .foot__hours { margin-top: 0.6rem; color: #b9d8d4; }
    .foot__base {
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.6rem 1.5rem;
      margin-top: clamp(2rem, 5vw, 3rem); padding-block: 1.1rem; border-top: 1px solid rgb(255 255 255 / 0.14);
      font-size: 0.88rem; color: #9cc7c2;
    }
    .foot__base a { color: #d7ecea; text-decoration: underline; text-underline-offset: 0.2em; }
    @media (max-width: 900px) { .foot__grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } .foot__brand { grid-column: 1 / -1; } }
    @media (max-width: 520px) { .foot__grid { grid-template-columns: minmax(0, 1fr); } }
  `,
})
export class SiteFooter {
  protected readonly clinic = CLINIC;
  protected readonly year = new Date().getFullYear();
}
