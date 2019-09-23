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

test('vars.$toolbarFont', t => {
  t.is(variables.$toolbarFont, 'Roboto-Slab, Times New Roman, serif')
})

test('vars.$toolbarBoxShadow', t => {
  t.is(variables.$toolbarBoxShadow, '10px 10px 5px 0px rgba(0, 0, 0, 0.75)')
})

test('vars.$toolbarBgColor', t => {
  t.is(variables.$toolbarBgColor, 'rgba(231, 231, 231, 0.5)')
})

test('vars.$toolbarIsFixed', t => {
  t.is(variables.$toolbarIsFixed, true)
})

test('vars.$toolbarColor', t => {
  t.is(variables.$toolbarColor, null)
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
