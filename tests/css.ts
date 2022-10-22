import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as css from '../src/css.js'

const CSS = suite('css')

CSS('isCssLength', () => {
  const cases = [
    'vmin',
    'vmax',
    'vh',
    'vw',
    '%',
    'ch',
    'ex',
    'em',
    'rem',
    'in',
    'cm',
    'mm',
    'pt',
    'pc',
    'px',
  ]
    .map(unit => [
      [`0${unit}`, true, `(${unit}) 0 allowed`],
      [`-1${unit}`, false, `(${unit}) negatives not allowed`],
    ])
    .flat() as [string, boolean, string][]

  for (const [value, valid, message] of cases) {
    valid
      ? assert.ok(css.isCssLength(value), message)
      : assert.not.ok(css.isCssLength(value), message)
  }
})

CSS('parseCssLength', () => {
  const cases: [string | number, string | undefined, string][] = [
    ['100px', '100px', 'positive string length'],
    ['-1px', undefined, 'invalid string length'],
    [100, '100px', 'positive integer'],
    [-1, undefined, 'negative integers ignored'],
  ]

  for (const [value, expected, message] of cases) {
    assert.is(css.parseCssLength(value), expected, message)
  }
})

CSS.run()
