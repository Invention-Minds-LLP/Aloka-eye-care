import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLINIC } from '../pages/home/home.content';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="foot">
      <div class="wrap foot__inner">
        <a class="foot__brand" routerLink="/" aria-label="Dr. Aloka's Eye Care, home">
          <img class="foot__logo" src="images/logo.png" alt="" width="1459" height="334" loading="lazy" />
        </a>
        <nav aria-label="More from the clinic">
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about-us/">About Dr. Aloka</a></li>
            <li><a routerLink="/services/">Services</a></li>
            <li><a routerLink="/surgeries/">Surgeries</a></li>
            <li><a routerLink="/" fragment="myopia">Myopia clinic</a></li>
            <li><a routerLink="/gallery/">Gallery</a></li>
            <li><a routerLink="/blog">Blog</a></li>
            <li><a routerLink="/faq/">FAQ</a></li>
            <li><a routerLink="/contact-us/">Contact &amp; directions</a></li>
          </ul>
        </nav>
        <address class="foot__nap">
          Dr. Aloka's Eye Care · Third Floor, Plot no 6, 9th Phase Road, near Forum Srujana Mall, KPHB Phase 6, Kukatpally, Hyderabad 500085 ·
          <a [href]="clinic.phoneHref">{{ clinic.phoneDisplay }}</a>
        </address>
        <div class="foot__base">
          <p class="foot__small">© {{ year }} Dr. Aloka's Eye Care, Kukatpally, Hyderabad.</p>
          <p class="foot__small foot__credit">
            Designed and developed by
            <a href="https://inventionminds.com/" target="_blank" rel="noopener">Invention Minds LLP</a>
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    .foot {
      background: var(--mist);
      padding-block: 4rem 2.5rem;
      border-top: 1px solid var(--steel-300);
    }
    .foot__inner {
      display: grid;
      gap: 1.75rem;
      justify-items: start;
    }
    /* the logo was drawn for a light ground: it sits on a small lit plate */
    .foot__brand {
      display: block;
      line-height: 0;
      padding: 10px 14px;
      border-radius: 12px;
      background: var(--card);
    }
    .foot__logo {
      width: min(260px, 64vw);
      height: auto;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1.5rem;
    }
    ul a {
      display: inline-block;
      padding-block: 0.5rem;
      font-weight: 550;
      text-decoration: none;
    }
    ul a:hover {
      text-decoration: underline;
    }
    .foot__nap {
      font-style: normal;
      font-size: var(--step-small);
      line-height: 1.6;
      color: var(--ink-soft);
      max-width: 70ch;
    }
    .foot__nap a { color: var(--ink); font-weight: 600; }
    .foot__small {
      font-size: var(--step-small);
      color: var(--ink-soft);
    }
    /* copyright on the left, the site credit on the right; they stack on narrow screens */
    .foot__base {
      justify-self: stretch;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.5rem 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--steel-300);
    }
    .foot__credit a {
      color: var(--ink);
      font-weight: 600;
      text-decoration: underline;
      text-decoration-color: var(--steel-500);
      text-underline-offset: 3px;
      transition: color 0.2s, text-decoration-color 0.2s;
      &:hover {
        color: var(--teal-ink);
        text-decoration-color: currentColor;
      }
    }
  `,
})
export class SiteFooter {
  protected readonly clinic = CLINIC;
  protected readonly year = new Date().getFullYear();
}
