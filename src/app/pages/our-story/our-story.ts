import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { MobileBookBar } from '../../shared/mobile-book-bar';
import { SiteFooter } from '../../shared/site-footer';
import { CLINIC } from '../home/home.content';
import { PageBar } from '../blog/page-bar';
import { Story } from '../home/story/story';

/** The illustrated family visit (once the home page's opening), kept as an optional page. */
@Component({
  selector: 'app-our-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, Story, SiteFooter, MobileBookBar, RouterLink, Icon],
  template: `
    <a class="skip-link" href="#after-story">Skip the story</a>
    <app-page-bar />
    <main>
      <!-- the story keeps its own evening palette; the rest of the site is Clinic Light -->
      <div class="story-night"><app-story /></div>
      <section class="after" id="after-story" aria-labelledby="after-title">
        <div class="wrap after__inner">
          <h2 id="after-title">Ready to bring your child in?</h2>
          <p>Monday to Saturday, 10 am to 5 pm, at KPHB Phase 6, near Forum Srujana Mall, Kukatpally.</p>
          <div class="after__actions">
            <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Book an appointment <app-icon name="arrow" /></a>
            <a class="btn-wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener"><app-icon name="whatsapp" /> WhatsApp</a>
            <a class="link-call" routerLink="/about-us/"><span>Meet Dr. Aloka</span></a>
          </div>
        </div>
      </section>
    </main>
    <app-site-footer />
    <app-mobile-book-bar />
  `,
  styles: `
    .story-night {
      --white: #0f1426; --paper: #141a2f; --mist: #1a2139; --tint: #172340; --steel-100: #1e2640; --steel-300: #313b5a;
      --steel-500: #6c7898; --ink: #f1f0f5; --ink-soft: #b9bfd2; --ink-faint: #8d95ad; --ink-dark: #1b2a3a; --ink-dark-soft: #4a5a6b;
      --card: #fbf8f2; --teal: #4fb3d9; --teal-deep: #3aa0c8; --teal-ink: #7cc9e8; --hope: #e8792f; --hope-action: #b94e14;
      --hope-action-hover: #9e410f; --wa: #3fcf80; --wa-hover: #157a44; --lift: 0 28px 50px -26px rgb(0 0 0 / 0.7);
      display: block; background: var(--white); color: var(--ink); color-scheme: dark;
    }
    /* inside the night scenes the main button keeps the story's orange (white on the light night-teal would be unreadable) */
    .story-night ::ng-deep .btn-book { background: var(--hope-action); box-shadow: 0 12px 26px -12px rgb(185 78 20 / 0.65); }
    .story-night ::ng-deep .btn-book:hover { background: var(--hope-action-hover); }
    .story-night ::ng-deep .btn-wa { background: transparent; color: var(--wa); box-shadow: inset 0 0 0 1.5px var(--wa); }
    .after { background: var(--paper); padding-block: clamp(4rem, 10vh, 6rem); border-top: 1px solid var(--steel-300); }
    .after__inner { display: grid; gap: 1rem; justify-items: start; }
    h2 { font-size: var(--step-1); }
    p { color: var(--ink-soft); max-width: 56ch; }
    .after__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; margin-top: 0.75rem; }
  `,
})
export default class OurStory {
  protected readonly clinic = CLINIC;

  constructor() {
    inject(SeoService).set({
      title: "A Family's Visit, Told as a Story | Dr. Aloka's Eye Care, Kukatpally",
      description:
        'An illustrated story of a Hyderabad family’s visit to Dr. Aloka’s Eye Care: arriving worried about a child’s squint, the consultation, treatment, and going home happy.',
      path: '/our-story/',
    });
  }
}
