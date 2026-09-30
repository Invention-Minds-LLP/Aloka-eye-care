import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CLINIC, HOURS } from '../pages/home/home.content';
import { SOCIAL } from '../pages/pages.content';

export const SITE = 'https://dralokaseyecare.com';
const DEFAULT_IMAGE = SITE + '/images/doctor-1600.webp';

export interface PageSeo {
  title: string;
  description: string;
  /** Path, e.g. '/services/' */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Extra JSON-LD for this page (breadcrumbs, procedures, article…) */
  jsonLd?: object[];
}

/**
 * One place for on-page SEO: title, description, canonical, Open Graph, Twitter
 * and structured data. Works during build-time prerendering, so search engines get it in the HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(p: PageSeo): void {
    const url = SITE + p.path;
    const image = p.image ? (p.image.startsWith('http') ? p.image : SITE + '/' + p.image.replace(/^\//, '')) : DEFAULT_IMAGE;
    this.title.setTitle(p.title);
    const tags: Record<string, string> = {
      description: p.description,
      'og:title': p.title,
      'og:description': p.description,
      'og:url': url,
      'og:image': image,
      'og:type': p.type ?? 'website',
      'og:site_name': "Dr. Aloka's Eye Care",
      'og:locale': 'en_IN',
      'twitter:card': 'summary_large_image',
      'twitter:title': p.title,
      'twitter:description': p.description,
      'twitter:image': image,
    };
    for (const [k, v] of Object.entries(tags)) {
      const attr = k.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: k, content: v });
    }
    this.link('canonical', url);
    this.jsonLd([CLINIC_LD, DOCTOR_LD, ...(p.jsonLd ?? [])]);
  }

  private link(rel: string, href: string): void {
    let el = this.doc.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }

  private jsonLd(items: object[]): void {
    this.doc.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove());
    const s = this.doc.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo', '');
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': items });
    this.doc.head.appendChild(s);
  }
}

export const breadcrumbs = (...trail: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...trail].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: SITE + path,
  })),
});

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** The clinic, as a local medical business in Kukatpally, Hyderabad. */
export const CLINIC_LD = {
  '@type': ['MedicalClinic', 'MedicalBusiness'],
  '@id': SITE + '/#clinic',
  name: "Dr. Aloka's Eye Care",
  alternateName: 'Dr Alokas Eye Care',
  description:
    'Paediatric ophthalmology and squint surgery clinic for children and adults in KPHB, Kukatpally, Hyderabad, led by Dr. Aloka Hedau.',
  url: SITE + '/',
  logo: SITE + '/images/logo.png',
  image: DEFAULT_IMAGE,
  telephone: '+91-74164-27503',
  email: CLINIC.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Third Floor, Plot no 6, Survey No 1009, 9th Phase Road, near Forum Srujana Mall, KPHB Phase 6',
    addressLocality: 'Kukatpally, Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500085',
    addressCountry: 'IN',
  },
  hasMap: CLINIC.mapsHref,
  areaServed: ['Kukatpally', 'KPHB', 'Hyderabad', 'Telangana'].map((name) => ({ '@type': 'Place', name })),
  medicalSpecialty: ['Pediatric', 'Ophthalmology'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: HOURS.map((h, i) => (h.open ? DAYS[i] : null)).filter(Boolean),
      opens: '10:00',
      closes: '17:00',
    },
  ],
  availableService: [
    'Squint surgery',
    'Paediatric eye examination',
    'Myopia control',
    'Vision therapy',
    'Paediatric cataract surgery',
    'Retinopathy of prematurity screening',
    'Nystagmus surgery',
  ].map((name) => ({ '@type': 'MedicalProcedure', name })),
  sameAs: Object.values(SOCIAL),
  employee: { '@id': SITE + '/#doctor' },
};

export const DOCTOR_LD = {
  '@type': 'Physician',
  '@id': SITE + '/#doctor',
  name: 'Dr. Aloka Hedau',
  description: 'Senior Paediatric Ophthalmologist and Adult Strabismus Surgeon in Hyderabad.',
  image: DEFAULT_IMAGE,
  medicalSpecialty: ['Pediatric', 'Ophthalmology'],
  hasCredential: ['DNB (Ophthalmology)', 'Fellow, Paediatric Ophthalmology', 'FICO (UK)'].map((name) => ({
    '@type': 'EducationalOccupationalCredential',
    name,
  })),
  alumniOf: { '@type': 'Organization', name: 'Aravind Eye Hospital, Madurai' },
  worksFor: { '@id': SITE + '/#clinic' },
  address: CLINIC_LD.address,
  telephone: CLINIC_LD.telephone,
  url: SITE + '/about-us/',
};
