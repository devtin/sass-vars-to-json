import test from 'ava'
import sassVarsToJSON from '../'

const path = require('path')

const scss = (...args) => {
  return path.resolve(__dirname, 'scss', ...args)
}

let variables

test.before('Load variables.scss', () => {
  return sassVarsToJSON(scss('example.scss'))
    .then(r => {
      variables = r
    })
})

test('vars.$toolbarHeight', t => {
  t.is(variables.$toolbarHeight, '60px')
})

test('vars.$palette.white', t => {
  t.is(variables.$palette.white, '#e7e7e7')
})

test('vars.$theme.[\'head-background\']', t => {
  t.is(variables.$theme['head-background'], '#ffcc00')
})

test('vars.$theme.font', t => {
  t.is(variables.$theme.font, 'Arial, sans-serif')
})
