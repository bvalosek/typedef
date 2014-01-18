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
  t.plan(6);

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
  t.strictEqual(new Child().bar(), 'child', 'child method on child');
  t.strictEqual(new GrandChild().bar(), 'child', 'child method on grandchild');

  t.notOk(new Parent().bar, 'child method doesnt appear on parent');

});

test('Inherited static functions', function(t) {
  t.plan(6);

  function Parent() { }
  Parent.foo = function() { return 'parent'; };

  function Child() { }
  extends_(Child, Parent);
  Child.bar = function() { return 'child'; };

  function Sibling() { }
  extends_(Sibling, Parent);
  function GrandChild() { }
  extends_(GrandChild, Child);
  function Cousin() { }
  extends_(Cousin, Sibling);

  t.strictEqual(Parent.foo(), 'parent', 'parent static method on parent');
  t.strictEqual(Child.foo(), 'parent', 'parent static method on child');
  t.strictEqual(GrandChild.foo(), 'parent', 'parent static method on grandchild');
  t.strictEqual(Child.bar(), 'child', 'child static method on child');
  t.strictEqual(GrandChild.bar(), 'child', 'child static method on grandchild');

  t.notOk(Parent.bar, 'child static method doesnt appear on parent');
});

test('Constructor property', function(t) {
  t.plan(2);

  function Parent() { }
  function Child () { }
  extends_(Child, Parent);

  t.strictEqual(new Parent().constructor, Parent, 'base class ctor');
  t.strictEqual(new Child().constructor, Child, 'child class ctor');

});

test('Static Super member property', function(t) {
  t.plan(3);

  function Parent() { }
  function Child () { }
  extends_(Child, Parent);
  function GrandChild () { }
  extends_(GrandChild, Child);

  t.strictEqual(Parent.Super, undefined, 'no super on parent');
  t.strictEqual(Child.Super, Parent, 'child points back to parent');
  t.strictEqual(GrandChild.Super, Child, 'grandchild points to child');

});

test('Static member overriden by child', function(t) {
  t.plan(2);

  var A = 'A';
  var B = 'B';

  function Parent() { }
  Parent.foo = A;

  // Trivial case of extends being called first
  function Child() { }
  extends_(Child, Parent);
  Child.foo = B;
  t.strictEqual(Child.foo, B, 'Child foo');

  // Using extends aftewards should skip over any statics already on child
  function Child2() { }
  Child2.foo = B;
  extends_(Child2, Parent);
  t.strictEqual(Child2.foo, B, 'Child2 foo');

});
