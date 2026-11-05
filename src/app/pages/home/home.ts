import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { MobileBookBar } from '../../shared/mobile-book-bar';
import { SiteFooter } from '../../shared/site-footer';
import { BlogTeaser } from './blog-teaser';
import { DoctorSection } from './doctor-section';
import { EquipmentSection } from './equipment-section';
import { GoogleReviews } from './google-reviews';
import { HeroSection } from './hero-section';
import { MyopiaSection } from './myopia-section';
import { ResultsSection } from './results-section';
import { SquintSection } from './squint-section';
import { SiteHeader } from './site-header';
import { TrustSection } from './trust-section';
import { VisitSection } from './visit-section';

/**
 * Short and scannable: who and how to book first, then real results, the doctor and the equipment.
 * The illustrated family story is on /our-story/.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeader,
    HeroSection,
    ResultsSection,
    DoctorSection,
    EquipmentSection,
    SquintSection,
    MyopiaSection,
    TrustSection,
    GoogleReviews,
    BlogTeaser,
    VisitSection,
    SiteFooter,
    MobileBookBar,
  ],
  template: `
    <a class="skip-link" href="#results">Skip to patient results</a>
    <app-site-header />
    <main>
      <app-hero-section />
      <app-results-section />
      <app-doctor-section />
      <app-equipment-section />
      <app-squint-section />
      <app-myopia-section />
      <app-google-reviews />
      <app-trust-section />
      <app-blog-teaser />
      <app-visit-section />
    </main>
    <app-site-footer />
    <app-mobile-book-bar />
  `,
})
export default class Home {
  constructor() {
    inject(SeoService).set({
      title: "Paediatric Ophthalmologist & Squint Surgeon in Kukatpally, Hyderabad | Dr. Aloka's Eye Care",
      description:
        'Children’s eye specialist Dr. Aloka Hedau in KPHB, Kukatpally, Hyderabad: squint surgery for children & adults, myopia clinic, vision therapy, paediatric cataract. Mon–Sat, 10–5. Call +91 74164 27503.',
      // the site's FAQ markup lives on /faq/, so each question is marked up once
      path: '/',
    });
  }
}
