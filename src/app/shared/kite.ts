import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let uid = 0;

/**
 * A Sankranti fighter kite (patang): a square sail flown on its corner,
 * two paper halves, a bamboo spine and bow, and a small tail.
 */
@Component({
  selector: 'app-kite',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 120 170" focusable="false">
      <defs>
        <linearGradient [attr.id]="id" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" [attr.stop-color]="left()" />
          <stop offset="1" [attr.stop-color]="left()" stop-opacity="0.8" />
        </linearGradient>
      </defs>
      <path d="M60 4 L116 60 L60 116 Z" [attr.fill]="right()" />
      <path d="M60 4 L4 60 L60 116 Z" [attr.fill]="'url(#' + id + ')'" />
      <path d="M60 78 L78 96 L60 116 L42 96 Z" fill="#fff" opacity="0.35" />
      <path d="M60 4 L60 116" stroke="#2a1d14" stroke-opacity="0.5" stroke-width="1.6" />
      <path d="M8 62 Q60 26 112 62" fill="none" stroke="#2a1d14" stroke-opacity="0.45" stroke-width="1.6" />
      <path d="M60 116 L50 132 L70 132 Z" [attr.fill]="right()" />
      <path class="tail" d="M60 132 C54 146 68 154 60 168" fill="none" [attr.stroke]="right()" stroke-width="1.6" />
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { display: block; width: 100%; height: auto; overflow: visible; }
  `,
})
export class Kite {
  readonly left = input('#4fb3d9');
  readonly right = input('#2a8cb0');
  protected readonly id = `kite${uid++}`;
}
