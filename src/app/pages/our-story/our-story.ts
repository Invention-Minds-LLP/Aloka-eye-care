import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { MobileBookBar } from '../../shared/mobile-book-bar';
import { SiteFooter } from '../../shared/site-footer';
import { CLINIC } from '../home/home.content';
import { SiteHeader, STORY_CHAPTERS } from '../home/site-header';
import { Story } from '../home/story/story';

/** The illustrated family visit (once the home page's opening), kept as an optional page. */
@Component({
  selector: 'app-our-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteHeader, Story, SiteFooter, MobileBookBar, RouterLink, Icon],
  template: `
    <a class="skip-link" href="#after-story">Skip the story</a>
    <app-site-header [chapters]="chapters" />
    <main>
      <app-story />
      <section class="after" id="after-story" aria-labelledby="after-title">
        <div class="wrap after__inner">
          <h2 id="after-title">Ready to bring your child in?</h2>
          <p>Monday to Saturday, 10 am to 5 pm, at KPHB Phase 6, near Forum Srujana Mall, Kukatpally.</p>
          <div class="after__actions">
            <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Book an appointment <app-icon name="arrow" /></a>
            <a class="btn-wa" [href]="clinic.whatsappHref" target="_blank" rel="noopener"><app-icon name="whatsapp" /> WhatsApp</a>
            <a class="link-call" routerLink="/" fragment="results"><span>See real patient results</span></a>
          </div>
        </div>
      </section>
    </main>
    <app-site-footer />
    <app-mobile-book-bar />
  `,
  styles: `
    .after { background: var(--paper); padding-block: clamp(4rem, 10vh, 6rem); border-top: 1px solid var(--steel-300); }
    .after__inner { display: grid; gap: 1rem; justify-items: start; }
    h2 { font-size: var(--step-1); }
    p { color: var(--ink-soft); max-width: 56ch; }
    .after__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1rem; margin-top: 0.75rem; }
  `,
})
export default class OurStory {
  protected readonly clinic = CLINIC;
  protected readonly chapters = STORY_CHAPTERS;

  constructor() {
    inject(SeoService).set({
      title: "A Family's Visit, Told as a Story | Dr. Aloka's Eye Care, Kukatpally",
      description:
        'An illustrated story of a Hyderabad family’s visit to Dr. Aloka’s Eye Care: arriving worried about a child’s squint, the consultation, treatment, and going home happy.',
      path: '/our-story/',
    });
  }
}
