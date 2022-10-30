import { isCssLength } from './css.js'
import type { CSSLength } from './css.js'

const Widths = {
    'sm': 'var(--border-sm)',
    'md': 'var(--border-md)',
    'lg': 'var(--border-lg)'
}

export type BorderWidth = keyof typeof Widths | CSSLength | number

export function parseBorderWidth(width: BorderWidth): CSSLength {
    return typeof width === 'number' ? `${width}px`
        // @ts-ignore
        : width in Widths ? Widths[width]
        : isCssLength(width) ? width
        : '0px'
}
