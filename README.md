# rgba-to-datauri

[![Build Status](https://secure.travis-ci.org/claudiorodriguez/rgba-to-datauri.png)](http://travis-ci.org/claudiorodriguez/rgba-to-datauri)

Converts either a flat array of RGBA quadruplets (array of 4 integers) or a flattened Buffer ([r,g,b,a,r,g,b,a,...]) into a PNG base64 encoded datauri.

## TODO

* More error handling and input validation.
* Promisifying (right now `convert` is sync)

## Installation

### node.js

Install using [npm](http://npmjs.org/):

```bash
$ npm install rgba-to-datauri
```

## Examples

**Node.JS**

```javascript
import {convert} from 'rgba-to-datauri';

const array = [
  [0,0,0,255], [0,0,0,255],
  [0,0,0,255], [0,0,0,255]
];

const buf = new Buffer([0,0,0,255,0,0,0,255,0,0,0,255,0,0,0,255]);

// Should get a png base64 encoded datauri depicting a black 2px by 2px square
let uriFromArray = convert(array, 2, 2);
let uriFromBuffer = convert(buf, 2, 2);
```

## Testing

To run the tests:

```bash
$ npm install
$ npm test
```

## Contributing

If you wish to submit a pull request please update and/or create new tests for any changes you make and ensure the tests pass.

## License

MIT - see [LICENSE](https://github.com/claudiorodriguez/rgba-to-datauri/blob/master/LICENSE)
