'use strict';

/**
 * LINQ to JavaScript (Language Integrated Query)
 */
class Linq {
  /**
   * Defaults the elements of the list
   */
  constructor(elements = [], locales = null) {
    this._elements = elements;
    this._locales = locales;
  }

  /**
   * Make the List iterable and Spreadable
   */
  *[Symbol.iterator]() {
    for (let element of this._elements) {
      yield element;
    }
  }

  /**
   * property represents the Object name
   */
  get [Symbol.toStringTag]() {
    return 'List'; // Expected output: "[object List]"
  }

  /**
   * Adds an object to the end of the List<T>.
   */
  add(element) {
    this._elements.push(element);
  }

  /**
   * Appends an object to the end of the List<T>.
   */
  append(element) {
    this.add(element);
  }

  /**
   * Add an object to the start of the List<T>.
   */
  prepend(element) {
    this._elements.unshift(element);
  }

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  addRange(elements) {
    this._elements.push(...elements);
  }

  /**
   * Applies an accumulator function over a sequence.
   */
  aggregate(accumulator, initialValue) {
    return this._elements.reduce(accumulator, initialValue);
  }

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  all(predicate) {
    return this._elements.every(predicate);
  }

  /**
   * Determines whether a sequence contains any elements.
   */
  any(predicate) {
    return predicate ? this._elements.some(predicate) : this._elements.length > 0;
  }

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  average(transform) {
    return Tools.calcNumDiv(this.sum(transform), this.count());
  }

  /**
   * Casts the elements of a sequence to the specified type.
   */
  cast() {
    return new Linq(this._elements);
  }

  /**
   * Removes all elements from the List<T>.
   */
  clear() {
    this._elements.length = 0;
  }

  /**
   * Concatenates two sequences.
   */
  concat(list) {
    return new Linq(this._elements.concat(list.toArray()));
  }

  /**
   * Determines whether an element is in the List<T>.
   */
  contains(element) {
    return this.any(x => x === element);
  }

  /**
   * Returns the number of elements in a sequence.
   */
  count(predicate) {
    return predicate ? this.where(predicate).count() : this._elements.length;
  }

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  defaultIfEmpty(defaultValue) {
    return this.count() ? this : new Linq([defaultValue]);
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  distinct() {
    return this.where((value, index, iter) => (Tools.isObject(value) ? iter && iter.findIndex(obj => Tools.equal(obj, value)) : iter && iter.indexOf(value)) === index);
  }

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  distinctBy(keySelector) {
    const groups = this.groupBy(keySelector);

    const func = function (res, key) {
      const curr = new Linq(groups).firstOrDefault(x => Tools.equal(x.key, key));
      res.add(curr.elements[0]);
      return res;
    };

    return new Linq(groups)
      .select(x => x.key)
      .toArray()
      .reduce(func, new Linq());
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values and this.select method.
   */
  distinctMap(predicate) {
    return predicate ? this.select(predicate).distinct() : this.distinct();
  }

  /**
   * Returns the element at a specified index in a sequence.
   */
  elementAt(index) {
    if (index < this.count() && index >= 0) {
      return this._elements[index];
    } else {
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
    }
  }

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  elementAtOrDefault(index) {
    return index < this.count() && index >= 0 ? this._elements[index] : null;
  }

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  except(source) {
    return this.where(x => !source.contains(x));
  }

  /**
   * Returns the first element of a sequence.
   */
  first(predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).first() : this._elements[0];
    } else {
      throw new Error('InvalidOperationException: The source sequence is empty.');
    }
  }

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  firstOrDefault(predicate) {
    return this.count(predicate) ? this.first(predicate) : undefined;
  }

  /**
   * Performs the specified action on each element of the List<T>.
   */
  forEach(action) {
    return this._elements.forEach(action);
  }

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  groupBy(grouper, mapper = val => val) {
    const groupMap = new Map();
    for (let element of this._elements) {
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
  }

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   * a little data.
   */
  groupByMini(grouper, mapper = val => val) {
    const initialValue = [];
    const func = function (ac, v) {
      const key = grouper(v);
      const existingGroup = new Linq(ac).firstOrDefault(x => Tools.equal(x.key, key));
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
  }

  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  groupJoin(list, key1, key2, result) {
    return this.select(x =>
      result(
        x,
        list.where(z => key1(x) === key2(z))
      )
    );
  }

  /**
   * Returns the index of the first occurence of an element in the List.
   */
  indexOf(element) {
    return this._elements.indexOf(element);
  }

  /**
   * Inserts an element into the List<T> at the specified index.
   */
  insert(index, element) {
    if (index < 0 || index > this._elements.length) {
      throw new Error('Index is out of range.');
    }
    this._elements.splice(index, 0, element);
  }

  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  intersect(source) {
    return this.where(x => source.contains(x));
  }

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  join(list, key1, key2, result) {
    return this.selectMany(x => list.where(y => key2(y) === key1(x)).select(z => result(x, z)));
  }

  /**
   * Returns the last element of a sequence.
   */
  last(predicate) {
    if (this.count()) {
      return predicate ? this.where(predicate).last() : this._elements[this.count() - 1];
    } else {
      throw Error('InvalidOperationException: The source sequence is empty.');
    }
  }

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  lastOrDefault(predicate) {
    return this.count(predicate) ? this.last(predicate) : undefined;
  }

  /**
   * Returns the maximum value in a generic sequence.
   */
  max(selector) {
    const identity = x => x;
    return Math.max(...this._elements.map(selector || identity));
    // return Math.max(...this.select(selector || identity).toList());
  }

  /**
   * Returns the minimum value in a generic sequence.
   */
  min(selector) {
    const identity = x => x;
    return Math.min(...this._elements.map(selector || identity));
    // return Math.min(...this.select(selector || identity).toList());
  }

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  ofType(type) {
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
  }

  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  orderBy(keySelector, comparer = Tools.keyComparer(keySelector, false, this._locales)) {
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(Tools.arrayMap(this._elements), comparer, this._locales);
  }

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  orderByDescending(keySelector, comparer = Tools.keyComparer(keySelector, true, this._locales)) {
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(Tools.arrayMap(this._elements), comparer, this._locales);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  thenBy(keySelector) {
    return this.orderBy(keySelector);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  thenByDescending(keySelector) {
    return this.orderByDescending(keySelector);
  }

  /**
   * Removes the first occurrence of a specific object from the List<T>.
   */
  remove(element) {
    return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
  }

  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  removeAll(predicate) {
    return this.where(Tools.negate(predicate));
  }

  /**
   * Removes the element at the specified index of the List<T>.
   */
  removeAt(index) {
    this._elements.splice(index, 1);
  }

  /**
   * Reverses the order of the elements in the entire List<T>.
   */
  reverse() {
    return new Linq(this._elements.reverse());
  }

  /**
   * Projects each element of a sequence into a new form.
   */
  select(selector) {
    return new Linq(this._elements.map(selector));
  }

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  selectMany(selector) {
    return this.aggregate((ac, _, i) => (ac.addRange(this.select(selector).elementAt(i).toArray()), ac), new Linq());
  }

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  sequenceEqual(list) {
    return this.all(e => list.contains(e));
  }

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  single(predicate) {
    if (this.count(predicate) !== 1) {
      throw new Error('The collection does not contain exactly one element.');
    } else {
      return this.first(predicate);
    }
  }

  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  singleOrDefault(predicate) {
    return this.count(predicate) ? this.single(predicate) : undefined;
  }

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  skip(amount) {
    return new Linq(this._elements.slice(Math.max(0, amount)));
  }

  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  skipLast(amount) {
    return new Linq(this._elements.slice(0, -Math.max(0, amount)));
  }

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  skipWhile(predicate) {
    return this.skip(this.aggregate(ac => (predicate(this.elementAt(ac)) ? ++ac : ac), 0));
  }

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  sum(transform) {
    return transform ? this.select(transform).sum() : this.aggregate((ac, v) => (ac = Tools.calcNum(ac, +v)), 0);
  }

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  take(amount) {
    return new Linq(this._elements.slice(0, Math.max(0, amount)));
  }

  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  takeLast(amount) {
    return new Linq(this._elements.slice(-Math.max(0, amount)));
  }

  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  takeWhile(predicate) {
    return this.take(this.aggregate(ac => (predicate(this.elementAt(ac)) ? ++ac : ac), 0));
  }

  /**
   * Copies the elements of the List<T> to a new array.
   */
  toArray() {
    return this._elements;
  }

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  toDictionary(key, value) {
    return this.aggregate((dicc, v, i) => {
      // dicc[this.select(key).elementAt(i).toString()] = value ? this.select(value).elementAt(i) : v;
      dicc.add({
        Key: this.select(key).elementAt(i),
        Value: !!value ? this.select(value).elementAt(i) : v,
      });
      return dicc;
    }, new Linq());
  }

  /**
   * Creates a List<T> from an Enumerable.List<T>.
   */
  toList() {
    return this;
  }

  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  toLookup(keySelector, elementSelector) {
    return this.groupBy(keySelector, elementSelector);
  }

  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  union(list) {
    return this.concat(list).distinct();
  }

  /**
   * Filters a sequence of values based on a predicate.
   */
  where(predicate) {
    return new Linq(this._elements.filter(predicate));
  }

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  zip(list, result) {
    return list.count() < this.count() ? list.select((x, y) => result(this.elementAt(y), x)) : this.select((x, y) => result(x, list.elementAt(y)));
  }

  /**
   * Determine if two objects are equal.
   */
  // equals(param1, param2) {
  //   return Tools.equal(param1, param2);
  // }

  /**
   * clone deep object.
   */
  cloneDeep(param) {
    return Tools.cloneDeep(param);
  }
}

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its toDictionary, toLookup, toList or toArray methods
 */
class OrderedList extends Linq {
  constructor(elements, _comparer, locales) {
    super(elements, locales);
    this._comparer = _comparer;
    if (Tools.isArray(this._elements)) {
      this._elements.sort(this._comparer);
    }
  }

  /**
   * Allows you to get the parent Linq out of the OrderedList
   * @override
   * @returns and ordered list turned into a regular Linq<T>
   */
  // toList() {
  //   return new Linq(this._elements);
  // }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  thenBy(keySelector) {
    return new OrderedList(this._elements, Tools.composeComparers(this._comparer, Tools.keyComparer(keySelector, false, this._locales)), this._locales);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  thenByDescending(keySelector) {
    return new OrderedList(this._elements, Tools.composeComparers(this._comparer, Tools.keyComparer(keySelector, true, this._locales)), this._locales);
  }
}

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
    // common comparer
    const _comparer = (sortKeyA, sortKeyB) => {
      if (sortKeyA > sortKeyB) {
        return !descending ? 1 : -1;
      } else if (sortKeyA < sortKeyB) {
        return !descending ? -1 : 1;
      } else {
        return 0;
      }
    };
    // string comparer
    const _stringComparer = (sortKeyA, sortKeyB) => {
      if (locales) {
        if (sortKeyA.localeCompare(sortKeyB, locales) > 0) {
          return !descending ? 1 : -1;
        } else if (sortKeyB.localeCompare(sortKeyA, locales) > 0) {
          return !descending ? -1 : 1;
        } else {
          return 0;
        }
      } else {
        if (sortKeyA.localeCompare(sortKeyB) > 0) {
          return !descending ? 1 : -1;
        } else if (sortKeyB.localeCompare(sortKeyA) > 0) {
          return !descending ? -1 : 1;
        } else {
          return 0;
        }
      }
    };

    return (a, b) => {
      const sortKeyA = _keySelector(a);
      const sortKeyB = _keySelector(b);

      if (this.isString(sortKeyA) && this.isString(sortKeyB)) {
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
    // throw new Error("Unable to copy param! Its type isn't supported.");
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Linq;
} else {
  window.Linq = Linq;
}
