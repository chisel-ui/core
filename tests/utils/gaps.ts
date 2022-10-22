import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { parseGap } from '../../src/utils/gaps.js'

test('parseGap', () => {
  assert.type(parseGap, 'function', 'parseGap is a function')
  assert.is(parseGap(10), '10px', 'converts numbers to pixels')
  assert.is(parseGap('10vw'), '10vw', 'returns valid CSS lengths unchanged')
  assert.is(parseGap('10abc'), '0px', 'ignores invalid CSS length strings')
  assert.is(parseGap('6xs'), '0px', 'ignores unknown gap size variables')

  const cases: [string, string, string][] = [
    ['4xs', 'var(--gap-4xs)', '4xs gap variable'],
    ['3xs', 'var(--gap-3xs)', '3xs gap variable'],
    ['2xs', 'var(--gap-2xs)', '2xs gap variable'],
    ['xs', 'var(--gap-xs)', 'xs gap variable'],
    ['sm', 'var(--gap-sm)', 'sm gap variable'],
    ['md', 'var(--gap-md)', 'md gap variable'],
    ['lg', 'var(--gap-lg)', 'lg gap variable'],
    ['xl', 'var(--gap-xl)', 'xl gap variable'],
    ['2xl', 'var(--gap-2xl)', '2xl gap variable'],
    ['3xl', 'var(--gap-3xl)', '3xl gap variable'],
    ['4xl', 'var(--gap-4xl)', '4xl gap variable']
  ]

  for (const [value, expected, message] of cases) {
    assert.is(parseGap(value), expected, message)
  }
})

test.run()
