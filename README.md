# sass-vars-to-json
Converts sass variables into JSON objects.

## Installation
``` bash
$ npm install sass-vars-to-json
```

## Usage
example.scss
``` scss
$toolbarHeight: 60px;
$toolbarFont: "Roboto-Slab", "Times New Roman", serif;
$toolbarBoxShadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
$toolbarBgColor: rgba(#e7e7e7, .5);
$toolbarIsFixed: true;
$toolbarColor: null;
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
sassVarsToJSON('./example.scss'/*, compileOptions, extractOptions */)
  .then(vars => {
    console.log(vars.$toolbarHeight); // => '60px'
    console.log(vars.$toolbarFont); // => 'Roboto-Slab, Times New Roman, serif'
    console.log(vars.$toolbarBoxShadow); // => '10px 10px 5px 0px rgba(0, 0, 0, 0.75)'
    console.log(vars.$toolbarBgColor); // => 'rgba(231, 231, 231, 0.5)'
    console.log(vars.$toolbarIsFixed); // => true
    console.log(vars.$toolbarColor); // => null
    console.log(vars.$palette.white); // => '#e7e7e7'
    console.log(vars.$theme['head-background']); // => '#ffcc00'
    console.log(vars.$theme.font); // => 'Arial, sans-serif'
  });
```

## License
MIT
