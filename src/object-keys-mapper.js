/**
 * Changes object keys maintaining the same values using 'read()' and 'write()' methods or creates new keys manipulating
 * object data.
 *
 * @param {Object} mask
 */
var ObjectKeysMapper = function(mask) {

    if (!mask) {
        throw new Error('Missing "mask" parameter');
    }

    if (mask &&
            (typeof mask !== 'object' ||
            (typeof mask === 'object' &&
            (!mask.write || !mask.read) ||
            (typeof mask.write !== 'object' || typeof mask.read !== 'object')))) {
        throw new Error('Wrong "mask" parameter');
    }

    /**
     * A map of keys as follows:
     * {
     *   read: {
     *     'bla': 'test',
     *     ...
     *   },
     *   write: {
     *     'test': 'hello',
     *     ...
     *   }
     * }
     *
     * @type {Object}
     * @private
     */
    var _mask = mask;

    /**
     * Returns an object that contains the keys of the "mask" {Object}
     * where the values are gathered from the "object" {Object}
     *
     * @param {Object} mask
     * @param {Object} object
     * @return {Object} data
     * @private
     */
    var _map = function(mask, object) {
        var data = {};
        for (var key in mask) {
            var value = mask[key];
            if (value) {
                switch (typeof value) {
                    case 'function':
                        data[key] = value(object);
                        break;
                    case 'string':
                        data[key] = object[value];
                        break;
                }
            }
        }
        return data;
    };

    /**
     * @type {number}
     */
    this.READ_ACTION = 1;

    /**
     * @type {number}
     */
    this.WRITE_ACTION = 2;

    /**
     * Returns the mask of the mapper.
     *
     * @return {Object}
     */
    this.getMask = function() {
        return _mask;
    };

    /**
     * Used to obtain the same keys of the referenced object from another one (that could have different keys).
     * The keys of the "write" mask define the keys of the referenced object.
     * The values associated to these keys define the key of the other object that are used to retrieve data.
     *
     * @param {Object} object
     * @return {Object}
     */
    this.write = function(object) {
        return _map(_mask.write, object);
    };

    /**
     * Used to obtain an object from the referenced object.
     * The keys of the "read" mask define the keys of the object to return.
     * The values associated to these keys define the key of the referenced object that are used to retrieve data.
     *
     * @param {Object} object
     * @return {Object}
     */
    this.read = function(object) {
        return _map(_mask.read, object);
    };

    /**
     * Performs the read/write methods on each object of an array.
     *
     * @param {Array} array Contains objects to use with selected action
     * @param {number} action Defines which action is applied to each array object.
     * @return {Array}
     */
    this.array = function(array, action) {
        var me = this;
        return array.map(function(object) {
            switch (action) {
                case me.WRITE_ACTION:
                    return me.write(object);
                case me.READ_ACTION:
                    return me.read(object);
            }
        });
    };
};
