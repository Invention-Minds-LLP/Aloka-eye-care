import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CLINIC } from '../pages/home/home.content';
import { Icon } from './icon';

/** Phones only: Call and Directions always within thumb's reach at the bottom of the screen (Clinic Light). */
@Component({
  selector: 'app-mobile-book-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <nav class="mbar" aria-label="Contact the clinic">
      <a [href]="clinic.phoneHref"><app-icon name="phone" /><span>Call</span></a>
      <a [href]="clinic.mapsHref" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="10" r="2.6" fill="currentColor" /></svg>
        <span>Directions</span>
      </a>
    </nav>
  `,
  styles: `
    :host { display: none; }
    @media (max-width: 700px) {
      :host { display: block; height: calc(4.6rem + env(safe-area-inset-bottom)); }
      .mbar {
        position: fixed; inset: auto 0 0; z-index: 60;
        display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
        padding: 8px 10px calc(8px + env(safe-area-inset-bottom));
        background: var(--cream);
        box-shadow: 0 -1px 0 var(--line), 0 -14px 30px -20px rgb(10 70 73 / 0.5);
      }
      a {
        --icon: 1.2rem;
        display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        min-height: 3.1rem; border-radius: 10px;
        background: var(--teal); color: #fff; font-weight: 700; text-decoration: none;
      }
      svg { width: 1.2rem; height: 1.2rem; }
    }
  `,
})
export class MobileBookBar {
  protected readonly clinic = CLINIC;
}
