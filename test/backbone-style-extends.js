var extends_ = require('../lib/extends.js');
var test     = require('tape');

test('Delegate to parent extends', function(t) {
  t.plan(3);

  function Parent()
  {

  }

  Parent.extend = function(hash) {
    t.pass('got em');
    t.strictEqual(hash.constructor, Child);
  }

  function Child()
  {

  }

  extends_(Child, Parent);

  t.strictEqual(Child.Super, Parent);

});
