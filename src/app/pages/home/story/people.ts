import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/*
 * The story's cast, drawn flat: a mother in a saree, her school-age daughter,
 * and Dr. Aloka in a white coat over a saree. Each takes a mood (face) and a
 * pose (arms) so one drawing plays every scene. `walking` swings legs and bobs.
 */

export type Mood = 'worried' | 'calm' | 'smile' | 'joy';

const FACE = `
  @switch (mood()) {
    @case ('worried') {
      <path class="brow" d="M83 70 L94 66 M106 66 L117 70" />
      <path class="mouth" d="M92 96 Q100 91 108 96" />
    }
    @case ('calm') {
      <path class="brow" d="M83 68 Q89 65 95 67 M105 67 Q111 65 117 68" />
      <path class="mouth" d="M92 94 Q100 97 108 94" />
    }
    @case ('smile') {
      <path class="brow" d="M83 67 Q89 63 95 66 M105 66 Q111 63 117 67" />
      <path class="mouth" d="M90 92 Q100 101 110 92" />
      <circle class="blush" cx="84" cy="90" r="5" /><circle class="blush" cx="116" cy="90" r="5" />
    }
    @case ('joy') {
      <path class="brow" d="M83 66 Q89 61 95 65 M105 65 Q111 61 117 66" />
      <path class="mouth mouth--open" d="M89 91 Q100 105 111 91 Z" />
      <circle class="blush" cx="84" cy="90" r="5.5" /><circle class="blush" cx="116" cy="90" r="5.5" />
    }
  }
`;

const FIGURE_STYLES = `
  :host { display: block; pointer-events: none; }
  svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .brow { fill: none; stroke: #1f1614; stroke-width: 2.6; stroke-linecap: round; }
  .mouth { fill: none; stroke: #6e2a24; stroke-width: 2.6; stroke-linecap: round; }
  .mouth--open { fill: #7a2a2a; stroke-linejoin: round; }
  .blush { fill: #e0826f; opacity: 0.35; }
  .limb { fill: none; stroke-linecap: round; stroke-linejoin: round; }
  .leg { transform-box: fill-box; transform-origin: 50% 0; }
  .body { transform-box: fill-box; transform-origin: 50% 100%; }
  :host(.is-walking) .body { animation: bob 0.55s ease-in-out infinite alternate; }
  :host(.is-walking) .leg--l { animation: stride 0.55s ease-in-out infinite alternate; }
  :host(.is-walking) .leg--r { animation: stride 0.55s ease-in-out infinite alternate-reverse; }
  .wave { transform-box: fill-box; transform-origin: 0% 100%; animation: wave 0.9s ease-in-out infinite alternate; }
  @keyframes bob { to { transform: translateY(-4px); } }
  @keyframes stride { from { transform: rotate(-13deg); } to { transform: rotate(13deg); } }
  @keyframes wave { from { transform: rotate(-10deg); } to { transform: rotate(14deg); } }
  @media (prefers-reduced-motion: reduce) {
    :host(.is-walking) .body, :host(.is-walking) .leg, .wave { animation: none; }
  }
`;

@Component({
  selector: 'app-mother',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class.is-walking]': 'walking()' },
  template: `
    <svg viewBox="0 0 200 470" focusable="false">
      <g class="body">
        @if (elder()) {
          <!-- grey hair in a low bun -->
          <circle cx="100" cy="112" r="15" [attr.fill]="c().hair" />
        } @else {
          <!-- braid falling behind -->
          <path d="M78 76 Q70 128 90 160 L110 160 Q130 128 122 76 Z" [attr.fill]="c().hair" />
        }
        <!-- saree skirt, pleats and border -->
        <path d="M72 226 L128 226 L150 434 Q100 444 50 434 Z" [attr.fill]="c().saree" />
        <path d="M92 246 L84 430 M103 246 L104 434 M113 246 L122 430" stroke="#000" stroke-opacity="0.12" stroke-width="2" />
        <path d="M51 418 Q100 428 149 418 L150 434 Q100 444 50 434 Z" [attr.fill]="c().border" />
        <ellipse cx="84" cy="442" rx="14" ry="6" fill="#3b2a22" />
        <ellipse cx="116" cy="442" rx="14" ry="6" fill="#3b2a22" />
        <!-- blouse, waist and pallu over the shoulder -->
        <path d="M66 132 Q100 118 134 132 L130 214 L70 214 Z" [attr.fill]="c().blouse" />
        <rect x="72" y="208" width="56" height="20" rx="6" [attr.fill]="c().skin" />
        <path d="M110 122 L138 134 L134 176 L100 240 L68 240 L70 226 Z" [attr.fill]="c().saree" />
        <path d="M68 238 L112 124" [attr.stroke]="c().border" stroke-width="5" stroke-linecap="round" />
        <!-- arm nearer the viewer's left -->
        <path class="limb" d="M68 140 Q56 190 58 248" [attr.stroke]="c().skin" stroke-width="15" />
        <path class="limb" d="M68 140 Q63 156 61 168" [attr.stroke]="c().blouse" stroke-width="18" />
        <path d="M52 246 Q58 262 66 250 L64 244 Z" [attr.fill]="c().skin" />
        <!-- arm nearer the viewer's right: posed -->
        @switch (arm()) {
          @case ('hold') {
            <path class="limb" d="M132 140 Q146 222 170 284" [attr.stroke]="c().skin" stroke-width="15" />
            <path class="limb" d="M132 140 Q139 156 143 166" [attr.stroke]="c().blouse" stroke-width="18" />
            <path d="M164 282 Q172 298 180 286 L176 278 Z" [attr.fill]="c().skin" />
          }
          @case ('shoulder') {
            <path class="limb" d="M132 140 Q158 214 176 290" [attr.stroke]="c().skin" stroke-width="15" />
            <path class="limb" d="M132 140 Q140 154 145 162" [attr.stroke]="c().blouse" stroke-width="18" />
            <path d="M170 290 Q180 302 190 292 L184 284 Z" [attr.fill]="c().skin" />
          }
          @case ('heart') {
            <!-- hand on heart: relief -->
            <path class="limb" d="M132 140 Q140 196 110 180" [attr.stroke]="c().skin" stroke-width="15" />
            <path class="limb" d="M132 140 Q139 156 141 168" [attr.stroke]="c().blouse" stroke-width="18" />
            <ellipse cx="104" cy="176" rx="11" ry="8" [attr.fill]="c().skin" />
          }
          @case ('wave') {
            <g class="wave">
              <path class="limb" d="M132 140 Q158 116 160 66" [attr.stroke]="c().skin" stroke-width="15" />
              <path class="limb" d="M132 140 Q142 132 148 124" [attr.stroke]="c().blouse" stroke-width="18" />
              <path d="M152 62 Q152 46 160 44 Q170 46 168 62 Z" [attr.fill]="c().skin" />
            </g>
          }
        }
        <!-- neck, head, ears -->
        <rect x="92" y="100" width="16" height="26" rx="6" [attr.fill]="c().skin" />
        <ellipse cx="70" cy="82" rx="5" ry="7" [attr.fill]="c().skin" />
        <ellipse cx="130" cy="82" rx="5" ry="7" [attr.fill]="c().skin" />
        <circle cx="100" cy="80" r="30" [attr.fill]="c().skin" />
        <circle cx="70" cy="93" r="3" fill="#e8a33a" /><circle cx="130" cy="93" r="3" fill="#e8a33a" />
        <!-- hair with a centre parting -->
        <path d="M70 84 Q66 46 100 45 Q134 46 130 84 Q128 62 112 57 Q104 64 100 56 Q96 64 88 57 Q72 62 70 84 Z" [attr.fill]="c().hair" />
        <!-- face -->
        <ellipse cx="89" cy="80" rx="2.8" ry="3.4" fill="#1f1614" />
        <ellipse cx="111" cy="80" rx="2.8" ry="3.4" fill="#1f1614" />
        <circle cx="100" cy="66" r="2.3" fill="#c2335a" />
        @if (elder()) {
          <g fill="none" stroke="#5b4a3a" stroke-width="2"><circle cx="89" cy="80" r="7.5" /><circle cx="111" cy="80" r="7.5" /><path d="M96.5 79 Q100 76 103.5 79" /></g>
          <path d="M84 88 Q86 91 88 88 M112 88 Q114 91 116 88" fill="none" stroke="#8a5a40" stroke-width="1.2" />
        }
        ${FACE}
      </g>
    </svg>
  `,
  styles: FIGURE_STYLES,
})
export class Mother {
  readonly mood = input<Mood>('worried');
  readonly arm = input<'hold' | 'shoulder' | 'heart' | 'wave'>('hold');
  readonly walking = input(false);
  /** The grandmother: grey bun, spectacles, a cream saree with a maroon border. */
  readonly elder = input(false);
  protected readonly c = computed(() =>
    this.elder()
      ? { saree: '#efe4cf', border: '#8a2e3b', blouse: '#8a2e3b', hair: '#b8bcc2', skin: '#a8704f' }
      : { saree: '#c2335a', border: '#e8a33a', blouse: '#1f7a8c', hair: '#1f1614', skin: '#b97a56' },
  );
}

@Component({
  selector: 'app-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class.is-walking]': 'walking()',
    '[style.--turn]': "(squint() * -3.6) + 'px'",
  },
  template: `
    <svg viewBox="0 0 140 300" focusable="false">
      <g class="body">
        <!-- legs, socks, school shoes -->
        <g class="leg leg--l">
          <rect x="52" y="196" width="12" height="78" rx="6" fill="#c98b63" />
          <rect x="51" y="258" width="14" height="16" rx="3" fill="#fff" />
          <ellipse cx="56" cy="282" rx="11" ry="6" fill="#1f1614" />
        </g>
        <g class="leg leg--r">
          <rect x="76" y="196" width="12" height="78" rx="6" fill="#c98b63" />
          <rect x="75" y="258" width="14" height="16" rx="3" fill="#fff" />
          <ellipse cx="84" cy="282" rx="11" ry="6" fill="#1f1614" />
        </g>
        <!-- ponytails -->
        <ellipse cx="34" cy="56" rx="10" ry="19" fill="#1f1614" transform="rotate(-18 34 56)" />
        <ellipse cx="106" cy="56" rx="10" ry="19" fill="#1f1614" transform="rotate(18 106 56)" />
        <circle cx="41" cy="42" r="4.5" fill="#e8792f" /><circle cx="99" cy="42" r="4.5" fill="#e8792f" />
        <!-- school pinafore over a white shirt -->
        <path d="M44 112 Q70 102 96 112 L110 204 Q70 212 30 204 Z" fill="#2a8cb0" />
        <path d="M56 106 L70 124 L84 106 Z" fill="#fff" />
        @if (bag()) {
          <path d="M50 114 L54 200 M90 114 L86 200" stroke="#e8792f" stroke-width="5" stroke-linecap="round" />
        }
        <!-- arms -->
        @switch (arm()) {
          @case ('hold') {
            <path class="limb" d="M48 120 Q28 124 12 116" stroke="#c98b63" stroke-width="11" />
            <circle cx="10" cy="116" r="6.5" fill="#c98b63" />
            <path class="limb" d="M92 120 Q100 158 98 188" stroke="#c98b63" stroke-width="11" />
            <circle cx="98" cy="192" r="6.5" fill="#c98b63" />
          }
          @case ('rest') {
            <path class="limb" d="M48 120 Q40 158 42 188" stroke="#c98b63" stroke-width="11" />
            <circle cx="42" cy="192" r="6.5" fill="#c98b63" />
            <path class="limb" d="M92 120 Q100 158 98 188" stroke="#c98b63" stroke-width="11" />
            <circle cx="98" cy="192" r="6.5" fill="#c98b63" />
          }
          @case ('tablet') {
            <path class="limb" d="M48 120 Q46 150 60 160" stroke="#c98b63" stroke-width="11" />
            <path class="limb" d="M92 120 Q94 150 80 160" stroke="#c98b63" stroke-width="11" />
            <rect x="46" y="140" width="48" height="34" rx="5" fill="#1b2a3a" />
            <rect x="50" y="144" width="40" height="26" rx="2" fill="#bfe3f2" />
            <circle class="tablet-dot" cx="62" cy="157" r="4" fill="#e8792f" />
          }
          @case ('book') {
            <!-- an open picture book held up to read -->
            <path class="limb" d="M48 120 Q44 150 56 162" stroke="#c98b63" stroke-width="11" />
            <path class="limb" d="M92 120 Q96 150 84 162" stroke="#c98b63" stroke-width="11" />
            <path d="M70 146 L40 140 L40 176 L70 182 Z" fill="#e8792f" />
            <path d="M70 146 L100 140 L100 176 L70 182 Z" fill="#f2b134" />
            <path d="M70 150 L45 145 L45 172 L70 177 Z M70 150 L95 145 L95 172 L70 177 Z" fill="#fbf8f2" />
            <path d="M50 155 L64 158 M50 162 L64 165 M76 158 L90 155 M76 165 L90 162" stroke="#c9bfae" stroke-width="2" stroke-linecap="round" />
          }
          @case ('balloon') {
            <path class="limb" d="M48 120 Q28 124 12 116" stroke="#c98b63" stroke-width="11" />
            <circle cx="10" cy="116" r="6.5" fill="#c98b63" />
            <path class="limb" d="M92 120 Q112 96 114 66" stroke="#c98b63" stroke-width="11" />
            <circle cx="114" cy="62" r="6.5" fill="#c98b63" />
            <path d="M114 58 Q122 10 112 -40" fill="none" stroke="#4a5a6b" stroke-width="1.5" />
            <ellipse class="balloon" cx="112" cy="-72" rx="26" ry="32" fill="#e8792f" />
            <path d="M108 -40 L116 -40 L112 -34 Z" fill="#b94e14" />
            <ellipse cx="102" cy="-84" rx="6" ry="9" fill="#fff" opacity="0.35" />
          }
        }
        <!-- head -->
        <circle cx="70" cy="64" r="32" fill="#c98b63" />
        <path d="M38 64 Q34 26 70 25 Q106 26 102 64 Q100 46 86 40 Q76 50 60 42 Q42 46 38 64 Z" fill="#1f1614" />
        <!-- eyes: the child's left eye turns in while the squint is untreated -->
        <circle cx="58" cy="68" r="7" fill="#fff" />
        <circle cx="82" cy="68" r="7" fill="#fff" />
        <circle cx="58" cy="68" r="3.8" fill="#2a1d18" />
        <circle class="pupil-turn" cx="82" cy="68" r="3.8" fill="#2a1d18" />
        @if (patch()) {
          <ellipse cx="58" cy="68" rx="11" ry="10" fill="#f3d9c4" stroke="#e0bfa6" stroke-width="1.5" />
          <path d="M58 62 l1.8 3.8 4.2.5-3.1 2.9.8 4.1-3.7-2-3.7 2 .8-4.1-3.1-2.9 4.2-.5Z" fill="#e8a33a" />
        }
        @if (glasses()) {
          <g fill="rgb(255 255 255 / 0.12)" stroke="#1b2a3a" stroke-width="2.4">
            <circle cx="58" cy="68" r="11" /><circle cx="82" cy="68" r="11" />
            <path d="M69 67 Q70 64 71 67" fill="none" />
          </g>
        }
        <g transform="translate(-30 -12)">${FACE}</g>
      </g>
    </svg>
  `,
  styles:
    FIGURE_STYLES +
    `
    .pupil-turn { transform: translateX(var(--turn, 0px)); transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
    .balloon { transform-box: fill-box; transform-origin: 50% 100%; animation: float 2.4s ease-in-out infinite alternate; }
    .tablet-dot { animation: track 1.6s ease-in-out infinite alternate; }
    @keyframes float { to { transform: rotate(6deg) translateY(-4px); } }
    @keyframes track { to { transform: translateX(16px); } }
    @media (prefers-reduced-motion: reduce) { .balloon, .tablet-dot { animation: none; } }
  `,
})
export class Child {
  readonly mood = input<Mood>('worried');
  readonly arm = input<'hold' | 'rest' | 'tablet' | 'book' | 'balloon'>('hold');
  /** 1 = the untreated squint (left eye turned in), 0 = aligned. */
  readonly squint = input(1);
  readonly walking = input(false);
  readonly bag = input(false);
  readonly patch = input(false);
  readonly glasses = input(false);
}

@Component({
  selector: 'app-doctor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 200 470" focusable="false">
      <g class="body">
        <!-- shoulder-length hair behind -->
        <path d="M66 78 Q60 122 78 134 L122 134 Q140 122 134 78 Z" fill="#1f1614" />
        <!-- saree below the coat -->
        <path d="M70 388 L130 388 L146 436 Q100 446 54 436 Z" fill="#c2335a" />
        <path d="M55 424 Q100 432 145 424 L146 436 Q100 446 54 436 Z" fill="#e8a33a" />
        <ellipse cx="86" cy="442" rx="13" ry="6" fill="#3b2a22" />
        <ellipse cx="114" cy="442" rx="13" ry="6" fill="#3b2a22" />
        <!-- white coat, saree at the neckline -->
        <path d="M62 134 Q100 120 138 134 L148 398 L52 398 Z" fill="#fbfcfd" stroke="#d3dae1" stroke-width="2" />
        <path d="M88 128 L100 176 L112 128 Z" fill="#c2335a" />
        <path d="M88 128 L100 176 L94 232 M112 128 L100 176 L106 232" fill="none" stroke="#d3dae1" stroke-width="2" />
        <rect x="112" y="250" width="22" height="26" rx="3" fill="none" stroke="#d3dae1" stroke-width="2" />
        <rect x="70" y="196" width="22" height="8" rx="2" fill="#1d6e8c" />
        <!-- stethoscope -->
        <path d="M88 130 Q82 172 96 190 M112 130 Q118 172 104 190" fill="none" stroke="#1d6e8c" stroke-width="3" stroke-linecap="round" />
        <circle cx="100" cy="196" r="6" fill="#1d6e8c" />
        <!-- arm nearer the viewer's left -->
        <path class="limb" d="M66 142 Q56 190 57 234" stroke="#c9d1d9" stroke-width="22" /><path class="limb" d="M66 142 Q56 190 57 234" stroke="#fbfcfd" stroke-width="18" />
        <path class="limb" d="M57 234 L58 258" stroke="#b07150" stroke-width="12" />
        <path d="M52 256 Q58 272 65 258 L63 252 Z" fill="#b07150" />
        @switch (arm()) {
          @case ('examine') {
            <path class="limb" d="M134 142 Q150 182 160 206" stroke="#c9d1d9" stroke-width="22" /><path class="limb" d="M134 142 Q150 182 160 206" stroke="#fbfcfd" stroke-width="18" />
            <path class="limb" d="M160 206 L178 228" stroke="#b07150" stroke-width="12" />
            <path d="M174 222 Q188 226 186 236 L176 236 Z" fill="#b07150" />
            <rect x="182" y="222" width="22" height="6" rx="3" fill="#8e9aa6" transform="rotate(-8 182 222)" />
            <circle class="glow" cx="210" cy="222" r="9" fill="#ffe7a3" />
          }
          @case ('point') {
            <path class="limb" d="M134 142 Q156 124 164 104" stroke="#c9d1d9" stroke-width="22" /><path class="limb" d="M134 142 Q156 124 164 104" stroke="#fbfcfd" stroke-width="18" />
            <path class="limb" d="M164 104 L174 82" stroke="#b07150" stroke-width="12" />
            <path d="M168 84 Q174 64 180 78 L178 88 Z" fill="#b07150" />
          }
          @case ('wave') {
            <g class="wave">
              <path class="limb" d="M134 142 Q156 124 159 100" stroke="#c9d1d9" stroke-width="22" /><path class="limb" d="M134 142 Q156 124 159 100" stroke="#fbfcfd" stroke-width="18" />
              <path class="limb" d="M159 100 L161 72" stroke="#b07150" stroke-width="12" />
              <path d="M153 72 Q153 54 161 52 Q171 54 169 72 Z" fill="#b07150" />
            </g>
          }
          @case ('rest') {
            <path class="limb" d="M134 142 Q146 190 143 234" stroke="#c9d1d9" stroke-width="22" /><path class="limb" d="M134 142 Q146 190 143 234" stroke="#fbfcfd" stroke-width="18" />
            <path class="limb" d="M143 234 L142 258" stroke="#b07150" stroke-width="12" />
            <path d="M136 256 Q142 272 149 258 L147 252 Z" fill="#b07150" />
          }
        }
        <!-- head -->
        <rect x="92" y="100" width="16" height="26" rx="6" fill="#b07150" />
        <circle cx="100" cy="80" r="30" fill="#b07150" />
        <path d="M68 92 Q62 44 100 44 Q138 44 132 92 Q130 64 116 56 Q98 64 82 60 Q70 68 68 92 Z" fill="#1f1614" />
        <ellipse cx="89" cy="80" rx="2.8" ry="3.4" fill="#1f1614" />
        <ellipse cx="111" cy="80" rx="2.8" ry="3.4" fill="#1f1614" />
        <circle cx="100" cy="67" r="2.3" fill="#c2335a" />
        ${FACE}
      </g>
    </svg>
  `,
  styles:
    FIGURE_STYLES +
    `
    .glow { animation: glow 1.2s ease-in-out infinite alternate; }
    @keyframes glow { from { opacity: 0.4; } to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) { .glow { animation: none; } }
  `,
})
export class Doctor {
  readonly mood = input<Mood>('smile');
  readonly arm = input<'examine' | 'point' | 'wave' | 'rest'>('rest');
}
