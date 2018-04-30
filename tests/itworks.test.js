import test from 'ava'
import sassVarsToJSON from '../'
import _ from 'lodash'

const path = require('path')

const scss = (...args) => {
  return path.resolve(__dirname, 'scss', ...args)
}

let variables

test.before('Load variables.scss', () => {
  return sassVarsToJSON(scss('variables.scss'))
    .then(r => {
      variables = r
    })
})

test('Returns an object', async t => {
  t.true(typeof variables === 'object')
})

test('Has the exact amount of exported variables', async t => {
  t.is(_.size(variables), 4, 'Must have 4 variables only')
})

test('Render single variables', async t => {
  t.is(variables.$single, 'yeah')
})

test('Render map objects', async t => {
  t.true(typeof variables.$color === 'object')
  t.is(_.size(variables.$color), 12)
})

test('Render colors', async t => {
  t.is(variables.$color.green, '#27bab4')
  t.is(variables.$color.orange, '#ffcc00')
})

test('Render numbers', async t => {
  t.is(variables.$theme['headbar-height'], '60px')
  t.is(variables.$theme['common-gap'], '15px')
})

test('Render strings', async t => {
  t.is(variables.$theme['table-body-checkbox-border'], 'none')
})

test('Render map-get\'s', async t => {
  t.true(variables.$theme.primary !== undefined, 'Primary color seems not rendered')
  t.true(variables.$theme.primary === variables.$palette.primary)
})
