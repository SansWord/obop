/*! common.js */

var assert = require('chai').assert;
var obop = require('../');
var common = exports;

exports.check_where = function(sample, where, func, mess) {
  mess = mess || JSON.stringify(where);
  it(mess, function(done) {
    common.obop_where(sample, where, func, function(actual) {
      common.expect_where(sample, where, func, function(expect) {
        assert.deepEqual(actual, expect);
        done();
      });
    });
  });
};

exports.obop_where = function(sample, where, func, next) {
  sample = common.clone(sample);
  var result = sample;
  var selector = obop.where(where);
  assert.notOk(selector instanceof Error, 'where() should not return an error: ' + selector);
  if (selector) {
    assert.equal(typeof selector, 'function', 'selector should be a function');
    result = sample.filter(selector);
  }
  assert.ok(result instanceof Array, 'obop result should be an array');
  next(result);
};

exports.expect_where = function(sample, where, func, next) {
  sample = common.clone(sample);
  var result = sample;
  if (func) {
    assert.equal(typeof func, 'function', 'expecter should be a function');
    result = sample.filter(func);
  }
  assert.ok(result instanceof Array, 'expecter result should be an array');
  next(result);
};

exports.check_view = function(sample, view, func, mess) {
  mess = mess || JSON.stringify(view);
  it(mess, function(done) {
    common.obop_view(sample, view, func, function(actual) {
      common.expect_view(sample, view, func, function(expect) {
        assert.deepEqual(actual, expect);
        done();
      });
    });
  });
};

exports.obop_view = function(sample, view, func, next) {
  sample = common.clone(sample);
  var result = sample;
  var projectoin = obop.view(view);
  assert.notOk(projectoin instanceof Error, 'view() should not return an error: ' + projectoin);
  if (projectoin) {
    assert.equal(typeof projectoin, 'function', 'projectoin should be a function');
    result = sample.map(projectoin);
  }
  assert.ok(result instanceof Array, 'obop result should be an array');
  next(result);
};

exports.expect_view = function(sample, view, func, next) {
  sample = common.clone(sample);
  var result = sample;
  if (func) {
    assert.equal(typeof func, 'function', 'expecter should be a function');
    result = sample.map(func);
  }
  assert.ok(result instanceof Array, 'expecter result should be an array');
  next(result);
};

exports.clone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};