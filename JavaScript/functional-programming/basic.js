var isObject = function isObject(obj) {
      return Object.prototype.toString.call(obj) === "[object Object]";
};

var isArray = Array.isArray || function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

/**
 * @param {Object|Array} obj can either be an object or array. Otherwise, throw error
 * @param {Function} fn the callback function passed.
 * */
function forEach(obj, fn) {
    var key;
    if (isArray(obj)) {
        for (key = 0; key < obj.length; key++) {
            fn(obj[key], key, obj);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(obj[key], key, obj);
            }
        }
    } else {
        throw new Error(obj + " is not of type Object or Array");
    }
}

/**
 * @param {Object|Array} obj can either be an object or array. Otherwise, throw error
 * @param {Function} fn the callback function passed.
 * @return {Array} fresh result after applying callback to each item
 */
function map(obj, fn) {
    var result = [];
    forEach(obj, function(val, key) {
        result.push(fn(val, key, obj));
    });
    return result;
}

/**
 * @param {Object|Array} obj can either be an object or array. Otherwise, throw error
 * @param {Function} predicate return true or truthy value to add item to result set.
 * @return {Array} fresh result after applying callback to each item
 */
function filter(obj, predicate) {
    var result = [];
    forEach(obj, function(val, key) {
        if (predicate(val, key, obj)) {
            result.push(val);
        }
    });
    return result;
}
