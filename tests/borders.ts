import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { parseBorderWidth, BorderWidth } from '../src/borders.js'

const Borders = suite('borders')

console.log(parseBorderWidth('thin'))

Borders('CSS border variables', () => {
  assert.type(parseBorderWidth, 'function', 'parseBorderWidth is a function')
  assert.is(parseBorderWidth(10), '10px', 'converts numbers to pixels')
  assert.is(parseBorderWidth('10vw'), '10vw', 'returns valid CSS lengths unchanged')
  assert.is(parseBorderWidth('10abc' as any), '0px', 'ignores invalid CSS length strings')
  assert.is(parseBorderWidth('thicker' as any), '0px', 'ignores unknown border width variables')

  const cases: [BorderWidth, string, string][] = [
    'sm',
    'md',
    'lg',
  ].map(size => [size, `var(--border-${size})`, `border size "${size}"`])

  for (const [value, expected, message] of cases) {
    assert.is(parseBorderWidth(value), expected, message)
  }
})

Borders.run()
