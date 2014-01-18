var test   = require('tape');
var mixin_ = require('../lib/mixin.js');

test('Another constructor as mixin', function(t) {
  t.plan(2);

  function C() { }
  function M() { }
  M.prototype.f = function() { }
  M.g = function() { }
  mixin_(C, M);

  t.strictEqual(new C().f, M.prototype.f, 'member func');
  t.strictEqual(C.g, M.g, 'static func');

});

test('A hash as a mixin', function(t) {
  t.plan(1);

  function C() { }
  var m = {
    f: function() { }
  };

  mixin_(C, m);

  t.strictEqual(new C().f, m.f, 'function on hash ends up there');

});


