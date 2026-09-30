import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC, HOURS } from '../home/home.content';

const WHO = ['My child', 'Myself', 'Someone else'] as const;
const CONCERNS = [
  'Squint or crossed eyes',
  'Eye check-up for my child',
  'Glasses power or myopia',
  'A second opinion on surgery',
  'Something else',
] as const;

/** Current day, hour and minute in Hyderabad, whatever the visitor's own timezone. */
function nowInHyderabad() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, hour: Number(get('hour')), minute: Number(get('minute')) };
}

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export default class Contact {
  protected readonly clinic = CLINIC;
  protected readonly whoOptions = WHO;
  protected readonly concerns = CONCERNS;
  /** Monday first, the way the clinic's week runs. */
  protected readonly week = [...HOURS.slice(1), HOURS[0]].map((h) => ({ ...h, index: HOURS.indexOf(h) }));
  /** A fixed, first-party constant: the clinic's own Maps embed. */
  protected readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CLINIC.mapsEmbed);

  /* ---- the clock: its hands sweep to the time in Hyderabad once the page is in the browser ---- */
  protected readonly today = signal(-1);
  protected readonly status = signal<string | null>(null);
  protected readonly isOpen = signal(false);
  protected readonly hourDeg = signal(0);
  protected readonly minuteDeg = signal(0);
  /** The 10 am to 5 pm arc on the dial: 10 o'clock round to 5 o'clock. */
  protected readonly hoursArc = describeArc(60, 60, 50, 300, 150 + 360);

  /* ---- the message ---- */
  protected readonly name = signal('');
  protected readonly who = signal<(typeof WHO)[number]>('My child');
  protected readonly age = signal('');
  protected readonly concern = signal<string>('');
  protected readonly note = signal('');
  protected readonly tried = signal(false);
  protected readonly nameError = computed(() => (this.tried() && !this.name().trim() ? 'Please add your name.' : null));
  protected readonly concernError = computed(() => (this.tried() && !this.concern() ? 'Please choose what the visit is about.' : null));
  /** The message exactly as it will arrive on the clinic's WhatsApp. */
  protected readonly message = computed(() => {
    const who = this.who();
    const age = this.age().trim();
    const lines = [
      `Hello Dr. Aloka's Eye Care, this is ${this.name().trim() || '…'}.`,
      `I'd like an appointment for ${who === 'Myself' ? 'myself' : who === 'My child' ? 'my child' : 'someone in my family'}${age ? ` (age ${age})` : ''}.`,
      `It's about: ${this.concern() || '…'}.`,
    ];
    if (this.note().trim()) lines.push(this.note().trim());
    return lines.join('\n');
  });

  constructor() {
    inject(SeoService).set({
      title: "Contact Dr. Aloka's Eye Care, KPHB Phase 6, Kukatpally, Hyderabad | Timings, Map & Phone",
      description:
        'Call +91 74164 27503 or WhatsApp to book with paediatric ophthalmologist Dr. Aloka Hedau. Third Floor, Plot no 6, 9th Phase Road, near Forum Srujana Mall, KPHB Phase 6, Kukatpally, Hyderabad 500085. Mon–Sat 10 am–5 pm.',
      path: '/contact-us/',
      jsonLd: [
        breadcrumbs(['Contact us', '/contact-us/']),
        { '@type': 'ContactPage', url: `${SITE}/contact-us/`, name: "Contact Dr. Aloka's Eye Care", about: { '@id': SITE + '/#clinic' } },
      ],
    });

    afterNextRender(() => {
      const { day, hour, minute } = nowInHyderabad();
      this.today.set(day);
      // sweep from 12 o'clock to now, a full turn plus, so the motion reads as "setting the time"
      requestAnimationFrame(() => {
        this.hourDeg.set(360 + ((hour % 12) + minute / 60) * 30);
        this.minuteDeg.set(360 + minute * 6);
      });
      const minutes = hour * 60 + minute;
      const openDay = HOURS[day]?.open;
      const open = !!openDay && minutes >= 600 && minutes < 1020;
      this.isOpen.set(open);
      if (open) this.status.set('Open now, until 5 pm');
      else if (openDay && minutes < 600) this.status.set('Opens today at 10 am');
      else this.status.set(day === 6 || day === 0 ? 'Closed now, opens Monday at 10 am' : 'Closed now, opens tomorrow at 10 am');
    });
  }

  protected value(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }

  private valid(): boolean {
    this.tried.set(true);
    if (!this.name().trim()) {
      document.getElementById('c-name')?.focus();
      return false;
    }
    if (!this.concern()) {
      document.getElementById('c-concern')?.focus();
      return false;
    }
    return true;
  }
  protected sendWhatsApp(e: Event): void {
    e.preventDefault();
    if (!this.valid()) return;
    window.open(`https://wa.me/917416427503?text=${encodeURIComponent(this.message())}`, '_blank', 'noopener');
  }
  protected sendEmail(): void {
    if (!this.valid()) return;
    const subject = `Appointment request: ${this.concern()}`;
    location.href = `mailto:${CLINIC.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.message())}`;
  }
}

/** An SVG arc path on a circle, angles in degrees clockwise from 12 o'clock. */
function describeArc(cx: number, cy: number, r: number, from: number, to: number): string {
  const pt = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  };
  const large = to - from > 180 ? 1 : 0;
  return `M ${pt(from)} A ${r} ${r} 0 ${large} 1 ${pt(to)}`;
}
