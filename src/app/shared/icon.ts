import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'arrow' | 'phone' | 'pin' | 'clock' | 'mail' | 'route' | 'menu' | 'close' | 'whatsapp' | 'play' | 'pause' | 'replay';

/** One stroke family (24px grid, 1.8 stroke, round joins) for every icon on the site. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', style: 'display:contents' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">
      @switch (name()) {
        @case ('arrow') { <path d="M7 17 17 7M9 7h8v8" /> }
        @case ('phone') {
          <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
        }
        @case ('pin') { <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /> }
        @case ('clock') { <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /> }
        @case ('mail') { <rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /> }
        @case ('route') { <circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" /> }
        @case ('menu') { <path d="M4 7h16M4 12h16M4 17h10" /> }
        @case ('close') { <path d="M6 6l12 12M18 6 6 18" /> }
        @case ('play') { <path d="M8 5.5v13l10-6.5Z" fill="currentColor" /> }
        @case ('pause') { <path d="M8 5.5v13M16 5.5v13" stroke-width="3" /> }
        @case ('replay') { <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v3.8h3.8" /> }
        @case ('whatsapp') {
          <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
          <path d="M9.2 8.6c.2-.5.5-.6.9-.6l.6 1.4-.6.8c.4 1 1.3 1.9 2.4 2.4l.8-.6 1.4.6c0 .4-.1.8-.6 1-.9.4-2.6 0-4-1.4s-1.8-3-1.4-3.6Z" fill="currentColor" stroke="none" />
        }
      }
    </svg>
  `,
  styles: `
    svg { width: var(--icon, 1.15rem); height: var(--icon, 1.15rem); flex: none; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
