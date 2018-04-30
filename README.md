# sass-vars-to-json

## Installation
``` bash
$ npm install sass-vars-to-json
```

## Usage
example.scss
``` scss
$toolbarHeight: 60px;
$palette: (
  white: #e7e7e7,
  orange: #fc0
);
$theme: (
  font: "Arial, sans-serif",
  head-background: map-get($palette, orange)
);
```
index.js
``` js
const sassVarsToJSON = require('sass-vars-to-json')
sassVarsToJSON('./example.scss')
  .then(vars => {
    console.log(vars.$toolbarHeight); // 60px
    console.log(vars.$palette.white); // #e7e7e7
    console.log(vars.$theme['head-background']); // #ffcc00
    console.log(vars.$theme.font); // Arial, sans-serif
  });
```

## License
MIT
