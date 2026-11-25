import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Faint concentric rings (like a placido disc): the decorative background mark of the Clinic Light design.
 *  Position and size it with inline styles; add [appParallax] to make it drift. */
@Component({
  selector: 'app-rings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'deco-rings', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 200 200" width="100%" height="100%" focusable="false">
      <g fill="none" stroke="currentColor" stroke-width="1.2">
        <circle cx="100" cy="100" r="98" /><circle cx="100" cy="100" r="86" /><circle cx="100" cy="100" r="74" />
        <circle cx="100" cy="100" r="62" /><circle cx="100" cy="100" r="50" /><circle cx="100" cy="100" r="38" />
        <circle cx="100" cy="100" r="26" />
      </g>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity=".5" />
    </svg>
  `,
  styles: `:host { display: block; } svg { display: block; }`,
})
export class Rings {}
