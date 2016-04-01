var api = require('../'),
  internal = api.internal,
  utils = api.utils,
  assert = require('assert');

describe('mapshaper-utils.js', function () {
  describe('extendBuffer()', function () {
    it('extends a Float64 buffer', function () {
      var src = new Float64Array([1, 2, 3]);
      var ext = utils.extendBuffer(src, 4);
      assert.equal(ext.constructor, Float64Array);
      assert.deepEqual(Array.prototype.slice.call(ext), [1, 2, 3, 0]);
    })
    it('extends a Uint8 buffer', function () {
      var src = new Uint8Array([1, 2, 3]);
      var ext = utils.extendBuffer(src, 4);
      assert.equal(ext.constructor, Uint8Array);
    })
    it('third argument gives elements to copy', function () {
      var src = new Float64Array([1, 2, 3]);
      var ext = utils.extendBuffer(src, 4, 2);
      assert.deepEqual(Array.prototype.slice.call(ext), [1, 2, 0, 0]);
    })
    it('handles illogical params', function () {
      var src = new Float64Array([1, 2, 3]);
      var ext = utils.extendBuffer(src, 2, 4);
      assert.deepEqual(Array.prototype.slice.call(ext), [1, 2, 3]);
    })
  })

  describe('isFiniteNumber()', function () {
    it('positive tests', function () {
      assert(utils.isFiniteNumber(1));
      assert(utils.isFiniteNumber(0));
      assert(utils.isFiniteNumber(-1));
      assert(utils.isFiniteNumber(-1e12));
      assert(utils.isFiniteNumber(1e12));
      assert(utils.isFiniteNumber(1e-34));
    })
    it('negative tests', function () {
      assert.equal(utils.isFiniteNumber('a'), false);
      assert.equal(utils.isFiniteNumber(Infinity), false);
      assert.equal(utils.isFiniteNumber(-Infinity), false);
      assert.equal(utils.isFiniteNumber(null), false);
      assert.equal(utils.isFiniteNumber(undefined), false);
      assert.equal(utils.isFiniteNumber(), false);
      assert.equal(utils.isFiniteNumber(NaN), false);
      assert.equal(utils.isFiniteNumber({}), false);
      // builtin isFinite() evaluates the following to true
      assert.equal(utils.isFiniteNumber([]), false);
      assert.equal(utils.isFiniteNumber(new Date()), false);
      assert.equal(utils.isFiniteNumber('1'), false);
      assert.equal(utils.isFiniteNumber(''), false);
      assert.equal(utils.isFiniteNumber(true), false);
      assert.equal(utils.isFiniteNumber(false), false);
    })
  })

  describe('wildcardToRxp()', function () {
    var ex1 = "layer1"
    it(ex1, function () {
      assert.equal(utils.wildcardToRegExp(ex1).source, 'layer1');
    })

    var ex2 = "layer*";
    it(ex2, function() {
      assert.equal(utils.wildcardToRegExp(ex2).source, 'layer.*');
    })
  })

})