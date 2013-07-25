var typedef = require('../../lib/typedef');

QUnit.module('Global');

test('shows up in global', function() {

    var SomeClass = typedef.class('SomeClass').define();

    strictEqual(typedef.global.SomeClass, SomeClass, 'shows up');


});
