import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/*
 * Flat scenery for the story. Everything is exact geometry: blocks, windows,
 * arches, pillars. `mood` shifts the palette from an overcast morning to sun.
 */

type Mood = 'muted' | 'sunny';

const PALETTES = {
  muted: { far: '#c9d2dc', farWin: '#dfe5eb', mid: '#aebac6', near: '#e7e2da', trim: '#9aa6b2', leaf: '#8fa89a', road: '#b9c0c7' },
  sunny: { far: '#cfe3ee', farWin: '#e8f3f8', mid: '#9fc7da', near: '#f6ead8', trim: '#e0a25a', leaf: '#5fae7b', road: '#c9cdd1' },
} as const;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Far layer: apartment towers of Kukatpally, and the Charminar small on the horizon. */
@Component({
  selector: 'app-skyline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" focusable="false">
      <g [attr.fill]="c().far">
        @for (b of towers(); track $index) {
          <rect [attr.x]="b.x" [attr.y]="b.y" [attr.width]="b.w" [attr.height]="420 - b.y" rx="2" />
        }
      </g>
      <g [attr.fill]="c().farWin">
        @for (w of windows(); track $index) {
          <rect [attr.x]="w.x" [attr.y]="w.y" width="8" height="10" rx="1" />
        }
      </g>
      <!-- Charminar: four minarets, a square body, two open arches -->
      <g [attr.fill]="c().far" transform="translate(560 120) scale(1.35)">
        <rect x="0" y="40" width="150" height="172" />
        <rect x="-8" y="0" width="16" height="212" /><rect x="142" y="0" width="16" height="212" />
        <circle cx="0" cy="-2" r="10" /><circle cx="150" cy="-2" r="10" />
        <rect x="-10" y="60" width="20" height="4" /><rect x="140" y="60" width="20" height="4" />
        <rect x="-10" y="120" width="20" height="4" /><rect x="140" y="120" width="20" height="4" />
      </g>
      <g [attr.fill]="c().farWin" transform="translate(560 120) scale(1.35)">
        <path d="M22 212 V120 Q46 86 70 120 V212 Z" /><path d="M80 212 V120 Q104 86 128 120 V212 Z" />
      </g>
    </svg>
  `,
  styles: `:host{display:block} svg{display:block;width:100%;height:100%}`,
})
export class Skyline {
  readonly mood = input<Mood>('muted');
  readonly seed = input(4);
  protected readonly c = computed(() => PALETTES[this.mood()]);
  private readonly layout = computed(() => {
    const r = rng(this.seed());
    const towers: { x: number; y: number; w: number }[] = [];
    const windows: { x: number; y: number }[] = [];
    let x = 0;
    while (x < 1600) {
      const w = 60 + r() * 90;
      if (x > 520 && x < 800) {
        x = 800;
        continue;
      }
      const y = 120 + r() * 200;
      towers.push({ x, y, w });
      for (let wy = y + 16; wy < 400; wy += 26) for (let wx = x + 10; wx < x + w - 14; wx += 18) if (r() > 0.55) windows.push({ x: wx, y: wy });
      x += w + 8 + r() * 30;
    }
    return { towers, windows };
  });
  protected readonly towers = computed(() => this.layout().towers);
  protected readonly windows = computed(() => this.layout().windows);
}

/** Mid layer: the elevated metro line through KPHB, and a train on it. */
@Component({
  selector: 'app-metro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" focusable="false">
      <g [attr.fill]="c().mid">
        <rect x="0" y="150" width="1600" height="26" />
        <rect x="0" y="176" width="1600" height="6" opacity="0.6" />
        @for (p of pillars; track p) {
          <path [attr.d]="'M' + (p - 18) + ' 182 h36 l-8 18 v220 h-20 v-220 Z'" />
        }
      </g>
      <g class="train" [style.--x]="train()">
        <rect x="0" y="96" width="520" height="54" rx="14" fill="#f4f7fa" />
        <rect x="0" y="130" width="520" height="8" fill="#1d6e8c" />
        @for (w of trainWindows; track w) {
          <rect [attr.x]="w" y="106" width="34" height="18" rx="4" fill="#9fb3c4" />
        }
      </g>
    </svg>
  `,
  styles: `
    :host{display:block} svg{display:block;width:100%;height:100%}
    .train { transform: translateX(var(--x, 0px)); }
  `,
})
export class Metro {
  readonly mood = input<Mood>('muted');
  /** Train offset in viewBox units. */
  readonly trainX = input(0);
  protected readonly c = computed(() => PALETTES[this.mood()]);
  protected readonly train = computed(() => `${this.trainX()}px`);
  protected readonly pillars = [80, 380, 680, 980, 1280, 1580];
  protected readonly trainWindows = [24, 74, 124, 174, 224, 294, 344, 394, 444];
}

/** Near layer: the clinic's building, shops beside it, a neem tree and the footpath. */
@Component({
  selector: 'app-street',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg [attr.viewBox]="compact() ? '220 0 1600 780' : '0 0 1600 780'" preserveAspectRatio="xMidYMax slice" focusable="false">
      <!-- neighbouring shops -->
      <rect x="120" y="470" width="360" height="310" [attr.fill]="c().near" />
      <rect x="140" y="640" width="150" height="140" fill="#fff" opacity="0.55" />
      <rect x="310" y="640" width="150" height="140" fill="#fff" opacity="0.55" />
      <rect x="120" y="610" width="360" height="18" [attr.fill]="c().trim" />
      <!-- the clinic: third-floor sign, glass entrance -->
      <rect class="clinic-block" x="760" y="360" width="520" height="420" [attr.fill]="c().near" />
      <rect x="760" y="360" width="520" height="14" [attr.fill]="c().trim" />
      @for (row of [400, 510]; track row) {
        @for (col of [790, 910, 1030, 1150]; track col) {
          <rect [attr.x]="col" [attr.y]="row" width="90" height="72" rx="4" fill="#dbe7ee" />
          <rect [attr.x]="col" [attr.y]="row + 66" width="90" height="6" [attr.fill]="c().trim" />
        }
      }
      <rect x="1080" y="620" width="170" height="160" rx="4" fill="#cfe1ea" />
      <rect x="1163" y="620" width="4" height="160" [attr.fill]="c().trim" />
      <rect x="1062" y="600" width="206" height="16" rx="3" [attr.fill]="c().trim" />
      @if (mood() === 'muted') {
        @if (compact()) {
          <!-- phones: a rooftop board, clear above the family -->
          <rect x="880" y="300" width="8" height="62" [attr.fill]="c().trim" />
          <rect x="1152" y="300" width="8" height="62" [attr.fill]="c().trim" />
          <rect x="846" y="256" width="348" height="56" rx="6" fill="#fff" />
          <rect x="846" y="306" width="348" height="6" rx="2" fill="#2a8cb0" />
          <circle cx="874" cy="283" r="11" fill="none" stroke="#2a8cb0" stroke-width="4" />
          <circle cx="877" cy="281" r="3.5" fill="#2a8cb0" />
          <text x="1030" y="292" text-anchor="middle" class="sign">Dr Aloka's Eye Care</text>
        } @else {
          <!-- arrival street: the name on the left wing, low enough to stay in frame -->
          <rect x="772" y="474" width="240" height="52" rx="6" fill="#fff" />
          <rect x="772" y="520" width="240" height="6" rx="2" fill="#2a8cb0" />
          <circle cx="795" cy="499" r="10" fill="none" stroke="#2a8cb0" stroke-width="3.5" />
          <circle cx="798" cy="497" r="3" fill="#2a8cb0" />
          <text x="902" y="507" text-anchor="middle" class="sign sign--sm">Dr Aloka's Eye Care</text>
        }
      }
      <!-- neem tree -->
      <rect x="1392" y="560" width="18" height="220" fill="#7a5a44" />
      <circle cx="1402" cy="520" r="78" [attr.fill]="c().leaf" />
      <circle cx="1352" cy="560" r="52" [attr.fill]="c().leaf" />
      <circle cx="1456" cy="558" r="56" [attr.fill]="c().leaf" />
    </svg>
  `,
  styles: `
    :host{display:block} svg{display:block;width:100%;height:100%}
    .sign { font: 700 23px 'Bricolage Grotesque Variable', sans-serif; fill: #b94e14; letter-spacing: -0.01em; }
    .sign--sm { font-size: 19px; }
  `,
})
export class Street {
  readonly mood = input<Mood>('muted');
  /** Phone framing: centre the clinic and fit its sign. */
  readonly compact = input(false);
  protected readonly c = computed(() => PALETTES[this.mood()]);
}

/** A Hyderabad auto-rickshaw, parked or pulling away. */
@Component({
  selector: 'app-auto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 260 190" focusable="false">
      <path d="M40 40 Q60 8 130 8 L190 8 Q230 10 236 60 L236 150 L30 150 L30 80 Z" fill="#f2c230" />
      <path d="M30 80 L236 80 L236 150 L30 150 Z" fill="#1f6b4a" />
      <path d="M52 44 Q70 20 120 20 L150 20 L150 80 L44 80 Z" fill="#cfe1ea" opacity="0.8" />
      <rect x="170" y="86" width="56" height="44" rx="4" fill="#185a3d" />
      <rect x="20" y="146" width="226" height="10" rx="4" fill="#1b2a3a" />
      <circle cx="62" cy="160" r="22" fill="#1b2a3a" /><circle cx="62" cy="160" r="8" fill="#8e9aa6" />
      <circle cx="206" cy="160" r="22" fill="#1b2a3a" /><circle cx="206" cy="160" r="8" fill="#8e9aa6" />
      <circle cx="30" cy="120" r="7" fill="#ffe7a3" />
    </svg>
  `,
  styles: `:host{display:block;pointer-events:none} svg{display:block;width:100%;height:auto}`,
})
export class Auto {}

/** Interior: the consultation room, with a Lea picture chart the child can name. */
@Component({
  selector: 'app-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 1600 690" preserveAspectRatio="xMidYMax slice" focusable="false">
      <!-- window onto the city -->
      <rect x="140" y="420" width="380" height="220" rx="8" fill="#d8e9f2" />
      <rect x="140" y="420" width="380" height="220" rx="8" fill="none" stroke="#fff" stroke-width="14" />
      <rect x="326" y="420" width="8" height="220" fill="#fff" />
      <g fill="#bcd3e0">
        <rect x="160" y="530" width="60" height="110" /><rect x="230" y="490" width="70" height="150" />
        <rect x="350" y="510" width="60" height="130" /><rect x="420" y="470" width="80" height="170" />
      </g>
      <!-- Lea picture chart: house, apple, circle, square, the symbols children name -->
      <g transform="translate(1210 404) scale(0.76)">
        <rect width="260" height="360" rx="10" fill="#fff" stroke="#e0d6ca" stroke-width="3" />
        <g fill="none" stroke="#1b2a3a" stroke-width="7" stroke-linejoin="round">
          <path d="M92 90 L130 56 L168 90 V128 H92 Z" />
          <circle cx="130" cy="186" r="26" />
        </g>
        <g fill="none" stroke="#1b2a3a" stroke-width="4.5" stroke-linejoin="round">
          <rect x="66" y="236" width="34" height="34" />
          <path d="M160 238 q-14 -8 -20 6 q-6 18 8 30 q6 4 12 0 q6 4 12 0 q14 -12 8 -30 q-6 -14 -20 -6 Z" />
        </g>
        <g fill="#1b2a3a"><circle cx="90" cy="310" r="8" /><rect x="118" y="302" width="16" height="16" /><circle cx="164" cy="310" r="8" /></g>
      </g>
      <!-- plant -->
      <rect x="1470" y="600" width="70" height="90" rx="8" fill="#e8792f" />
      <circle cx="1490" cy="570" r="34" fill="#5fae7b" /><circle cx="1530" cy="556" r="30" fill="#4d9a69" />
    </svg>
  `,
  styles: `:host{display:block} svg{display:block;width:100%;height:100%}`,
})
export class Room {}
