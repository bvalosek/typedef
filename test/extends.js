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
