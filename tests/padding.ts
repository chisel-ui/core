import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as padding from '../src/padding.js'

const Padding = suite('padding')

Padding('CSS gap variables', () => {
  const cases: [padding.Padding, string, string][] = [
    '4xs',
    '3xs',
    '2xs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
  ].map(size => [size, `padding: var(--gap-${size});`, `gap size "${size}"`])

  for (const [value, expected, message] of cases) {
    assert.is(padding.getPaddingStyles(value), expected, message)
  }

  assert.throws(
    () => padding.getPaddingStyles('5xs' as padding.Padding),
    'Invalid padding type - "5xs"',
    'throws for unknown CSS gap variables'
  )
})

Padding('CSS gap arrays', () => {
  const cases: [padding.Padding, string, string][] = [
    [['xs'], 'padding: var(--gap-xs);', 'Array with one gap length'],
    [
      ['xs', 'lg'],
      'padding-inline: var(--gap-lg);padding-block: var(--gap-xs);',
      'Array with two gap lengths',
    ],
    [
      ['xs', 'lg', 'md'],
      'padding-block-start: var(--gap-xs);padding-inline: var(--gap-lg);padding-block-end: var(--gap-md);',
      'Array with three gap lengths',
    ],
    [
      ['xs', 'lg', 'md', 'xl'],
      'padding-block-start: var(--gap-xs);padding-inline-end: var(--gap-lg);padding-block-end: var(--gap-md);padding-inline-start: var(--gap-xl);',
      'Array with four gap lengths',
    ],
    [[10], 'padding: 10px;', 'Supports positive numbers'],
  ]

  for (const [value, expected, message] of cases) {
    assert.is(padding.getPaddingStyles(value), expected, message)
  }
})

Padding('CSS gap objects', () => {
  const cases: [padding.Padding, string, string][] = [
    [
      { left: 'sm' },
      'padding-inline-start: var(--gap-sm);',
      'only defines "left"',
    ],
    [
      { left: 'sm', right: 'lg' },
      'padding-inline-start: var(--gap-sm); padding-inline-end: var(--gap-lg);',
      'defining multiple sides',
    ],
    [
      { left: 10, top: 20 },
      'padding-inline-start: 10px; padding-block-start: 20px;',
      'defining dimensions with integers',
    ],
    [
      { blockEnd: 'lg', inlineStart: 'sm' },
      'padding-block-end: var(--gap-lg); padding-inline-start: var(--gap-sm);',
      'defining with logical dimensions',
    ],
    [
      { blockEnd: 10, inlineStart: 'sm' },
      'padding-block-end: 10px; padding-inline-start: var(--gap-sm);',
      'mixing variables and numbers',
    ],
  ]

  for (const [value, expected, message] of cases) {
    assert.is(padding.getPaddingStyles(value), expected, message)
  }
})

Padding.run()
