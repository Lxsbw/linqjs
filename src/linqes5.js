'use strict';

/**
 * LINQ to JavaScript (Language Integrated Query)
 */
var Linq = (function () {
  /**
   * Defaults the elements of the list
   */
  function Linq(elements) {
    if (elements === void 0) {
      elements = [];
    }
    this._elements = elements;
  }

  /**
   * Adds an object to the end of the Linq<T>.
   */
  Linq.prototype.add = function (element) {
    this._elements.push(element);
  };

  /**
   * Appends an object to the end of the Linq<T>.
   */
  Linq.prototype.append = function (element) {
    this.add(element);
  };

  /**
   * Add an object to the start of the Linq<T>.
   */
  Linq.prototype.prepend = function (element) {
    this._elements.unshift(element);
  };

  /**
   * Adds the elements of the specified collection to the end of the Linq<T>.
   */
  Linq.prototype.addRange = function (elements) {
    var _a;
    (_a = this._elements).push.apply(_a, elements);
  };

  /**
   * Applies an accumulator function over a sequence.
   */
  Linq.prototype.aggregate = function (accumulator, initialValue) {
    return this._elements.reduce(accumulator, initialValue);
  };

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  Linq.prototype.all = function (predicate) {
    return this._elements.every(predicate);
  };

  /**
   * Determines whether a sequence contains any elements.
   */
  Linq.prototype.any = function (predicate) {
    return predicate ? this._elements.some(predicate) : this._elements.length > 0;
  };

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Linq.prototype.average = function (transform) {
    return Tools.calcNumDiv(this.sum(transform), this.count());
  };

  /**
   * Casts the elements of a sequence to the specified type.
   */
  Linq.prototype.cast = function () {
    return new Linq(this._elements);
  };

  /**
   * Removes all elements from the Linq<T>.
   */
  Linq.prototype.clear = function () {
    this._elements.length = 0;
  };

  /**
   * Concatenates two sequences.
   */
  Linq.prototype.concat = function (list) {
    return new Linq(this._elements.concat(list.toArray()));
  };

  /**
   * Determines whether an element is in the Linq<T>.
   */
  Linq.prototype.contains = function (element) {
    return this.any(function (x) {
      return x === element;
    });
  };

  /**
   * Returns the number of elements in a sequence.
   */
  Linq.prototype.count = function (predicate) {
    return predicate ? this.where(predicate).count() : this._elements.length;
  };

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  Linq.prototype.defaultIfEmpty = function (defaultValue) {
    return this.count() ? this : new Linq([defaultValue]);
  };

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  Linq.prototype.distinct = function () {
    return this.where(function (value, index, iter) {
      return (
        (Tools.isObject(value)
          ? iter.findIndex(function (obj) {
              return Tools.equal(obj, value);
            })
          : iter.indexOf(value)) === index
      );
    });
  };

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  Linq.prototype.distinctBy = function (keySelector) {
    var groups = this.groupBy(keySelector);
    var func = function (res, key) {
      var curr = new Linq(groups).firstOrDefault(function (x) {
        return Tools.equal(x.key, key);
      });
      res.add(curr.elements[0]);
      return res;
    };
    return new Linq(groups)
      .select(function (x) {
        return x.key;
      })
      .toArray()
      .reduce(func, new Linq());
  };

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values and this.select method.
   */
  Linq.prototype.distinctMap = function (selector) {
    return selector ? this.select(selector).distinct() : this.distinct();
  };

  /**
   * Returns the element at a specified index in a sequence.
   */
  Linq.prototype.elementAt = function (index) {
    if (index < this.count() && index >= 0) {
      return this._elements[index];
    } else {
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
    }
  };

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  Linq.prototype.elementAtOrDefault = function (index) {
    return index < this.count() && index >= 0 ? this._elements[index] : undefined;
  };

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  Linq.prototype.except = function (source) {
    return this.where(function (x) {
      return !source.contains(x);
    });
  };

  /**
   * Returns the first element of a sequence.
   */
  Linq.prototype.first = function (predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).first() : this._elements[0];
    } else {
      throw new Error('InvalidOperationException: The source sequence is empty.');
    }
  };

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  Linq.prototype.firstOrDefault = function (predicate) {
    return this.count(predicate) ? this.first(predicate) : undefined;
  };

  /**
   * Performs the specified action on each element of the Linq<T>.
   */
  Linq.prototype.forEach = function (action) {
    return this._elements.forEach(action);
  };

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  Linq.prototype.groupBy = function (grouper, mapper) {
    if (mapper === void 0) {
      mapper = function (val) {
        return val;
      };
    }
    var initialValue = [];
    var func = function (ac, v) {
      var key = grouper(v);
      var existingGroup = new Linq(ac).firstOrDefault(function (x) {
        return Tools.equal(x.key, key);
      });
      var mappedValue = mapper(v);
      if (existingGroup) {
        existingGroup.elements.push(mappedValue);
        existingGroup.count++;
      } else {
        var existingMap = { key: key, count: 1, elements: [mappedValue] };
        ac.push(existingMap);
      }
      return ac;
    };
    return this.aggregate(func, initialValue);
  };

  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  Linq.prototype.groupJoin = function (list, key1, key2, result) {
    return this.select(function (x) {
      return result(
        x,
        list.where(function (z) {
          return key1(x) === key2(z);
        })
      );
    });
  };

  /**
   * Returns the index of the first occurence of an element in the List.
   */
  Linq.prototype.indexOf = function (element) {
    return this._elements.indexOf(element);
  };

  /**
   * Inserts an element into the Linq<T> at the specified index.
   */
  Linq.prototype.insert = function (index, element) {
    if (index < 0 || index > this._elements.length) {
      throw new Error('Index is out of range.');
    }
    this._elements.splice(index, 0, element);
  };

  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  Linq.prototype.intersect = function (source) {
    return this.where(function (x) {
      return source.contains(x);
    });
  };

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  Linq.prototype.join = function (list, key1, key2, result) {
    return this.selectMany(function (x) {
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
   * Returns the last element of a sequence.
   */
  Linq.prototype.last = function (predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).last() : this._elements[this.count() - 1];
    } else {
      throw Error('InvalidOperationException: The source sequence is empty.');
    }
  };

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  Linq.prototype.lastOrDefault = function (predicate) {
    return this.count(predicate) ? this.last(predicate) : undefined;
  };

  /**
   * Returns the maximum value in a generic sequence.
   */
  Linq.prototype.max = function (selector) {
    var id = function (x) {
      return x;
    };
    return Math.max.apply(Math, this._elements.map(selector || id));
  };

  /**
   * Returns the minimum value in a generic sequence.
   */
  Linq.prototype.min = function (selector) {
    var id = function (x) {
      return x;
    };
    return Math.min.apply(Math, this._elements.map(selector || id));
  };

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  Linq.prototype.ofType = function (type) {
    var typeName;
    switch (type) {
      case Number:
        typeName = typeof 0;
        break;
      case String:
        typeName = typeof '';
        break;
      case Boolean:
        typeName = typeof true;
        break;
      case Function:
        typeName = typeof function () {}; // tslint:disable-line no-empty
        break;
      default:
        typeName = null;
        break;
    }
    return typeName === null
      ? this.where(function (x) {
          return x instanceof type;
        }).cast()
      : this.where(function (x) {
          return typeof x === typeName;
        }).cast();
  };

  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  Linq.prototype.orderBy = function (keySelector, comparer) {
    if (comparer === void 0) {
      comparer = Tools.keyComparer(keySelector, false);
    }
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(Tools.cloneDeep(this._elements), comparer);
  };

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  Linq.prototype.orderByDescending = function (keySelector, comparer) {
    if (comparer === void 0) {
      comparer = Tools.keyComparer(keySelector, true);
    }
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(Tools.cloneDeep(this._elements), comparer);
  };

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  Linq.prototype.thenBy = function (keySelector) {
    return this.orderBy(keySelector);
  };

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  Linq.prototype.thenByDescending = function (keySelector) {
    return this.orderByDescending(keySelector);
  };

  /**
   * Removes the first occurrence of a specific object from the Linq<T>.
   */
  Linq.prototype.remove = function (element) {
    return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
  };

  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  Linq.prototype.removeAll = function (predicate) {
    return this.where(Tools.negate(predicate));
  };

  /**
   * Removes the element at the specified index of the Linq<T>.
   */
  Linq.prototype.removeAt = function (index) {
    this._elements.splice(index, 1);
  };

  /**
   * Reverses the order of the elements in the entire Linq<T>.
   */
  Linq.prototype.reverse = function () {
    return new Linq(this._elements.reverse());
  };

  /**
   * Projects each element of a sequence into a new form.
   */
  Linq.prototype.select = function (selector) {
    return new Linq(this._elements.map(selector));
  };

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  Linq.prototype.selectMany = function (selector) {
    var _this = this;
    return this.aggregate(function (ac, _, i) {
      return ac.addRange(_this.select(selector).elementAt(i).toArray()), ac;
    }, new Linq());
  };

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  Linq.prototype.sequenceEqual = function (list) {
    return this.all(function (e) {
      return list.contains(e);
    });
  };

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  Linq.prototype.single = function (predicate) {
    if (this.count(predicate) !== 1) {
      throw new Error('The collection does not contain exactly one element.');
    } else {
      return this.first(predicate);
    }
  };

  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  Linq.prototype.singleOrDefault = function (predicate) {
    return this.count(predicate) ? this.single(predicate) : undefined;
  };

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  Linq.prototype.skip = function (amount) {
    return new Linq(this._elements.slice(Math.max(0, amount)));
  };

  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  Linq.prototype.skipLast = function (amount) {
    return new Linq(this._elements.slice(0, -Math.max(0, amount)));
  };

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  Linq.prototype.skipWhile = function (predicate) {
    var _this = this;
    return this.skip(
      this.aggregate(function (ac) {
        return predicate(_this.elementAt(ac)) ? ++ac : ac;
      }, 0)
    );
  };

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Linq.prototype.sum = function (transform) {
    return transform
      ? this.select(transform).sum()
      : this.aggregate(function (ac, v) {
          return (ac = Tools.calcNum(ac, +v));
        }, 0);
  };

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  Linq.prototype.take = function (amount) {
    return new Linq(this._elements.slice(0, Math.max(0, amount)));
  };

  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  Linq.prototype.takeLast = function (amount) {
    return new Linq(this._elements.slice(-Math.max(0, amount)));
  };

  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  Linq.prototype.takeWhile = function (predicate) {
    var _this = this;
    return this.take(
      this.aggregate(function (ac) {
        return predicate(_this.elementAt(ac)) ? ++ac : ac;
      }, 0)
    );
  };

  /**
   * Copies the elements of the Linq<T> to a new array.
   */
  Linq.prototype.toArray = function () {
    return this._elements;
  };

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  Linq.prototype.toDictionary = function (key, value) {
    var _this = this;
    return this.aggregate(function (dicc, v, i) {
      dicc[_this.select(key).elementAt(i).toString()] = value ? _this.select(value).elementAt(i) : v;
      dicc.add({
        Key: _this.select(key).elementAt(i),
        Value: value ? _this.select(value).elementAt(i) : v
      });
      return dicc;
    }, new Linq());
  };

  /**
   * Creates a Linq<T> from an Enumerable.Linq<T>.
   */
  Linq.prototype.toList = function () {
    return this;
  };

  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  Linq.prototype.toLookup = function (keySelector, elementSelector) {
    return this.groupBy(keySelector, elementSelector);
  };

  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  Linq.prototype.union = function (list) {
    return this.concat(list).distinct();
  };

  /**
   * Filters a sequence of values based on a predicate.
   */
  Linq.prototype.where = function (predicate) {
    return new Linq(this._elements.filter(predicate));
  };

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  Linq.prototype.zip = function (list, result) {
    var _this = this;
    return list.count() < this.count()
      ? list.select(function (x, y) {
          return result(_this.elementAt(y), x);
        })
      : this.select(function (x, y) {
          return result(x, list.elementAt(y));
        });
  };

  return Linq;
})();

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its toDictionary, toLookup, toList or toArray methods
 */
var OrderedList = (function (_super) {
  function OrderedList(elements, _comparer) {
    var _this = _super.call(this, elements) || this;
    _this._comparer = _comparer;
    _this._elements.sort(_this._comparer);
    return _this;
  }

  OrderedList.prototype = new _super();
  OrderedList.prototype.constructor = OrderedList;

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  OrderedList.prototype.thenBy = function (keySelector) {
    return new OrderedList(this._elements, Tools.composeComparers(this._comparer, Tools.keyComparer(keySelector, false)));
  };

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  OrderedList.prototype.thenByDescending = function (keySelector) {
    return new OrderedList(this._elements, Tools.composeComparers(this._comparer, Tools.keyComparer(keySelector, true)));
  };

  return OrderedList;
})(Linq);

/**
 * Tool method
 */
var Tools = (function () {
  function Tools() {}
  var _a;
  _a = Tools;

  /**
   * Checks if the argument passed is an object
   */
  Tools.isObject = function (x) {
    return !!x && typeof x === 'object';
  };

  /**
   * Determine if two objects are equal
   */
  Tools.equal = function (a, b) {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (!_a.isObject(a) || !_a.isObject(b)) return a === b;
    var types = [a, b].map(function (x) {
      return x.constructor;
    });
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
    var Fn = function (entries, _b) {
      return entries.every(function (_c) {
        var key = _c[0],
          val = _c[1];
        return Tools.isObject(val) ? Tools.equal(_b[key], val) : _b[key] === val;
      });
    };
    return Fn(entriesA, b) && Fn(entriesB, a);
  };

  /**
   * Creates a function that negates the result of the predicate
   */
  Tools.negate = function (pred) {
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return !pred.apply(void 0, args);
    };
  };

  /**
   * Comparer helpers
   */
  Tools.composeComparers = function (previousComparer, currentComparer) {
    return function (a, b) {
      return previousComparer(a, b) || currentComparer(a, b);
    };
  };

  /**
   * Key comparer
   */
  Tools.keyComparer = function (_keySelector, descending) {
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
      if (Tools.isString(sortKeyA) && Tools.isString(sortKeyB)) {
        return _stringComparer(sortKeyA, sortKeyB);
      }
      return _comparer(sortKeyA, sortKeyB);
    };
  };

  /**
   * Number calculate addition
   */
  Tools.calcNum = function (num1, num2) {
    if (!Tools.isNum(num1) || !Tools.isNum(num2)) return 0;
    var _c = Tools.calcMultiple(num1, num2),
      mult = _c.mult,
      place = _c.place;
    return Number(((num1 * mult + num2 * mult) / mult).toFixed(place));
  };

  /**
   * Number calculate division
   * To be improved
   */
  Tools.calcNumDiv = function (num1, num2) {
    return num1 / num2;
  };

  /**
   * Check number
   */
  Tools.isNum = function (args) {
    return typeof args === 'number' && !isNaN(args);
  };

  /**
   * Check string
   */
  Tools.isString = function (args) {
    return typeof args === 'string' && args.constructor === String;
  };

  /**
   * Calculation multiple
   */
  Tools.calcMultiple = function (num1, num2) {
    var arrNum1 = num1.toString().split('.');
    var arrNum2 = num2.toString().split('.');
    var sq1 = arrNum1.length > 1 ? arrNum1[1].length : 0;
    var sq2 = arrNum2.length > 1 ? arrNum2[1].length : 0;
    var mult = Math.pow(10, Math.max(sq1, sq2));
    var place = sq1 >= sq2 ? sq1 : sq2;
    return { mult: mult, place: place };
  };

  /**
   * Clone data
   */
  Tools.cloneDeep = function (obj) {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
    var result;
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
      for (var i in obj) {
        result.push(Tools.cloneDeep(obj[i]));
      }
      return result;
    }
    // Handle Object
    if (obj instanceof Object) {
      result = {};
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          result[i] = Tools.cloneDeep(obj[i]);
        }
      }
      return result;
    }
    throw new Error("Unable to copy param! Its type isn't supported.");
  };
  
  return Tools;
})();

if (typeof module !== 'undefined') {
  if (typeof exports !== 'undefined') {
    exports = module.exports = Linq;
  }
  exports.Linq = Linq;
} else {
  window.Linq = Linq;
}
