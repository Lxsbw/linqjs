(function () {
  var Linq = {};

  /**
   * Adds an object to the end of the List<T>.
   */
  Linq.add = function (element) {
    this.push(element);
  };

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  Linq.addRange = function (elements) {
    var _a;
    (_a = this).push.apply(_a, elements);
  };

  /**
   * Applies an accumulator function over a sequence.
   */
  Linq.aggregate = function (accumulator, initialValue) {
    return this.reduce(accumulator, initialValue);
  };

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  Linq.all = function (predicate) {
    return this.every(predicate);
  };

  /**
   * Determines whether a sequence contains any elements.
   */
  Linq.any = function (predicate) {
    return predicate ? this.some(predicate) : this.length > 0;
  };

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Linq.average = function (transform) {
    return tools.calcNumDiv(this.sum(transform), this.count());
  };

  /**
   * Returns the number of elements in a sequence.
   */
  Linq.count = function (predicate) {
    return predicate ? this.where(predicate).count() : this.length;
  };

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  Linq.distinct = function () {
    return this.where(function (value, index, iter) {
      return (
        (tools.isObject(value)
          ? iter.findIndex(function (obj) {
              return tools.equal(obj, value);
            })
          : iter.indexOf(value)) === index
      );
    });
  };

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  Linq.distinctBy = function (keySelector) {
    var groups = this.groupBy(keySelector);

    const func = function (res, key) {
      const curr = groups.firstOrDefault(x => tools.equal(x.key, key));
      res.add(curr.elements[0]);
      return res;
    };

    return groups.select(x => x.key).reduce(func, []);
  };

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values and this.select method.
   */
  Linq.distinctMap = function (predicate) {
    return predicate ? this.select(predicate).distinct() : this.distinct();
  };

  /**
   * Returns the element at a specified index in a sequence.
   */
  Linq.elementAt = function (index) {
    if (index < this.count() && index >= 0) {
      return this[index];
    } else {
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
    }
  };

  /**
   * Returns the first element of a sequence.
   */
  Linq.first = function (predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).first() : this[0];
    } else {
      throw new Error('InvalidOperationException: The source sequence is empty.');
    }
  };

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  Linq.firstOrDefault = function (predicate) {
    return this.count(predicate) ? this.first(predicate) : undefined;
  };

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  Linq.groupBy = function (grouper, mapper) {
    if (mapper === void 0) {
      mapper = function (val) {
        return val;
      };
    }
    var initialValue = [];

    const func = function (ac, v) {
      var key = grouper(v);
      var existingGroup = ac.firstOrDefault(x => tools.equal(x.key, key));
      var mappedValue = mapper(v);

      if (existingGroup) {
        existingGroup.elements.push(mappedValue);
        existingGroup.count++;
      } else {
        let existingMap = {
          key: key,
          count: 1,
          elements: [mappedValue]
        };
        ac.push(existingMap);
      }
      return ac;
    };

    return this.aggregate(func, initialValue);
  };

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  Linq.join = function (list, key1, key2, result) {
    const selectmany = selector => {
      return this.aggregate((ac, _, i) => {
        return ac.addRange(this.select(selector).elementAt(i)), ac;
      }, []);
    };

    return selectmany(function (x) {
      return list
        .where(function (y) {
          return key2(y) === key1(x);
        })
        .select(function (z) {
          return result(x, z);
        });
    });
  };

  /**
   * Returns the maximum value in a generic sequence.
   */
  Linq.max = function (selector) {
    var id = function (x) {
      return x;
    };
    return Math.max.apply(Math, this.map(selector || id));
  };

  /**
   * Returns the minimum value in a generic sequence.
   */
  Linq.min = function (selector) {
    var id = function (x) {
      return x;
    };
    return Math.min.apply(Math, this.map(selector || id));
  };

  /**
   * Removes the first occurrence of a specific object from the List<T>.
   */
  Linq.remove = function (element) {
    return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
  };

  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  Linq.removeAll = function (predicate) {
    return this.where(tools.negate(predicate));
  };

  /**
   * Removes the element at the specified index of the List<T>.
   */
  Linq.removeAt = function (index) {
    this.splice(index, 1);
  };

  /**
   * Projects each element of a sequence into a new form.
   */
  Linq.select = function (selector) {
    return this.map(selector);
  };

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  Linq.selectMany = function (selector) {
    var _this = this;
    return this.aggregate(function (ac, _, i) {
      return ac.addRange(_this.select(selector).elementAt(i)), ac;
    }, []);
  };

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  Linq.skip = function (amount) {
    return this.slice(Math.max(0, amount));
  };

  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  Linq.skipLast = function (amount) {
    return this.slice(0, -Math.max(0, amount));
  };

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Linq.sum = function (transform) {
    return transform
      ? this.select(transform).sum()
      : this.aggregate(function (ac, v) {
          return (ac = tools.calcNum(ac, +v));
        }, 0);
  };

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  Linq.take = function (amount) {
    return this.slice(0, Math.max(0, amount));
  };

  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  Linq.takeLast = function (amount) {
    return this.slice(-Math.max(0, amount));
  };

  /**
   * Copies the elements of the List<T> to a new array.
   */
  Linq.toArray = function () {
    return this;
  };

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  Linq.toDictionary = function (key, value) {
    var _this = this;
    return this.aggregate(function (dicc, v, i) {
      // dicc[_this.select(key).elementAt(i).toString()] = value ? _this.select(value).elementAt(i) : v;
      dicc.add({
        Key: _this.select(key).elementAt(i),
        Value: value ? _this.select(value).elementAt(i) : v
      });
      return dicc;
    }, []);
  };

  /**
   * Filters a sequence of values based on a predicate.
   */
  Linq.where = function (predicate) {
    return this.filter(predicate);
  };

  Object.assign(Array.prototype, Linq);
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
