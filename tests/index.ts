import { test } from 'uvu'
import * as assert from 'uvu/assert'
import helloWorld from '../src/index.js'

test('helloWorld', () => {
  assert.type(helloWorld, 'function')
  assert.is(helloWorld(), 'Hello, world!')
  assert.is(helloWorld('Test'), 'Hello, Test!')
})

test.run()
