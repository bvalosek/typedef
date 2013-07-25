var typedef = require('../../lib/typedef');

QUnit.module('__ondefine__ usage');

test('Basic', function() {

    var def = null;

    var C = typedef.class('C').define({
        __ondefine__: function()
        {
            def = true;
        },
    });

    strictEqual(def, true, '__ondefine__ called');

});

test('Nested', function() {

    var buf = '';

    // c
    var C = typedef.class('C').define({
        __ondefine__: function()
        {
            buf += 'c';
        },
    });

    // cc
    var D = typedef.class('D').extends(C).define();

    // cce
    var E = typedef.class('E').extends(D).define({
        __ondefine__: function()
        {
            buf += 'e';
        },
    });

    strictEqual(buf, 'ccce', '__ondefine__');

});

test('Mixins', 1, function() {

    var M = typedef.mixin('M').define({
        __ondefine__: function() { ok(true, 'mixin ondefine fired'); }
    });

    var C = typedef.class('C').uses(M).define();
});
