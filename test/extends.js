var extends_ = require('../lib/extends.js');
var test     = require('tape');

test('Operator instanceof semantics', function(t) {
  t.plan(10);

  function Parent() { }

  function Child() { }
  extends_(Child, Parent);

  function Sibling() { }
  extends_(Sibling, Parent);

  function GrandChild() { }
  extends_(GrandChild, Child);

  function Cousin() { }
  extends_(Cousin, Sibling);

  t.ok(new Parent() instanceof Parent, 'parent is parent');
  t.ok(new Child() instanceof Parent, 'child is parent');
  t.ok(new Child() instanceof Child, 'child is child');
  t.ok(new GrandChild() instanceof Parent, 'grandchild is parent');
  t.ok(new GrandChild() instanceof Child, 'grandchild is child');
  t.ok(new GrandChild() instanceof GrandChild, 'grandchild is grandchild');

  t.notOk(new Sibling() instanceof Child, 'child is not sibling');
  t.notOk(new Sibling() instanceof GrandChild, 'child is not granchild');
  t.notOk(new Cousin() instanceof GrandChild, 'cousin is not granchild');
  t.notOk(new Cousin() instanceof Child, 'cousin is not child');

});

test('Inherited member functions', function(t) {
  t.plan(3);

  function Parent() { }
  Parent.prototype.foo = function() { return 'parent'; };

  function Child() { }
  extends_(Child, Parent);
  Child.prototype.bar = function() { return 'child'; };

  function Sibling() { }
  extends_(Sibling, Parent);
  function GrandChild() { }
  extends_(GrandChild, Child);
  function Cousin() { }
  extends_(Cousin, Sibling);

  t.strictEqual(new Parent().foo(), 'parent', 'parent method on parent');
  t.strictEqual(new Child().foo(), 'parent', 'parent method on child');
  t.strictEqual(new GrandChild().foo(), 'parent', 'parent method on grandchild');


});
