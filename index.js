'use strict'

const sassExtract = require('sass-extract')
const _ = require('lodash')

class SassVarsToJSON {
  static parseTypeToValue (chunk) {
    switch (chunk.type) {
      case 'SassMap':
        return SassVarsToJSON.parseChunks(chunk.value)

      case 'SassList':
        return SassVarsToJSON.parseList(chunk)

      case 'SassColor':
        return SassVarsToJSON.parseColor(chunk.value)

      case 'SassString':
        return chunk.value

      case 'SassNumber':
        return chunk.value + chunk.unit

      case 'SassBoolean':
      case 'SassNull':
        return chunk.value
    }
  }

  static parseChunks (chunks) {
    return _.mapValues(chunks, (chunk, name) => {
      return SassVarsToJSON.parseTypeToValue(chunk)
    })
  }

  static parseColor (color) {
    if (color.a < 1) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }

    return color.hex
  }

  static parseList (list) {
    const values = list.value
    let parsedString = ''

    const separator = list.separator !== ' ' ? list.separator + ' ' : list.separator;

    values.forEach((value, index) => {
      parsedString += `${SassVarsToJSON.parseTypeToValue(value)}${index === values.length - 1 ? '' : separator}`
    })

    return parsedString
  }

  static extract (file) {
    return sassExtract.render({
      file
    })
      .then(({ vars: { global } }) => {
        return SassVarsToJSON.parseChunks(global)
      })
  }
}

module.exports = SassVarsToJSON.extract
