# Typed aerospike-client-nodejs [![Build Status](https://travis-ci.org/typed-contrib/aerospike-client-nodejs.svg?branch=master)](https://travis-ci.org/typed-contrib/aerospike-client-nodejs)

Type definitions for [aerospike-client-nodejs](https://github.com/Azure/aerospike-client-nodejs).

## Installation

Installation can be done using [typings](https://github.com/typings/typings).

From the registry:
```bash
$ typings install aerospike --save
```

From the source:
```bash
$ typings install github:typed-contrib/aerospike-client-nodejs --save
```

`aerospike` module works in `node.js` environment.
So you also have to install `node.js` typings.

```bash
$ typings install env~node --global --save
```

## Contributing

Contributions are welcome !

```bash
# Installation
# Fork this repo (https://github.com/typed-contrib/aerospike-client-nodejs)
# Clone the fork (E.g. `https://github.com/<your_username>/aerospike-client-nodejs.git`)
cd aerospike-client-nodejs

# Install modules and dependencies
npm install

# Test typings over aerospike-client-nodejs samples and tests
npm test
```

Some resources to help writing Typescript type definitions:
 * [Writing Declaration Files](http://www.typescriptlang.org/docs/handbook/writing-declaration-files.html)
 * [typings examples](https://github.com/typings/typings/blob/master/docs/examples.md)

## Tests

This type definitions are tested using source `aerospike-client-nodejs` `examples`.
 * [Samples](https://github.com/aerospike/aerospike-client-nodejs/tree/master/examples)

## License

MIT

