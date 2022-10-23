import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { joinStyles } from '../src/styles.js'

test('joinStyles', () => {
  assert.type(joinStyles, 'function', 'joinStyles is a function')
  assert.is(joinStyles(), undefined, 'undefined when no styles provided')
  assert.is(joinStyles('color: red'), 'color: red', 'single style unchanged')
  assert.is(
    joinStyles('color: red', 'background: blue'),
    'color: red;background: blue',
    'joins two styles'
  )
  assert.is(
    joinStyles('color: red;background: blue;', 'font-size: 16px'),
    'color: red;background: blue;font-size: 16px',
    'handles compound styles'
  )
  assert.is(
    joinStyles(
      'color: red; background: blue',
      'font-size: 16px;',
      'line-height: 1.5; font-weight: bold'
    ),
    'color: red;background: blue;font-size: 16px;line-height: 1.5;font-weight: bold',
    'three complex styles'
  )
})
