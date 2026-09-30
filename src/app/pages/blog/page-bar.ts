import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../../shared/icon';
import { CLINIC } from '../home/home.content';

export const NAV = [
  { path: '/', label: 'Home', exact: true },
  { path: '/about-us/', label: 'About', exact: false },
  { path: '/services/', label: 'Services', exact: false },
  { path: '/surgeries/', label: 'Surgeries', exact: false },
  { path: '/gallery/', label: 'Gallery', exact: false },
  { path: '/blog', label: 'Blog', exact: false },
  { path: '/faq/', label: 'FAQ', exact: false },
  { path: '/contact-us/', label: 'Contact', exact: false },
] as const;

/** The header for pages outside the home story: logo, the site menu, and the ways to reach the clinic. */
@Component({
  selector: 'app-page-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink, RouterLinkActive],
  template: `
    <header class="bar">
      <div class="bar__inner">
        <a class="brand" routerLink="/" aria-label="Dr. Aloka's Eye Care, home">
          <img src="images/logo.png" alt="" width="1459" height="334" />
        </a>
        <nav class="nav" [class.is-open]="open()" aria-label="Site" id="site-nav">
          @for (n of nav; track n.path) {
            <a
              [routerLink]="n.path"
              routerLinkActive="is-on"
              [routerLinkActiveOptions]="{ exact: n.exact }"
              ariaCurrentWhenActive="page"
              (click)="open.set(false)"
              >{{ n.label }}</a
            >
          }
        </nav>
        <div class="bar__actions">
          <a class="wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener">
            <app-icon name="whatsapp" /><span class="visually-hidden">Chat on WhatsApp</span>
          </a>
          <a class="call" [href]="clinic.phoneHref">
            <app-icon name="phone" /><span class="call__num">{{ clinic.phoneDisplay }}</span>
            <span class="visually-hidden">Call the clinic</span>
          </a>
          <a class="btn-book btn-book--compact" [href]="clinic.bookingHref" target="_blank" rel="noopener">
            <span>Book<span class="book-long"> appointment</span></span>
            <app-icon name="arrow" />
          </a>
          <button type="button" class="menu" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-controls="site-nav">
            <app-icon [name]="open() ? 'close' : 'menu'" /><span class="visually-hidden">Menu</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 50; }
    .bar {
      background: rgb(15 20 38 / 0.94);
      box-shadow: 0 1px 0 var(--steel-300);
      backdrop-filter: blur(8px);
    }
    .bar__inner {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      width: min(100% - 2 * var(--gutter), 1400px);
      margin-inline: auto;
      min-height: 4.5rem;
    }
    .brand {
      display: block;
      flex: none;
      line-height: 0;
      padding: 6px 10px;
      border-radius: 10px;
      background: var(--card);
      img { height: clamp(30px, 2.4vw + 18px, 40px); width: auto; }
    }
    .nav {
      display: flex;
      gap: 0.15rem;
      a {
        padding: 0.5rem 0.8rem;
        border-radius: 999px;
        font-weight: 600;
        text-decoration: none;
        color: var(--ink-soft);
        white-space: nowrap;
      }
      a:hover { color: var(--ink); }
      a.is-on { color: var(--ink); background: var(--steel-100); }
    }
    .bar__actions {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-left: auto;
    }
    .wa {
      --icon: 1.25rem;
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 999px;
      color: var(--wa);
      background: rgb(63 207 128 / 0.14);
    }
    .call {
      --icon: 1.1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      min-height: 2.75rem;
      font-weight: 600;
      font-size: var(--step-small);
      text-decoration: none;
      font-variant-numeric: tabular-nums;
    }
    .btn-book--compact {
      min-height: 2.75rem;
      padding: 0.6rem 1.1rem 0.6rem 1.15rem;
      font-size: var(--step-small);
    }
    .menu {
      --icon: 1.3rem;
      display: none;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 0;
      border-radius: 999px;
      background: var(--steel-100);
      color: var(--ink);
      cursor: pointer;
    }
    @media (max-width: 1399px) {
      .call__num { display: none; }
      /* short label while the full menu shares the row */
      .book-long { display: none; }
      .call {
        width: 2.75rem;
        justify-content: center;
        border-radius: 999px;
        background: var(--steel-100);
      }
    }
    /* phones and tablets: the menu folds into a panel under the header */
    @media (max-width: 1279px) {
      .menu { display: grid; }
      .nav {
        position: absolute;
        top: 100%;
        left: calc(-1 * var(--gutter));
        right: calc(-1 * var(--gutter));
        flex-direction: column;
        gap: 0;
        padding: 0.5rem var(--gutter) 1rem;
        background: #0f1426;
        z-index: 1;
        box-shadow: 0 1px 0 var(--steel-300), 0 20px 30px -20px rgb(0 0 0 / 0.8);
        visibility: hidden;
        opacity: 0;
        translate: 0 -8px;
        transition: opacity 0.2s, translate 0.25s var(--ease-out), visibility 0s 0.25s;
        a { padding: 0.9rem 0.5rem; border-radius: 10px; font-size: 1.0625rem; }
      }
      .nav.is-open {
        visibility: visible;
        opacity: 1;
        translate: 0 0;
        transition: opacity 0.2s, translate 0.25s var(--ease-out);
      }
    }
    @media (max-width: 560px) {
      .bar__inner { gap: 0.5rem; min-height: 4rem; }
      .bar__actions { gap: 0.45rem; }
      .book-long { display: none; }
      .wa, .call { display: none; }
      .brand { padding: 5px 7px; }
      .brand img { height: 28px; }
      .btn-book--compact { padding-inline: 0.9rem; }
      .btn-book--compact app-icon { display: none; }
    }
  `,
})
export class PageBar {
  protected readonly clinic = CLINIC;
  protected readonly nav = NAV;
  protected readonly open = signal(false);
}
