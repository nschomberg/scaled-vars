# scaled-vars

A Javascript library for mapping and applying CSS custom properties from a numerical range.

## Getting Started

### Installing

To install `scaled-vars`, run the following command in your terminal:

```bash
npm install --save scaled-vars
```

### Sample Usage

```js
// Import statement - ES5 Syntax.
var ScaledVars = require('scaled-vars');

// Import statement - ES6 Syntax.
import ScaledVars from 'scaled-vars';

// Initialize library with list of variable options.
var variables = new ScaledVars([
  {
    name: 'my-var',
    scale: ScaledVars.Scales
      .scaleLinear()
      .domain([0, 1000])
      .range([0, 10]),
  },
  {
    name: 'my-other-var',
    scale: ScaledVars.Scales
      .scaleLinear()
      .domain([0, 1000])
      .range([0, 10]),
    transform: (x) => (x + 2),
    unit: 'px',
    element: document.querySelector('.myclass'),
  },
]);

// Update variables and set them as CSS Custom Properties on the DOM
variables.update(300);
// 'my-var' => '3' (applied to Document's ":root" element)
// 'my-other-var' => '5px' (applied to specified element)
```

## Scripts

### Cutting a build

To cut a build, run:

```bash
npm run build
```

### Development

To start the dev server, run:

```bash
npm run dev
```

### Tests

To run unit tests, run:

```bash
npm test
```

## API

Coming soon.
