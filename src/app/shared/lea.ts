import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type LeaShape = 'house' | 'apple' | 'circle' | 'square';
export const LEA_SHAPES: LeaShape[] = ['house', 'apple', 'circle', 'square'];

/** A Lea symbol: the house, apple, circle and square children name in their eye test. */
@Component({
  selector: 'app-lea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 16 16" focusable="false">
      @switch (shape()) {
        @case ('house') {
          <path d="M2 8 8 2.5 14 8v5.5H2Z" />
        }
        @case ('apple') {
          <path d="M8 4.5c-1-1.2-5-1.5-5 3 0 3.5 2.5 6 3.5 6 .6 0 1-.4 1.5-.4s.9.4 1.5.4c1 0 3.5-2.5 3.5-6 0-4.5-4-4.2-5-3ZM8 4.5 9 1.8" />
        }
        @case ('circle') {
          <circle cx="8" cy="8" r="5.5" />
        }
        @default {
          <rect x="2.5" y="2.5" width="11" height="11" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: inline-block; width: 1em; height: 1em; line-height: 0; }
    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: var(--lea-stroke, 1.8);
      stroke-linejoin: round;
      stroke-linecap: round;
    }
  `,
})
export class Lea {
  readonly shape = input<LeaShape>('circle');
}
