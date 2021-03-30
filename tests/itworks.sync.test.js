import test from 'ava'
import {extractSync} from '../'
import _ from 'lodash'

const path = require('path')

const scss = (...args) => {
  return path.resolve(__dirname, 'scss', ...args)
}

let variables

test.before('Load variables.scss', () => {
  return variables = extractSync(scss('variables.scss'))
})

test('Returns an object', async t => {
  t.true(typeof variables === 'object')
})

test('Has the exact amount of exported variables', async t => {
  t.is(_.size(variables), 6, 'Must have 6 variables only')
})

test('Render single variables', async t => {
  t.is(variables.$single, 'yeah')
})

test('Render map objects', async t => {
  t.true(typeof variables.$color === 'object')
  t.is(_.size(variables.$color), 13)
})

test('Render colors', async t => {
  t.is(variables.$color.green, '#27bab4')
  t.is(variables.$color.orange, '#ffcc00')

  t.is(variables.$color['white-50opacity'], 'rgba(231, 231, 231, 0.5)')
})

test('Render numbers', async t => {
  t.is(variables.$theme['headbar-height'], '60px')
  t.is(variables.$theme['common-gap'], '15px')
})

test('Render strings', async t => {
  t.is(variables.$theme['table-body-checkbox-border'], 'none')
})

test('Render boolean values', async t => {
  t.is(variables.$useSass, true)
  t.is(variables.$theme['headbar-is-fixed'], false)
})

test('Render null values', async t => {
  t.is(variables.$nullVariable, null)
})

test('Render list values', async t => {
  t.is(variables.$theme['navbar-border'], '1px solid rgba(231, 231, 231, 0.5)')
})

test('Render map-get\'s', async t => {
  t.true(variables.$theme.primary !== undefined, 'Primary color seems not rendered')
  t.true(variables.$theme.primary === variables.$palette.primary)
})
