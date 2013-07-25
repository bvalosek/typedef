var _ = require('underscore');

module.exports = exports = core = {

    // Polymorphic get sig for classes, interfaces, mixins, or functions
    getSignature: function(Thing)
    {
        if (!Thing)
            return undefined;

        // function sig
        if (!core.isClass(Thing) && !core.isMixin(Thing) &&
            !core.isInterface(Thing) && _(Thing).isFunction())
                return util.getFunctionSignature(Thing);

        var signature = {};

        // Depth first, add all parents with their inherited from stuck to the
        // parent, then add our own signature.
        // Only add interfaces if we're getting the sig of an interface. We
        // don't want the signatures from the interfaces ending up in a real
        // signature
        _(Thing.__parents__).each(function(parent) {
            if (!core.isInterface(parent) || core.isInterface(Thing)) {
                var sig = core.getSignature(parent);
                _(sig).each(function(info, key) {

                    // dont add statics from parent
                    if (!info.decorations.STATIC)
                        signature[key] = {
                            value: info.value,
                            decorations: info.decorations,
                            inheritedFrom: parent
                        };
                });
            }
        });

        signature = _(signature).extend(Thing.__signature__);

        return signature;
    },

    // Traverse the tree to see if a class instance is type T
    is: function(Ctor, T)
    {
        if (!Ctor) return false;

        // Allow an instance of an object to be used
        Ctor = Ctor.__parents__ ? Ctor : Ctor.constructor;

        if (Ctor === T)
            return true;

        return !!_(Ctor.__parents__).find(function(parent) {
            return (parent === T || core.is(parent, T));
        });
    },

    isClass: function(C)
    {
        return C ? !!C.__class__ : false;
    },

    isMixin: function(m)
    {
        return m ? !!m.__mixin__ : false;
    },

    isInterface: function(I)
    {
        return I ? !!I.__interface__ : false;
    }

};
