'use strict'

const sassExtract = require('sass-extract')
const _ = require('lodash')

class SassVarsToJSON {
  static parseTypeToValue (chunk) {
    switch (chunk.type) {
      case 'SassMap':
        return SassVarsToJSON.parseChunks(chunk.value)

      case 'SassColor':
        return chunk.value.hex

      case 'SassString':
        return chunk.value

      case 'SassNumber':
        return chunk.value + chunk.unit
    }
  }

  static parseChunks (chunks) {
    return _.mapValues(chunks, (chunk, name) => {
      return SassVarsToJSON.parseTypeToValue(chunk)
    })
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
