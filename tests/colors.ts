import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import * as colors from '../src/colors.js'

const Colors = suite('colors')

Colors('CSSColorNames', () => {
  assert.ok(
    Array.isArray(colors.validCSSColorNames),
    'validCSSColors should be an array'
  )
  assert.type(
    colors.isValidColorName,
    'function',
    'isValidColorName should be a function'
  )
  assert.ok(colors.isValidColorName('red'), '"red" is a valid color name')
  assert.not.ok(
    colors.isValidColorName('testing'),
    '"testing" is an invalid color name'
  )
})

Colors('hsl()', () => {
  assert.type(colors.isValidHSL, 'function', 'isValidHSL should be a function')

  const cases: [string, boolean, string][] = [
    ['hsl(0, 50%, 50%)', true, '"hsl(0, 50%, 50%)" is valid HSL'],
    ['hsl(0, 50%, 50%', false, 'parentheses are required'],
    ['hsl(0,50%,50%)', true, 'spaces are optional'],
    ['hsl(-1, 50%, 50%)', false, 'hue can\'t be negative'],
    ['hsl(361, 50%, 50%)', false, 'hue can\'t be greater than 360'],
    ['hsl(0, 100%, 50%)', true, 'saturation can be 100%'],
    ['hsl(0, 0%, 50%)', true, 'saturation can be 0%'],
    ['hsl(0, 101%, 50%)', false, 'saturation can\'t be greater than 100%'],
    ['hsl(0, -1%, 50%)', false, 'saturation can\'t be less than 0%'],
    ['hsl(0, 50%, 100%)', true, 'lightness can be 100%'],
    ['hsl(0, 50%, 0%)', true, 'lightness can be 0%'],
    ['hsl(0, 50%, 101%)', false, 'lightness can\'t be greater than 100%'],
    ['hsl(0, 50%, -1%)', false, 'lightness can\'t be less than 0%'],
  ]

  for (const [hsl, valid, message] of cases) {
    valid
      ? assert.ok(colors.isValidHSL(hsl), message)
      : assert.not.ok(colors.isValidHSL(hsl), message)
  }
})

Colors('hex', () => {
  assert.type(colors.isValidRGB, 'function', 'isValidRGB should be a function')

  const cases: [string, boolean, string][] = [
    ['#000000', true, 'hex (#000000)'],
    ['#000', true, 'hex shorthand (#000)'],
    ['#00000000', true, 'rgba hex (#00000000)'],
    ['#0000', false, 'invalid hex (#0000)'],
    ['#a0B2fd', true, 'mixed values (#a0B2fd)'],
    ['#g00000', false, 'invalid hex character (#g00000)'],
    ['rgb(0, 0, 0)', true, 'basic rgb()'],
    ['rgb(0,0,0)', true, 'spaces are optional'],
    ['rgb(0,0)', false, 'rgb() requires 3 values'],
    ['rgb(0,0,0,0)', false, 'rgb() requires 3 values'],
    ['rgba(0, 0, 0, 0)', true, 'basic rgba()'],
  ]

  for (const [hex, valid, message] of cases) {
    valid
      ? assert.ok(colors.isValidRGB(hex), message)
      : assert.not.ok(colors.isValidRGB(hex), message)
  }
})

Colors('rgb()', () => {
  const cases: [string, boolean, string][] = [
    ['rgb(0, 0, 0)', true, 'basic rgb()'],
    ['rgb(0,0,0)', true, 'spaces are optional'],
    ['rgb(0,0)', false, 'requires 3 values'],
    ['rgb(0,0,0,0)', false, 'requires 3 values'],
    ['rgb(-1, 0, 0)', false, 'values can\'t be negative'],
    ['rgb(0, 0, 256)', false, 'values can\'t be larger than 255'],
    ['rgb(a,b,c)', false, 'values must be numbers'],
  ]

  for (const [hex, valid, message] of cases) {
    valid
      ? assert.ok(colors.isValidRGB(hex), message)
      : assert.not.ok(colors.isValidRGB(hex), message)
  }
})

Colors('rgba()', () => {
  const cases: [string, boolean, string][] = [
    ['rgba(0, 0, 0, 1.0)', true, 'basic rgba()'],
    ['rgba(0,0,0,1.0)', true, 'spaces are optional'],
    ['rgba(0,0,0)', false, 'requires 4 values'],
    ['rgba(0,0,0,5)', false, 'requires 4 values'],
    ['rgba(255, 255, 255, 0.5)', true, 'alpha can be decimal'],
    ['rgba(255, 255, 255, 50%)', true, 'alpha can be a percentage'],
    ['rgba(255, 255, 255, -1)', false, 'alpha can\'t be less than 0'],
    ['rgba(255, 255, 255, -1%)', false, 'alpha can\'t be less than 0%'],
    ['rgba(255, 255, 255, 2)', false, 'alpha can\'t be greater than 1'],
    ['rgba(255, 255, 255, 101%)', false, 'alpha can\'t be greater than 100%'],
    ['rgba(-1, 0, 0, 1.0)', false, 'values can\'t be negative'],
    ['rgba(0, 0, 256, 1.0)', false, 'values can\'t be larger than 255'],
    ['rgba(a,b,c,d)', false, 'values must be numbers'],
  ]

  for (const [hex, valid, message] of cases) {
    valid
      ? assert.ok(colors.isValidRGB(hex), message)
      : assert.not.ok(colors.isValidRGB(hex), message)
  }
})

Colors.run()
