(function () {
  Array.prototype.where = function (predicate) {
    return this.filter(predicate);
  };

  Array.prototype.select = function (selector) {
    return this.map(selector);
  };

  Array.prototype.aggregate = function (accumulator, initialValue) {
    return this.reduce(accumulator, initialValue);
  };

  Array.prototype.sum = function (transform) {
    return transform
      ? this.select(transform).sum()
      : this.aggregate(function (ac, v) {
          return (ac = tools.calcNum(ac, +v));
        }, 0);
  };

  Array.prototype.average = function (transform) {
    return tools.calcNumDiv(this.sum(transform), this.count());
  };

  Array.prototype.count = function (predicate) {
    return predicate ? this.where(predicate).count() : this.length;
  };
})();

/**
 * Tool method
 */
const tools = {
  /**
   * Checks if the argument passed is an object
   */
  isObject(x) {
    return !!x && typeof x === 'object';
  },

  /**
   * Determine if two objects are equal
   */
  equal(a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (!this.isObject(a) || !this.isObject(b)) return a === b;

    const types = [a, b].map(x => x.constructor);
    if (types[0] !== types[1]) return false;

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.toString() === b.toString();
    }

    var entriesA = Object.entries(a);
    var entriesB = Object.entries(b);
    if (entriesA.length !== entriesB.length) return false;

    var Fn = (entries, _b) => entries.every(([key, val]) => (this.isObject(val) ? this.equal(_b[key], val) : _b[key] === val));

    return Fn(entriesA, b) && Fn(entriesB, a);
  },

  /**
   * Creates a function that negates the result of the predicate
   */
  negate(pred) {
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return !pred.apply(void 0, args);
    };
  },

  /**
   * Comparer helpers
   */
  composeComparers(previousComparer, currentComparer) {
    return function (a, b) {
      return previousComparer(a, b) || currentComparer(a, b);
    };
  },

  /**
   * Key comparer
   */
  keyComparer(_keySelector, descending) {
    // common comparer
    var _comparer = function (sortKeyA, sortKeyB) {
      if (sortKeyA > sortKeyB) {
        return !descending ? 1 : -1;
      } else if (sortKeyA < sortKeyB) {
        return !descending ? -1 : 1;
      } else {
        return 0;
      }
    };

    // string comparer
    var _stringComparer = function (sortKeyA, sortKeyB) {
      if (sortKeyA.localeCompare(sortKeyB) > 0) {
        return !descending ? 1 : -1;
      } else if (sortKeyB.localeCompare(sortKeyA) > 0) {
        return !descending ? -1 : 1;
      } else {
        return 0;
      }
    };

    return function (a, b) {
      var sortKeyA = _keySelector(a);
      var sortKeyB = _keySelector(b);

      if (tools.isString(sortKeyA) && tools.isString(sortKeyB)) {
        return _stringComparer(sortKeyA, sortKeyB);
      }
      return _comparer(sortKeyA, sortKeyB);
    };
  },

  /**
   * Number calculate addition
   */
  calcNum(num1, num2) {
    if (!this.isNum(num1) || !this.isNum(num2)) return 0;
    const { mult, place } = this.calcMultiple(num1, num2);
    return Number(((num1 * mult + num2 * mult) / mult).toFixed(place));
  },

  /**
   * Number calculate division
   * To be improved
   */
  calcNumDiv(num1, num2) {
    return num1 / num2;
  },

  /**
   * Check number
   */
  isNum(args) {
    return typeof args === 'number' && !isNaN(args);
  },

  /**
   * Check string
   */
  isString(args) {
    return typeof args === 'string' && args.constructor === String;
  },

  /**
   * Calculation multiple
   */
  calcMultiple(num1, num2) {
    const arrNum1 = num1.toString().split('.');
    const arrNum2 = num2.toString().split('.');
    const sq1 = arrNum1.length > 1 ? arrNum1[1].length : 0;
    const sq2 = arrNum2.length > 1 ? arrNum2[1].length : 0;
    const mult = Math.pow(10, Math.max(sq1, sq2));
    const place = sq1 >= sq2 ? sq1 : sq2;
    return { mult, place };
  },

  /**
   * Clone data
   */
  cloneDeep(obj) {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }

    let result;
    // Handle the 3 simple types, and null or undefined
    if (null === obj || 'object' !== typeof obj) {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      result = new Date();
      result.setTime(obj.getTime());
      return result;
    }
    // Handle RegExp
    if (obj instanceof RegExp) {
      result = obj;
      return result;
    }
    // Handle Array
    if (obj instanceof Array) {
      result = [];
      for (let i in obj) {
        result.push(this.cloneDeep(obj[i]));
      }
      return result;
    }

    // Handle Object
    if (obj instanceof Object) {
      result = {};
      for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
          result[i] = this.cloneDeep(obj[i]);
        }
      }
      return result;
    }
    throw new Error("Unable to copy param! Its type isn't supported.");
  }
};
