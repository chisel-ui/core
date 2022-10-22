import { test } from 'uvu'
import * as assert from 'uvu/assert'
import uid from '../../src/utils/uid.js'

test('helloWorld', () => {
  assert.type(uid, 'function')
  assert.is(uid(), 'chisel-1')
  assert.is(uid(), 'chisel-2')
})

test.run()
