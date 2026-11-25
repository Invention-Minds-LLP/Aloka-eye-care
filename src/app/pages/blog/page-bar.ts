import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

/** The site header (Clinic Light): logo, the site menu and the appointment button; a menu panel on phones. */
@Component({
  selector: 'app-page-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="head">
      <div class="wrap head__inner">
        <a class="logo" routerLink="/" aria-label="Dr. Aloka's Eye Care, home" (click)="open.set(false)">
          <img src="images/logo.png" alt="Dr. Aloka's Eye Care" width="1459" height="334" />
        </a>
        <nav class="nav" aria-label="Site">
          @for (n of nav; track n.path) {
            <a
              [routerLink]="n.path"
              routerLinkActive="is-on"
              [routerLinkActiveOptions]="{ exact: n.exact }"
              ariaCurrentWhenActive="page"
              >{{ n.label }}</a
            >
          }
        </nav>
        <a class="btn-book head__book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Appointment information</a>
        <button
          type="button"
          class="menu-btn"
          (click)="open.set(!open())"
          [attr.aria-expanded]="open()"
          aria-controls="site-menu"
          [attr.aria-label]="open() ? 'Close menu' : 'Open menu'"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            @if (open()) {
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            } @else {
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            }
          </svg>
        </button>
      </div>
      <nav class="menu" id="site-menu" [class.open]="open()" aria-label="Site">
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
        <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener" (click)="open.set(false)"
          >Appointment information</a
        >
      </nav>
    </header>
  `,
  styles: `
    :host { display: block; position: sticky; top: 0; z-index: 50; }
    .head { background: rgb(251 248 243 / 0.96); box-shadow: 0 1px 0 var(--line); }
    .head__inner { display: flex; align-items: center; gap: 1.6rem; min-height: 4.6rem; }
    .logo { display: block; line-height: 0; flex: none; }
    .logo img { height: 40px; width: auto; }
    .nav { display: flex; gap: clamp(1rem, 1.6vw, 1.7rem); margin-left: auto; font-weight: 600; font-size: 0.97rem; }
    .nav a { position: relative; padding: 0.4rem 0; text-decoration: none; color: var(--ink); }
    .nav a::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--teal);
      scale: 0 1; transform-origin: 0 50%; transition: scale 0.35s var(--ease-out);
    }
    .nav a:hover::after, .nav a.is-on::after { scale: 1 1; }
    .nav a.is-on { color: var(--teal); }
    .head__book { min-height: 2.75rem; padding: 0.6rem 1.1rem; font-size: 0.92rem; flex: none; }
    .menu-btn { display: none; margin-left: auto; width: 2.75rem; height: 2.75rem; padding: 0; border: 0; background: none; color: var(--ink); cursor: pointer; }
    .menu-btn svg { width: 26px; height: 26px; }
    .menu { display: none; }
    @media (max-width: 1120px) {
      .nav, .head__book { display: none; }
      .menu-btn { display: grid; place-items: center; }
      .menu {
        position: absolute; left: 0; right: 0; top: 100%; display: grid; gap: 0.2rem;
        padding: 0.8rem var(--gutter) 1.4rem; background: var(--cream);
        box-shadow: 0 1px 0 var(--line), 0 20px 30px -20px rgb(10 70 73 / 0.4);
        opacity: 0; visibility: hidden; translate: 0 -10px;
        transition: opacity 0.25s, translate 0.35s var(--ease-out), visibility 0s 0.35s;
      }
      .menu.open { opacity: 1; visibility: visible; translate: 0 0; transition: opacity 0.25s, translate 0.35s var(--ease-out); }
      .menu a:not(.btn-book) { padding: 0.75rem 0; font-weight: 700; font-size: 1.08rem; text-decoration: none; color: var(--ink); border-bottom: 1px solid var(--line); }
      .menu a.is-on { color: var(--teal); }
      .menu .btn-book { margin-top: 0.9rem; }
    }
    @media (max-width: 640px) { .logo img { height: 34px; } }
  `,
})
export class PageBar {
  protected readonly nav = NAV;
  protected readonly clinic = CLINIC;
  protected readonly open = signal(false);
}
