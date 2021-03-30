const {extract, extractSync} = require('sass-vars-to-json')
extract('./example.scss')
  .then(vars => {
    console.log(vars.$toolbarHeight) // 60px
    console.log(vars.$palette.white) // #e7e7e7
    console.log(vars.$theme['head-background']) // #ffcc00
    console.log(vars.$theme.font) // Arial, sans-serif
  })

const vars = extractSync('./example.scss')

console.log(vars.$toolbarHeight) // 60px
console.log(vars.$palette.white) // #e7e7e7
console.log(vars.$theme['head-background']) // #ffcc00
console.log(vars.$theme.font) // Arial, sans-serif
