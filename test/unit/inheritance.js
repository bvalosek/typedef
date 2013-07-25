var typedef = require('../../lib/typedef');

QUnit.module('Inheritance');

test('Bad inheritance', function() {

    var Base = typedef.class('Base').define({
        f: function() {},
        __virtual__a__b__c__x: function() {},
        __virtual__g: function() {},
        __sealed__h: function() {},
        __virtual__z: function(x, y) {}
    });

    throws(function() {
        typedef.class('Child').extends(Base).define({
            f: function() {}
        });
    }, typedef.Exception, 'base doesnt have virtual');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __override__g: 123
        });
    }, typedef.Exception, 'overriden must be function');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __override__abc: function() {}
        });
    }, typedef.Exception, 'no base member with child override');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            g: function() {}
        });
    }, typedef.Exception, 'no override for base virtual');

    ok(function() {
        typedef.class('Child').extends(Base).define({
            __override__c__b__a__x: function() {}
        });
    }, 'out-of-order decorations ok');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __override__fluent__g: function() {}
        });
    }, typedef.Exception, 'incorrect decorations on overriden base virtual');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __sealed__override__h: function() {}
        });
    }, typedef.Exception, 'cannot override sealed member');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __new__h: function() {}
        });
    }, typedef.Exception, 'cannot override sealed member, even with new');

    throws(function() {
        typedef.class('Child').extends(Base).define({
            __override__z: function(x, _y) {}
        });
    }, typedef.Exception, 'override members must have same signature');

});
