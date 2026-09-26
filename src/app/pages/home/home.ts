import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DoctorSection } from './doctor-section';
import { FamiliesSection } from './families-section';
import { SiteHeader } from './site-header';
import { Story } from './story/story';
import { TrustSection } from './trust-section';
import { VisitSection } from './visit-section';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SiteHeader, Story, DoctorSection, TrustSection, FamiliesSection, VisitSection],
  template: `
    <a class="skip-link" href="#doctor">Skip the story</a>
    <app-site-header />
    <main>
      <app-story />
      <app-doctor-section />
      <app-trust-section />
      <app-families-section />
      <app-visit-section />
    </main>
  `,
})
export default class Home {}
