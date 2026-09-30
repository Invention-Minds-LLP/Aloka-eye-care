import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { SiteFooter } from '../../shared/site-footer';
import { BlogTeaser } from './blog-teaser';
import { DoctorSection } from './doctor-section';
import { FamiliesSection } from './families-section';
import { GoogleReviews } from './google-reviews';
import { MyopiaSection } from './myopia-section';
import { SquintSection } from './squint-section';
import { SiteHeader } from './site-header';
import { Story } from './story/story';
import { TrustSection } from './trust-section';
import { VisitSection } from './visit-section';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteHeader, Story, DoctorSection, MyopiaSection, SquintSection, TrustSection, FamiliesSection, GoogleReviews, BlogTeaser, VisitSection, SiteFooter],
  template: `
    <a class="skip-link" href="#doctor">Skip the story</a>
    <app-site-header />
    <main>
      <app-story />
      <app-doctor-section />
      <app-myopia-section />
      <app-squint-section />
      <app-trust-section />
      <app-families-section />
      <app-google-reviews />
      <app-blog-teaser />
      <app-visit-section />
    </main>
    <app-site-footer />
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
