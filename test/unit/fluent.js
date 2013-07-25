var typedef = require('../../lib/typedef');

QUnit.module('Fluent decoration');

test('Throw on non fluents', function() {

    throws(function() {
        typedef.class('Child').define({
            __fluent__f: function() {}
        });
    }, typedef.Exception, 'throw when no return');

    throws(function() {
        typedef.class('Child').define({
            __fluent__f: function() {
                return 42;
            }
        });
    }, typedef.Exception, 'throw when not returning this');

    throws(function() {
        typedef.class('Child').define({
            __fluent__f: function() {
                if (3 + 5 > 10)
                    return 42;
                else
                    return this;
            }
        });
    }, typedef.Exception, 'throw when not all return this');

    throws(function() {
        typedef.class('Child').define({
            __fluent__f: 1234
        });
    }, typedef.Exception, 'throw when fluent isnt a function');

    ok(function() {
        typedef.class('Child').define({
            __fluent__f: function() { return this; }
        });
    }, 'good fluent');

});

