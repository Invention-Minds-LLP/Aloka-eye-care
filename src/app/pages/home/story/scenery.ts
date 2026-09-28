import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/*
 * Flat scenery for the story. Everything is exact geometry: blocks, windows,
 * arches, pillars. `mood` is the hour: 'muted' is the worried dusk arrival,
 * 'sunny' the warm twilight they leave in. Lit windows carry the light.
 */

type Mood = 'muted' | 'sunny';

const PALETTES = {
  muted: {
    far: '#232a47', farWin: '#e9b85e', mid: '#2d3556', near: '#383e5e', trim: '#58607f',
    leaf: '#2c4a45', win: '#c9934e', door: '#f4cf8a', shop: '#c9934e', train: '#c9cfdd', trainWin: '#e8b86a', arch: '#1b2140', monument: '#2b3254', archSky: '#1b2140',
  },
  sunny: {
    far: '#3a3560', farWin: '#ffd27a', mid: '#46406e', near: '#5b4a68', trim: '#e0a25a',
    leaf: '#35604d', win: '#e0ac62', door: '#ffe0a0', shop: '#d9a45e', train: '#ded8e6', trainWin: '#f2c476', arch: '#3b2d5c', monument: '#46395f', archSky: '#c7705c',
  },
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
      <g [attr.fill]="c().farWin" opacity="0.55">
        @for (w of windows(); track $index) {
          <rect [attr.x]="w.x" [attr.y]="w.y" width="8" height="10" rx="1" />
        }
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
        <rect x="0" y="96" width="520" height="54" rx="14" [attr.fill]="c().train" />
        <rect x="0" y="130" width="520" height="8" fill="#3aa0c8" />
        @for (w of trainWindows; track w) {
          <rect [attr.x]="w" y="106" width="34" height="18" rx="4" [attr.fill]="c().trainWin" />
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
      <!-- Charminar: four minarets with balconies and onion domes, the great pointed arch, two storeys of small arches -->
      <g transform="translate(508 440) scale(1.12)">
        <g [attr.fill]="c().monument">
          <rect x="3" y="48" width="16" height="252" />
          <rect x="0" y="150" width="22" height="7" rx="1" />
          <rect x="-2" y="108" width="26" height="6" rx="1" />
          <rect x="-2" y="70" width="26" height="6" rx="1" />
          <path d="M1 50 Q-1 30 11 20 Q23 30 21 50 Z" />
          <rect x="10" y="8" width="2" height="13" />
          <circle cx="11" cy="8" r="2.2" />
          <rect x="181" y="48" width="16" height="252" />
          <rect x="178" y="150" width="22" height="7" rx="1" />
          <rect x="176" y="108" width="26" height="6" rx="1" />
          <rect x="176" y="70" width="26" height="6" rx="1" />
          <path d="M179 50 Q177 30 189 20 Q201 30 199 50 Z" />
          <rect x="188" y="8" width="2" height="13" />
          <circle cx="189" cy="8" r="2.2" />
          <!-- body -->
          <rect x="16" y="150" width="168" height="150" />
          <!-- upper storeys and parapet -->
          <rect x="22" y="118" width="156" height="32" />
          <rect x="26" y="92" width="148" height="26" />
          <path d="M26 92 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 h6 v-6 h6 v6 V92 Z" />
          <!-- small mosque dome at the top -->
          <path d="M86 86 Q86 70 100 64 Q114 70 114 86 Z" />
        </g>
        <g [attr.fill]="c().archSky">
          <!-- the great arch -->
          <path d="M52 300 V218 Q52 176 100 164 Q148 176 148 218 V300 Z" />
          <!-- small arches along both upper storeys -->
          <path d="M40 146 V130 Q47 122 54 130 V146 Z" />
          <path d="M62 146 V130 Q69 122 76 130 V146 Z" />
          <path d="M84 146 V130 Q91 122 98 130 V146 Z" />
          <path d="M106 146 V130 Q113 122 120 130 V146 Z" />
          <path d="M128 146 V130 Q135 122 142 130 V146 Z" />
          <path d="M150 146 V130 Q157 122 164 130 V146 Z" />
          <path d="M40 114 V104 Q47 96 54 104 V114 Z" />
          <path d="M62 114 V104 Q69 96 76 104 V114 Z" />
          <path d="M84 114 V104 Q91 96 98 104 V114 Z" />
          <path d="M106 114 V104 Q113 96 120 104 V114 Z" />
          <path d="M128 114 V104 Q135 96 142 104 V114 Z" />
          <path d="M150 114 V104 Q157 96 164 104 V114 Z" />
        </g>
      </g>
      <!-- neighbouring shops -->
      <rect x="120" y="470" width="360" height="310" [attr.fill]="c().near" />
      <rect x="140" y="640" width="150" height="140" [attr.fill]="c().shop" opacity="0.7" />
      <rect x="310" y="640" width="150" height="140" [attr.fill]="c().shop" opacity="0.7" />
      <rect x="120" y="610" width="360" height="18" [attr.fill]="c().trim" />
      <!-- the clinic: third-floor sign, glass entrance -->
      <rect class="clinic-block" x="760" y="360" width="520" height="420" [attr.fill]="c().near" />
      <rect x="760" y="360" width="520" height="14" [attr.fill]="c().trim" />
      @for (row of [400, 510]; track row) {
        @for (col of [790, 910, 1030, 1150]; track col) {
          <rect [attr.x]="col" [attr.y]="row" width="90" height="72" rx="4" [attr.fill]="c().win" />
          <rect [attr.x]="col" [attr.y]="row + 66" width="90" height="6" [attr.fill]="c().trim" />
        }
      }
      <!-- the open door: warm light spilling onto the footpath -->
      <path d="M1040 780 L1080 620 L1250 620 L1290 780 Z" [attr.fill]="c().door" opacity="0.18" />
      <rect x="1080" y="620" width="170" height="160" rx="4" [attr.fill]="c().door" />
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
          <text x="1030" y="292" text-anchor="middle" class="sign">Dr. Aloka's Eye Care</text>
        } @else {
          <!-- arrival street: the name on the left wing, low enough to stay in frame -->
          <rect x="772" y="474" width="240" height="52" rx="6" fill="#fff" />
          <rect x="772" y="520" width="240" height="6" rx="2" fill="#2a8cb0" />
          <circle cx="795" cy="499" r="10" fill="none" stroke="#2a8cb0" stroke-width="3.5" />
          <circle cx="798" cy="497" r="3" fill="#2a8cb0" />
          <text x="902" y="507" text-anchor="middle" class="sign sign--sm">Dr. Aloka's Eye Care</text>
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
    rect[rx="6"][fill="#fff"] { filter: drop-shadow(0 0 10px rgb(255 214 140 / 0.55)); }
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
      <path d="M30 116 L-60 96 L-60 150 Z" fill="#ffe7a3" opacity="0.22" />
      <circle cx="30" cy="120" r="7" fill="#ffe7a3" />
    </svg>
  `,
  styles: `:host{display:block;pointer-events:none} svg{display:block;width:100%;height:auto;overflow:visible}`,
})
export class Auto {}

/** Interior: the consultation room, with a Lea picture chart the child can name. */
@Component({
  selector: 'app-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 1600 690" preserveAspectRatio="xMidYMax slice" focusable="false">
      <!-- a pool of lamplight on the back wall -->
      <ellipse cx="820" cy="420" rx="620" ry="330" fill="#ffcf8a" opacity="0.07" />
      <!-- window onto the city at night -->
      <rect x="140" y="420" width="380" height="220" rx="8" fill="#141c38" />
      <rect x="140" y="420" width="380" height="220" rx="8" fill="none" stroke="#4a4466" stroke-width="14" />
      <rect x="326" y="420" width="8" height="220" fill="#4a4466" />
      <g fill="#253058">
        <rect x="160" y="530" width="60" height="110" /><rect x="230" y="490" width="70" height="150" />
        <rect x="350" y="510" width="60" height="130" /><rect x="420" y="470" width="80" height="170" />
      </g>
      <g fill="#f2c46b" opacity="0.85">
        <rect x="172" y="548" width="8" height="10" /><rect x="244" y="510" width="8" height="10" /><rect x="268" y="560" width="8" height="10" />
        <rect x="364" y="530" width="8" height="10" /><rect x="436" y="492" width="8" height="10" /><rect x="470" y="540" width="8" height="10" />
      </g>
      <!-- hanging lamp -->
      <rect x="818" y="0" width="4" height="250" fill="#4a4466" />
      <path d="M770 250 H870 L846 214 H794 Z" fill="#e0a25a" />
      <ellipse class="lamp-glow" cx="820" cy="262" rx="58" ry="14" fill="#ffe0a0" />
      <!-- Lea picture chart: house, apple, circle, square, the symbols children name -->
      <g transform="translate(1210 404) scale(0.76)">
        <rect width="260" height="360" rx="10" fill="#fbf8f2" stroke="#4a4466" stroke-width="3" />
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
  styles: `
    :host{display:block} svg{display:block;width:100%;height:100%}
    .lamp-glow { filter: blur(6px); animation: lamp 3.2s ease-in-out infinite alternate; }
    @keyframes lamp { from { opacity: 0.75; } to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .lamp-glow { animation: none; } }
  `,
})
export class Room {}
