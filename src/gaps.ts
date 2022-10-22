import { isCssLength } from './css.js'
import type { CSSLength } from './css.js'

export const Gaps = {
  '4xs': 'var(--gap-4xs)',
  '3xs': 'var(--gap-3xs)',
  '2xs': 'var(--gap-2xs)',
  xs: 'var(--gap-xs)',
  sm: 'var(--gap-sm)',
  md: 'var(--gap-md)',
  lg: 'var(--gap-lg)',
  xl: 'var(--gap-xl)',
  '2xl': 'var(--gap-2xl)',
  '3xl': 'var(--gap-3xl)',
  '4xl': 'var(--gap-4xl)',
}

export type GapSize = keyof typeof Gaps

export type Gap = GapSize | CSSLength | number

export function parseGap(gap: Gap | unknown): CSSLength | undefined {
  if (typeof gap === 'number') return `${gap}px`

  if (typeof gap === 'string') {
    return gap in Gaps
      ? (Gaps[gap as GapSize] as CSSLength)
      : isCssLength(gap)
        ? gap
        : '0px'
  }

  return '0px'
}
