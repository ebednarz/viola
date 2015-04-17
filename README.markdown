# viola [![npm version][npm-image]][npm-url]

> CasperJS wrapper for making functional and responsive web design regression testing easier.

## Status

You're Feeling Lucky

## Installation

    $ npm install casperjs phantomjs viola

## Example

### package.json

Assuming you have all your test files in ./suite and want a JUnit report file in ./report:

    {
      "previola": "npm install",
      "viola": "casperjs test ./suite --xunit=report/viola.xml"
    }

### CLI

    $ npm run viola

## Folkore

[Remember, remember...](http://www.viola.org/)

## License

MIT

[npm-image]: https://img.shields.io/npm/v/viola.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/viola
