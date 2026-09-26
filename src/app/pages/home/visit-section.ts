import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CLINIC, HOURS } from './home.content';

/** Current day and hour in Hyderabad, whatever the visitor's own timezone. */
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
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

@Component({
  selector: 'app-visit-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective],
  templateUrl: './visit-section.html',
  styleUrl: './visit-section.scss',
})
export class VisitSection {
  protected readonly clinic = CLINIC;
  /** Monday first, the way the clinic's week runs. */
  protected readonly week = [...HOURS.slice(1), HOURS[0]].map((h) => ({ ...h, index: HOURS.indexOf(h) }));
  protected readonly today = signal(-1);
  protected readonly status = signal<string | null>(null);
  protected readonly year = new Date().getFullYear();
  /** A fixed, first-party constant: the clinic's own Maps embed. */
  protected readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CLINIC.mapsEmbed);

  constructor() {
    afterNextRender(() => {
      const { day, minutes } = nowInHyderabad();
      this.today.set(day);
      const openDay = HOURS[day]?.open;
      if (openDay && minutes >= 600 && minutes < 1020) this.status.set('Open now, until 5 pm');
      else if (openDay && minutes < 600) this.status.set('Opens today at 10 am');
      else this.status.set(day === 6 || day === 0 ? 'Closed now, opens Monday at 10 am' : 'Closed now, opens tomorrow at 10 am');
    });
  }
}
