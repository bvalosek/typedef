// ----------------------------------------------------------------------------
// typedef.js
//
// Familiar Classes, Mixins, and Interfaces in ES5 Javascript.
//
// Member decorations for powerful objects that keep your code DRY.
//
// (c) 2013 Brandon Valosek
//
// https://github.com/bvalosek/typdef.js
//
// ----------------------------------------------------------------------------

var _          = require('underscore');
var util       = require('./util');
var validation = require('./validation');
var core       = require('./core');

// ------------------------------------------------------------------------
// Class creation

// The big one. Define a class given the (internal) name, if it is derived
// from any Parent class, the mixins we want to include, and the
// (decorated) hash of its properties
var defineClass = function(name, Parent, mixins, interfaces, hash)
{
    var Child;

    // Determine what should be the constructor
    var ctor = hash ? hash.__constructor__ : undefined;
    if (!Parent) {
        Child = function() {};
    } else if (ctor) {
        Child = function() {
            Parent.apply(this, _(arguments).toArray());
            ctor.apply(this, _(arguments).toArray());
        };
    } else {
        Child = function() {
            Parent.apply(this, _(arguments).toArray());
        };
    }

    // setup prototype chain for normal inheritance with create and setting
    // constructor correctly
    Child.prototype = Object.create(Parent ? Parent.prototype : Object.prototype);
    util.defHidden(Child.prototype, { constructor: Child });

    // Create all meta data and signature info
    var parents = Parent ? [Parent] : [];
    defineThing(name, Child, parents.concat(mixins).concat(interfaces), hash);

    // Actually setup members on prototype
    _(Child.__signature__).each(function(info, key) {
        var target = info.decorations.STATIC ? Child : Child.prototype;
        attachClassMember(target, key, info);
    });

    // add in mixins to the prozotit
    mixins.filter(core.isMixin).forEach(function(mixin) {
        var sig = core.getSignature(mixin);
        _(sig).each(function(info, key) {
            attachMixinMember(Child.prototype, key, info);
        });
    });

    // Check for any __ondefine__ from the parents. This gives a class, at
    // define time, access to the Child we've just created as well the raw hash
    var onDefine = function(C) {
        _(C.__parents__).each(onDefine);

        if (C.__ondefine__)
            C.__ondefine__(Child, hash);
    };
    onDefine(Child);

    util.defHidden(Child, {__class__: true });

    // Check stuff
    _(Child.__parents__).each(function(p) {
        if (core.isInterface(p))
            validation.checkInterface(Child, p);
    });

    validation.checkInheritance(Child);
    validation.checkMisc(Child);

    return Child;
};

// Ensure that we do all appropriate transofmraitons whilst attaching
// something to a class prototype (or even constructor direclty e.g.
// STATIC)
var attachClassMember = function(target, key, info)
{
    var val = info.value;

    var hidden = !!info.decorations.HIDDEN;

    if (info.decorations.PROPERTY) {
        Object.defineProperty(target, key, {
            configurable: true, enumerable: !hidden,
            get: info.value.get, set: info.value.set
        });
    } else {
        var readonly = _(val).isFunction() || info.decorations.READONLY;
        Object.defineProperty(target, key, {
            writable: !readonly, enumerable: !hidden,
            value: val, configurable: true
        });
    }
};

// Properly add/mutate a class with mixin parts
var attachMixinMember = function(target, key, info)
{
    var wrappedFn  = info.value;
    var originalFn = target[key];
    var fn         = info.value;

    if (info.decorations.WRAPPED) {
        wrappedFn = function() {
            return fn.call(this, originalFn, _(arguments).toArray());
        };
    } else if (info.decorations.BEFORE) {
        wrappedFn = function() {
            fn.apply(this, arguments);
            return originalFn.apply(this, arguments);
        };
    } else if (info.decorations.AFTER) {
        wrappedFn = function() {
            var o = originalFn.apply(this, arguments);
            var r = fn.apply(this, arguments);
            return r !== undefined ? r : o;
        };
    }

    attachClassMember(target, key, {
        value: wrappedFn,
        decorations: info.decorations,
        inheritedFrom: info.inheritedFrom
    });
};

// ------------------------------------------------------------------------
// Interface creation

var defineInterface = function(name, interfaces, hash)
{
    var iface = defineThing(name, {}, interfaces, hash);
    util.defHidden(iface, {__interface__: true});
    return iface;
};

// ------------------------------------------------------------------------
// Mixin creation

var defineMixin = function(name, mixins, interfaces, hash)
{
    var mixin = defineThing(name, {}, mixins.concat(interfaces), hash);
    util.defHidden(mixin, {__mixin__: true});
    return mixin;
};

// ------------------------------------------------------------------------
// General inheritance tree creation

var defineThing = function(name, thing, parents, hash)
{
    thing         = thing || {};
    var signature = {};

    // Iterate over everything in the hash and actually add it
    _(util.processDecorations(hash)).each(function(info, key) {
        signature[key] = {
            value         : info.value,
            decorations   : info.decorations,
            inheritedFrom : thing
        };
    });

    // Add in meta
    util.defHidden(thing, {
        __name__      : name,
        __parents__   : parents,
        __signature__ : signature,
        __ondefine__  : hash ? hash.__ondefine__ : undefined
    });

    return thing;
};

// ------------------------------------------------------------------------
// Base object

var BaseObject = defineClass('Object', null, [], [], {
    __hidden__override__toString: function()
    {
        return '[object ' + this.constructor.__name__ + ']';
    }
});

// ------------------------------------------------------------------------
// The fluent base for everything

var Thing = defineClass('Thing', BaseObject, [], [], {

    __constructor__: function(name)
    {
        this.name       = name;
        this.Parent     = BaseObject;
        this.mixins     = [];
        this.interfaces = [];
    },

    __fluent__extends: function(Parent)
    {
        this.Parent = Parent;
        return this;
    },

    __fluent__uses: function(mixins)
    {
        this.mixins = _(arguments).toArray();
        return this;
    },

    __fluent__implements: function(mixins)
    {
        this.interfaces = _(arguments).toArray();
        return this;
    },

    __abstract__define: function(hash) {}

});

// ------------------------------------------------------------------------
// The fluent base for a class

var Class = defineClass('ClassFactory', Thing, [], [], {

    __override__define: function(hash)
    {
        return defineClass(
            this.name, this.Parent, this.mixins, this.interfaces, hash);
    }

});

// ------------------------------------------------------------------------
// The fluent base for an interface

var Interface = new Class('InterfaceFactory').extends(Thing).define({

    __override__define: function(hash)
    {
        return defineInterface(this.name, this.interfaces, hash);
    }

});

// ------------------------------------------------------------------------
// The fluent base for a mixin

var Mixin = new Class('MixinFactory').extends(Thing).define({

    __override__define: function(hash)
    {
        return defineMixin(this.name, this.mixins, this.interfaces, hash);
    }

});

// ------------------------------------------------------------------------
// API

module.exports = typedef = {

    class                : function(name) { return new Class(name); },
    mixin                : function(name) { return new Mixin(name); },
    interface            : function(name) { return new Interface(name); },
    is                   : core.is,
    signature            : core.getSignature,

    Exception            : require('./exception'),
    BaseObject           : BaseObject,

    isClass              : core.isClass,
    isMixin              : core.isMixin,
    isInterface          : core.isInterface

};
