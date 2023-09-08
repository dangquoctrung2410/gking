'use strict';
require('../../modules/es.object.to-string');
require('../../modules/es.promise');
require('../../modules/esnext.async-iterator.constructor');
require('../../modules/esnext.async-iterator.map');

var entryUnbind = require('../../internals/entry-unbind');

module.exports = entryUnbind('AsyncIterator', 'map');
