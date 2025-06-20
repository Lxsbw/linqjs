(function () {
  var Linq = {};

  /**
   * Adds an object to the end of the List<T>.
   */
  Linq.add = function (element) {
    this.push(element);
  };

  /**
   * Appends an object to the end of the Linq<T>.
   */
  Linq.append = function (element) {
    this.add(element);
  };

  /**
   * Add an object to the start of the Linq<T>.
   */
  Linq.prepend = function (element) {
    this.unshift(element);
  };

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  Linq.addRange = function (elements) {
    this.push(...elements);
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
    return Tools.calcNumDiv(this.sum(transform), this.count());
  };

  /**
   * Casts the elements of a sequence to the specified type.
   */
  Linq.cast = function () {
    return this;
  };

  /**
   * Removes all elements from the Linq<T>.
   */
  Linq.clear = function () {
    this.length = 0;
  };

  /**
   * Concatenates two sequences.
   */
  // Linq.concat = function (list) {
  //   return new Linq(this._elements.concat(list.toArray()));
  // };

  /**
   * Determines whether an element is in the Linq<T>.
   */
  Linq.contains = function (element) {
    return this.any(x => x === element);
  };

  /**
   * Returns the number of elements in a sequence.
   */
  Linq.count = function (predicate) {
    return predicate ? this.where(predicate).count() : this.length;
  };

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  Linq.defaultIfEmpty = function (defaultValue) {
    return this.count() ? this : [defaultValue];
  };

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  Linq.distinct = function () {
    return this.where((value, index, iter) => (Tools.isObject(value) ? iter.findIndex(obj => Tools.equal(obj, value)) : iter.indexOf(value)) === index);
  };

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  Linq.distinctBy = function (keySelector) {
    const groups = this.groupBy(keySelector);

    const func = function (res, key) {
      const curr = groups.firstOrDefault(x => Tools.equal(x.key, key));
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
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  Linq.elementAtOrDefault = function (index) {
    return index < this.count() && index >= 0 ? this[index] : null;
  };

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  Linq.except = function (source) {
    return this.where(x => !source.contains(x));
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
  Linq.groupBy = function (grouper, mapper = val => val) {
    const groupMap = new Map();
    for (let element of this) {
      const key = Tools.getHash(grouper(element));
      const mappedValue = mapper(element);

      if (!groupMap.has(key)) {
        groupMap.set(key, { key: grouper(element), count: 0, elements: [] });
      }

      const group = groupMap.get(key);
      group.elements.push(mappedValue);
      group.count++;
    }
    return Array.from(groupMap.values());
  };

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   * a little data.
   */
  Linq.groupByMini = function (grouper, mapper = val => val) {
    const initialValue = [];
    const func = function (ac, v) {
      const key = grouper(v);
      const existingGroup = ac.firstOrDefault(x => Tools.equal(x.key, key));
      const mappedValue = mapper(v);
      if (existingGroup) {
        existingGroup.elements.push(mappedValue);
        existingGroup.count++;
      } else {
        const existingMap = { key: key, count: 1, elements: [mappedValue] };
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
  Linq.groupJoin = function (list, key1, key2, result) {
    return this.select(x =>
      result(
        x,
        list.where(z => key1(x) === key2(z))
      )
    );
  };

  /**
   * Returns the index of the first occurence of an element in the Linq.
   */
  // Linq.indexOf = function (element) {
  //   return this.indexOf(element);
  // };

  /**
   * Inserts an element into the Linq<T> at the specified index.
   */
  Linq.insert = function (index, element) {
    if (index < 0 || index > this.length) {
      throw new Error('Index is out of range.');
    }
    this.splice(index, 0, element);
  };

  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  Linq.intersect = function (source) {
    return this.where(x => source.contains(x));
  };

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  Linq.joinLinq = function (list, key1, key2, result) {
    return this.selectMany(x => list.where(y => key2(y) === key1(x)).select(z => result(x, z)));
  };

  /**
   * Returns the last element of a sequence.
   */
  Linq.last = function (predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).last() : this[this.count() - 1];
    } else {
      throw Error('InvalidOperationException: The source sequence is empty.');
    }
  };

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  Linq.lastOrDefault = function (predicate) {
    return this.count(predicate) ? this.last(predicate) : undefined;
  };

  /**
   * Returns the maximum value in a generic sequence.
   */
  Linq.max = function (selector) {
    const id = x => x;
    return Math.max(...this.map(selector || id));
  };

  /**
   * Returns the minimum value in a generic sequence.
   */
  Linq.min = function (selector) {
    const id = x => x;
    return Math.min(...this.map(selector || id));
  };

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  Linq.ofType = function (type) {
    let typeName;
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
    return typeName === null ? this.where(x => x instanceof type).cast() : this.where(x => typeof x === typeName).cast();
  };

  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  Linq.orderBy = function (keySelector, comparer = Tools.keyComparer(keySelector, false, this.__proto__.__locales)) {
    this.__proto__.__comparer = comparer;
    return Tools.arrayMap(this).sort(comparer);
  };

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  Linq.orderByDescending = function (keySelector, comparer = Tools.keyComparer(keySelector, true, this.__proto__.__locales)) {
    this.__proto__.__comparer = comparer;
    return Tools.arrayMap(this).sort(comparer);
  };

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  Linq.thenBy = function (keySelector) {
    this.__proto__.__comparer = Tools.composeComparers(this.__proto__.__comparer, Tools.keyComparer(keySelector, false, this.__proto__.__locales));
    return Tools.arrayMap(this).sort(this.__proto__.__comparer);
  };

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  Linq.thenByDescending = function (keySelector) {
    this.__proto__.__comparer = Tools.composeComparers(this.__proto__.__comparer, Tools.keyComparer(keySelector, true, this.__proto__.__locales));
    return Tools.arrayMap(this).sort(this.__proto__.__comparer);
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
    return this.where(Tools.negate(predicate));
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
    return this.aggregate((ac, _, i) => (ac.addRange(this.select(selector).elementAt(i)), ac), []);
  };

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  Linq.sequenceEqual = function (list) {
    return this.all(e => list.contains(e));
  };

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  Linq.single = function (predicate) {
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
  Linq.singleOrDefault = function (predicate) {
    return this.count(predicate) ? this.single(predicate) : undefined;
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
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  Linq.skipWhile = function (predicate) {
    return this.skip(this.aggregate(ac => (predicate(this.elementAt(ac)) ? ++ac : ac), 0));
  };

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Linq.sum = function (transform) {
    return transform ? this.select(transform).sum() : this.aggregate((ac, v) => (ac = Tools.calcNum(ac, +v)), 0);
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
   * Returns elements from a sequence as long as a specified condition is true.
   */
  Linq.takeWhile = function (predicate) {
    return this.take(this.aggregate(ac => (predicate(this.elementAt(ac)) ? ++ac : ac), 0));
  };

  /**
   * Copies the elements of the List<T> to a new array.
   */
  Linq.toArray = function () {
    if (this.__proto__.__comparer) delete this.__proto__.__comparer;
    if (this.__proto__.__locales) delete this.__proto__.__locales;
    // return this.filter(x => !('function' === typeof x));
    return this;
  };

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  Linq.toDictionary = function (key, value) {
    return this.aggregate((dicc, v, i) => {
      // dicc[this.select(key).elementAt(i).toString()] = value ? this.select(value).elementAt(i) : v;
      dicc.add({
        Key: this.select(key).elementAt(i),
        Value: value ? this.select(value).elementAt(i) : v,
      });
      return dicc;
    }, []);
  };

  /**
   * Creates a Linq<T> from an Enumerable.Linq<T>.
   */
  Linq.toList = function () {
    if (this.__proto__.__comparer) delete this.__proto__.__comparer;
    if (this.__proto__.__locales) delete this.__proto__.__locales;
    return this;
  };

  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  Linq.toLookup = function (keySelector, elementSelector) {
    return this.groupBy(keySelector, elementSelector);
  };

  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  Linq.union = function (list) {
    return this.concat(list).distinct();
  };

  /**
   * Filters a sequence of values based on a predicate.
   */
  Linq.where = function (predicate) {
    return this.filter(predicate);
  };

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  Linq.zip = function (list, result) {
    return list.count() < this.count() ? list.select((x, y) => result(this.elementAt(y), x)) : this.select((x, y) => result(x, list.elementAt(y)));
  };

  /**
   * Determine if two objects are equal.
   */
  // equals(param1, param2) {
  //   return Tools.equal(param1, param2);
  // }

  /**
   * clone deep object.
   */
  Linq.cloneDeep = function (param) {
    return Tools.cloneDeep(param);
  };

  Object.assign(Array.prototype, Linq);
})();

/**
 * Tool method
 */
const Tools = {
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

    const entriesA = Object.entries(a);
    const entriesB = Object.entries(b);
    if (entriesA.length !== entriesB.length) return false;

    const Fn = (entries, _b) => entries.every(([key, val]) => (this.isObject(val) ? this.equal(_b[key], val) : _b[key] === val));

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
    return (a, b) => previousComparer(a, b) || currentComparer(a, b);
  },

  /**
   * Key comparer
   */

  keyComparer(_keySelector, descending, locales) {
    const isString = Tools.isString;

    return (a, b) => {
      const sortKeyA = _keySelector(a);
      const sortKeyB = _keySelector(b);

      // Handle null or undefined
      const isNullishA = sortKeyA === null || sortKeyA === undefined;
      const isNullishB = sortKeyB === null || sortKeyB === undefined;

      if (isNullishA && isNullishB) return 0;
      if (isNullishA) return descending ? -1 : 1;
      if (isNullishB) return descending ? 1 : -1;

      // String comparison
      if (isString(sortKeyA) && isString(sortKeyB)) {
        const result = locales ? sortKeyA.localeCompare(sortKeyB, locales) : sortKeyA.localeCompare(sortKeyB);
        return descending ? -result : result;
      }

      // Fallback: number or other types comparison
      if (sortKeyA > sortKeyB) return descending ? -1 : 1;
      if (sortKeyA < sortKeyB) return descending ? 1 : -1;

      return 0;
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
   */
  calcNumDiv(num1, num2) {
    if (!this.isNum(num1) || !this.isNum(num2)) return 0;
    const { mult } = this.calcMultiple(num1, num2);
    return (num1 * mult) / (num2 * mult);
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
   * Check array
   */
  isArray(array) {
    return Array.isArray(array);
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
   * Build array new reference
   */
  arrayMap(array) {
    if (!this.isArray(array)) {
      return array;
    }
    return array.map(x => x);
  },

  /**
   * Clone data
   */
  cloneDeep(obj) {
    /* istanbul ignore next */
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
        if (obj.hasOwnProperty(i)) {
          result.push(this.cloneDeep(obj[i]));
        }
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
    /* istanbul ignore next */
    throw new Error("Unable to copy param! Its type isn't supported.");
  },

  /**
   * Generate Hash
   */
  getHash(obj) {
    let hashValue = '';

    function typeOf(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }

    function generateHash(value) {
      const type = typeOf(value);
      switch (type) {
        case 'object':
          const keys = Object.keys(value).sort();
          keys.forEach(key => {
            hashValue += `${key}:${generateHash(value[key])};`;
          });
          break;
        case 'array':
          value.forEach(item => {
            hashValue += `${generateHash(item)},`;
          });
          break;
        case 'boolean':
          hashValue += `boolean<>_<>_<>${value.toString()}`;
          break;
        case 'null':
          hashValue += 'null<>_<>_<>';
          break;
        case 'undefined':
          hashValue += 'undefined<>_<>_<>';
          break;
        default:
          hashValue += value ? value.toString() : '';
          break;
      }
      return hashValue;
    }
    return generateHash(obj);
  },
};
