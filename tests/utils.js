/*
  Common utilities for all assignments
 */

const _ = require("underscore");
const Utils = {};

const REG_URL = /(\b(http|ftp|https|ftps):\/\/[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%?=~_|!:,.;]*[-A-ZáéíóúÁÉÍÓÚ0-9+&@#\/%=~_|])/ig;

Utils.getURL = (string) => {
    const urls = string.match(REG_URL);
    let url = null;
    if (urls instanceof Array) {
        url = urls[0];
    }
    return url;
};

Utils.exists = (thing) => {
    return !_.isUndefined(thing) && !_.isNull(thing);
};

Utils.isString = (thing) => {
    return _.isString(thing);
};

Utils.isObject = (thing) => {
    return _.isObject(thing);
};

Utils.isNumber = (thing) => {
    let number = false;
    if (Utils.exists(thing)) {
        number = typeof parseInt(thing) === "number";
    }
    return number
};

Utils.isArray = (thing) => {
    return _.isArray(thing);
};

Utils.isURL = (thing) => {
    if (Utils.isString(thing)) {
        return REG_URL.test(thing);
    }
};

Utils.isRegExp = (thing) => {
    return (thing instanceof RegExp);
};

Utils.isJSON = (thing) => {
    try {
        JSON.parse(thing);
        return true;
    } catch (e) {
        return false;
    }
};

Utils.search = (b, a) => {
    if (Utils.isRegExp(b)) {
        if (Utils.isString(a) && a.length > 0) {
            return b.test(a);
        } else {
            return false;
        }
    } else {
        if (Utils.isArray(a)) {
            let result = false;
            for (let item in a) {
                if (Utils.search(b, a[item])) {
                    result = true;
                }
            }
            return result;
        } else {
            if (Utils.isString(a.toString())) {
                return (a.toString().toLowerCase().indexOf(b.toLowerCase()) > -1);
            }
        }
    }
};

module.exports = Utils;