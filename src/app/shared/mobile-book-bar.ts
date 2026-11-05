import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLINIC } from '../pages/home/home.content';
import { Icon } from './icon';

/** Phones only: Call, WhatsApp and Book always within thumb's reach at the bottom of the screen. */
@Component({
  selector: 'app-mobile-book-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <nav class="mbar" aria-label="Contact the clinic">
      <a class="mbar__call" [href]="clinic.phoneHref"><app-icon name="phone" /><span>Call</span></a>
      <a class="mbar__wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener"><app-icon name="whatsapp" /><span>WhatsApp</span></a>
      <a class="mbar__book" [href]="clinic.bookingHref" target="_blank" rel="noopener"><span>Book appointment</span><app-icon name="arrow" /></a>
    </nav>
  `,
  styles: `
    :host { display: none; }
    @media (max-width: 700px) {
      :host { display: block; height: calc(4.25rem + env(safe-area-inset-bottom)); }
      .mbar {
        position: fixed;
        inset: auto 0 0;
        z-index: 60;
        display: grid;
        grid-template-columns: auto auto 1fr;
        gap: 0.5rem;
        padding: 0.6rem 0.75rem calc(0.6rem + env(safe-area-inset-bottom));
        background: rgb(15 20 38 / 0.96);
        box-shadow: 0 -1px 0 var(--steel-300), 0 -12px 30px -18px rgb(0 0 0 / 0.8);
        backdrop-filter: blur(8px);
      }
      a {
        --icon: 1.15rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        min-height: 3rem;
        padding: 0 0.9rem;
        border-radius: 999px;
        font-weight: 650;
        font-size: 0.9375rem;
        text-decoration: none;
      }
      .mbar__call { background: var(--steel-100); color: var(--ink); }
      .mbar__wa { color: var(--wa); box-shadow: inset 0 0 0 1.5px var(--wa); }
      .mbar__book { background: var(--hope-action); color: #fff; }
    }
    @media (max-width: 380px) {
      .mbar__call span, .mbar__wa span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    }
  `,
})
export class MobileBookBar {
  protected readonly clinic = CLINIC;
}
