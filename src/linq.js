'use strict';

/**
 * LINQ to JavaScript (Language Integrated Query)
 */
class Linq {
  /**
   * Defaults the elements of the list
   */
  constructor(elements) {
    if (elements === void 0) {
      elements = [];
    }
    this._elements = elements;

    //#region Method alias

    this.add = this.Add;
    this.append = this.Append;
    this.prepend = this.Prepend;
    this.addRange = this.AddRange;
    this.aggregate = this.Aggregate;
    this.all = this.All;
    this.any = this.Any;
    this.average = this.Average;
    this.cast = this.Cast;
    this.clear = this.Clear;
    this.concat = this.Concat;
    this.contains = this.Contains;
    this.count = this.Count;
    this.defaultIfEmpty = this.DefaultIfEmpty;
    this.distinct = this.Distinct;
    this.distinctBy = this.DistinctBy;
    this.distinctMap = this.DistinctMap;
    this.elementAt = this.ElementAt;
    this.elementAtOrDefault = this.ElementAtOrDefault;
    this.except = this.Except;
    this.first = this.First;
    this.firstOrDefault = this.FirstOrDefault;
    this.forEach = this.ForEach;
    this.groupBy = this.GroupBy;
    this.groupJoin = this.GroupJoin;
    this.indexOf = this.IndexOf;
    this.insert = this.Insert;
    this.intersect = this.Intersect;
    this.join = this.Join;
    this.last = this.Last;
    this.lastOrDefault = this.LastOrDefault;
    this.max = this.Max;
    this.min = this.Min;
    this.ofType = this.OfType;
    this.orderBy = this.OrderBy;
    this.orderByDescending = this.OrderByDescending;
    this.thenBy = this.ThenBy;
    this.thenByDescending = this.ThenByDescending;
    this.remove = this.Remove;
    this.removeAll = this.RemoveAll;
    this.removeAt = this.RemoveAt;
    this.reverse = this.Reverse;
    this.select = this.Select;
    this.selectMany = this.SelectMany;
    this.sequenceEqual = this.SequenceEqual;
    this.single = this.Single;
    this.singleOrDefault = this.SingleOrDefault;
    this.skip = this.Skip;
    this.skipLast = this.SkipLast;
    this.skipWhile = this.SkipWhile;
    this.sum = this.Sum;
    this.take = this.Take;
    this.takeLast = this.TakeLast;
    this.takeWhile = this.TakeWhile;
    this.toArray = this.ToArray;
    this.toDictionary = this.ToDictionary;
    this.toList = this.ToList;
    this.toLookup = this.ToLookup;
    this.union = this.Union;
    this.where = this.Where;
    this.zip = this.Zip;
    //#endregion
  }

  /**
   * Adds an object to the end of the List<T>.
   */
  Add(element) {
    this._elements.push(element);
  }

  /**
   * Appends an object to the end of the List<T>.
   */
  Append(element) {
    this.Add(element);
  }

  /**
   * Add an object to the start of the List<T>.
   */
  Prepend(element) {
    this._elements.unshift(element);
  }

  /**
   * Adds the elements of the specified collection to the end of the List<T>.
   */
  AddRange(elements) {
    var _a;
    (_a = this._elements).push.apply(_a, elements);
  }

  /**
   * Applies an accumulator function over a sequence.
   */
  Aggregate(accumulator, initialValue) {
    return this._elements.reduce(accumulator, initialValue);
  }

  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  All(predicate) {
    return this._elements.every(predicate);
  }

  /**
   * Determines whether a sequence contains any elements.
   */
  Any(predicate) {
    return predicate ? this._elements.some(predicate) : this._elements.length > 0;
  }

  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Average(transform) {
    return tools.calcNumDiv(this.Sum(transform), this.Count());
  }

  /**
   * Casts the elements of a sequence to the specified type.
   */
  Cast() {
    return new Linq(this._elements);
  }

  /**
   * Removes all elements from the List<T>.
   */
  Clear() {
    this._elements.length = 0;
  }

  /**
   * Concatenates two sequences.
   */
  Concat(list) {
    return new Linq(this._elements.concat(list.ToArray()));
  }

  /**
   * Determines whether an element is in the List<T>.
   */
  Contains(element) {
    return this.Any(function (x) {
      return x === element;
    });
  }

  /**
   * Returns the number of elements in a sequence.
   */
  Count(predicate) {
    return predicate ? this.Where(predicate).Count() : this._elements.length;
  }

  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  DefaultIfEmpty(defaultValue) {
    return this.Count() ? this : new Linq([defaultValue]);
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  Distinct() {
    return this.Where(function (value, index, iter) {
      return (
        (tools.isObj(value)
          ? iter.findIndex(function (obj) {
              return tools.equal(obj, value);
            })
          : iter.indexOf(value)) === index
      );
    });
  }

  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  DistinctBy(keySelector) {
    var groups = this.GroupBy(keySelector);

    const func = function (res, key) {
      const curr = new Linq(groups).FirstOrDefault(x => tools.equal(x.key, key));
      res.Add(curr.elements[0]);
      return res;
    };

    return new Linq(groups)
      .Select(x => x.key)
      .ToArray()
      .reduce(func, new Linq());
  }

  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values and this.Select method.
   */
  DistinctMap(predicate) {
    return predicate ? this.Select(predicate).Distinct() : this.Distinct();
  }

  /**
   * Returns the element at a specified index in a sequence.
   */
  ElementAt(index) {
    if (index < this.Count() && index >= 0) {
      return this._elements[index];
    } else {
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
    }
  }

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  ElementAtOrDefault(index) {
    return index < this.Count() && index >= 0 ? this._elements[index] : undefined;
  }

  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  Except(source) {
    return this.Where(function (x) {
      return !source.Contains(x);
    });
  }

  /**
   * Returns the first element of a sequence.
   */
  First(predicate) {
    if (this.Count()) {
      return predicate ? this.Where(predicate).First() : this._elements[0];
    } else {
      throw new Error('InvalidOperationException: The source sequence is empty.');
    }
  }

  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  FirstOrDefault(predicate) {
    return this.Count(predicate) ? this.First(predicate) : undefined;
  }

  /**
   * Performs the specified action on each element of the List<T>.
   */
  ForEach(action) {
    return this._elements.forEach(action);
  }

  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  GroupBy(grouper, mapper) {
    if (mapper === void 0) {
      mapper = function (val) {
        return val;
      };
    }
    var initialValue = [];

    const func = function (ac, v) {
      var key = grouper(v);
      var existingGroup = new Linq(ac).FirstOrDefault(x => tools.equal(x.key, key));
      var mappedValue = mapper(v);

      if (existingGroup) {
        existingGroup.elements.push(mappedValue);
        existingGroup.count++;
      } else {
        let existingMap = {
          key: key,
          count: 1,
          elements: [mappedValue],
        };
        ac.push(existingMap);
      }
      return ac;
    };

    return this.Aggregate(func, initialValue);
  }

  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  GroupJoin(list, key1, key2, result) {
    return this.Select(function (x) {
      return result(
        x,
        list.Where(function (z) {
          return key1(x) === key2(z);
        })
      );
    });
  }

  /**
   * Returns the index of the first occurence of an element in the List.
   */
  IndexOf(element) {
    return this._elements.indexOf(element);
  }

  /**
   * Inserts an element into the List<T> at the specified index.
   */
  Insert(index, element) {
    if (index < 0 || index > this._elements.length) {
      throw new Error('Index is out of range.');
    }
    this._elements.splice(index, 0, element);
  }

  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  Intersect(source) {
    return this.Where(function (x) {
      return source.Contains(x);
    });
  }

  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  Join(list, key1, key2, result) {
    const selectmany = selector => {
      return this.Aggregate((ac, _, i) => {
        return ac.AddRange(this.Select(selector).ElementAt(i).ToArray()), ac;
      }, new Linq());
    };

    return selectmany(function (x) {
      return list
        .Where(function (y) {
          return key2(y) === key1(x);
        })
        .Select(function (z) {
          return result(x, z);
        });
    });
  }

  /**
   * Returns the last element of a sequence.
   */
  Last(predicate) {
    if (this.Count()) {
      return predicate ? this.Where(predicate).Last() : this._elements[this.Count() - 1];
    } else {
      throw Error('InvalidOperationException: The source sequence is empty.');
    }
  }

  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  LastOrDefault(predicate) {
    return this.Count(predicate) ? this.Last(predicate) : undefined;
  }

  /**
   * Returns the maximum value in a generic sequence.
   */
  Max(selector) {
    var id = function (x) {
      return x;
    };
    return Math.max.apply(Math, this._elements.map(selector || id));
  }

  /**
   * Returns the minimum value in a generic sequence.
   */
  Min(selector) {
    var id = function (x) {
      return x;
    };
    return Math.min.apply(Math, this._elements.map(selector || id));
  }

  /**
   * Filters the elements of a sequence based on a specified type.
   */
  OfType(type) {
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
      ? this.Where(function (x) {
          return x instanceof type;
        }).Cast()
      : this.Where(function (x) {
          return typeof x === typeName;
        }).Cast();
  }

  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  OrderBy(keySelector, comparer) {
    if (comparer === void 0) {
      comparer = tools.keyComparer(keySelector, false);
    }
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer);
  }

  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  OrderByDescending(keySelector, comparer) {
    if (comparer === void 0) {
      comparer = tools.keyComparer(keySelector, true);
    }
    // tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  ThenBy(keySelector) {
    return this.OrderBy(keySelector);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  ThenByDescending(keySelector) {
    return this.OrderByDescending(keySelector);
  }

  /**
   * Removes the first occurrence of a specific object from the List<T>.
   */
  Remove(element) {
    return this.IndexOf(element) !== -1 ? (this.RemoveAt(this.IndexOf(element)), true) : false;
  }

  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  RemoveAll(predicate) {
    return this.Where(tools.negate(predicate));
  }

  /**
   * Removes the element at the specified index of the List<T>.
   */
  RemoveAt(index) {
    this._elements.splice(index, 1);
  }

  /**
   * Reverses the order of the elements in the entire List<T>.
   */
  Reverse() {
    return new Linq(this._elements.reverse());
  }

  /**
   * Projects each element of a sequence into a new form.
   */
  Select(selector) {
    return new Linq(this._elements.map(selector));
  }

  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  SelectMany(selector) {
    var _this = this;
    return this.Aggregate(function (ac, _, i) {
      return ac.AddRange(_this.Select(selector).ElementAt(i).ToArray()), ac;
    }, new Linq());
  }

  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  SequenceEqual(list) {
    return this.All(function (e) {
      return list.Contains(e);
    });
  }

  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  Single(predicate) {
    if (this.Count(predicate) !== 1) {
      throw new Error('The collection does not contain exactly one element.');
    } else {
      return this.First(predicate);
    }
  }

  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  SingleOrDefault(predicate) {
    return this.Count(predicate) ? this.Single(predicate) : undefined;
  }

  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  Skip(amount) {
    return new Linq(this._elements.slice(Math.max(0, amount)));
  }

  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  SkipLast(amount) {
    return new Linq(this._elements.slice(0, -Math.max(0, amount)));
  }

  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  SkipWhile(predicate) {
    var _this = this;
    return this.Skip(
      this.Aggregate(function (ac) {
        return predicate(_this.ElementAt(ac)) ? ++ac : ac;
      }, 0)
    );
  }

  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Sum(transform) {
    return transform
      ? this.Select(transform).Sum()
      : this.Aggregate(function (ac, v) {
          return (ac = tools.calcNum(ac, +v));
        }, 0);
  }

  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  Take(amount) {
    return new Linq(this._elements.slice(0, Math.max(0, amount)));
  }

  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  TakeLast(amount) {
    return new Linq(this._elements.slice(-Math.max(0, amount)));
  }

  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  TakeWhile(predicate) {
    var _this = this;
    return this.Take(
      this.Aggregate(function (ac) {
        return predicate(_this.ElementAt(ac)) ? ++ac : ac;
      }, 0)
    );
  }

  /**
   * Copies the elements of the List<T> to a new array.
   */
  ToArray() {
    return this._elements;
  }

  /**
   * Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
   */
  ToDictionary(key, value) {
    var _this = this;
    return this.Aggregate(function (dicc, v, i) {
      dicc[_this.Select(key).ElementAt(i).toString()] = value ? _this.Select(value).ElementAt(i) : v;
      dicc.Add({
        Key: _this.Select(key).ElementAt(i),
        Value: value ? _this.Select(value).ElementAt(i) : v,
      });
      return dicc;
    }, new Linq());
  }

  /**
   * Creates a List<T> from an Enumerable.List<T>.
   */
  ToList() {
    return this;
  }

  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  ToLookup(keySelector, elementSelector) {
    return this.GroupBy(keySelector, elementSelector);
  }

  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  Union(list) {
    return this.Concat(list).Distinct();
  }

  /**
   * Filters a sequence of values based on a predicate.
   */
  Where(predicate) {
    return new Linq(this._elements.filter(predicate));
  }

  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  Zip(list, result) {
    var _this = this;
    return list.Count() < this.Count()
      ? list.Select(function (x, y) {
          return result(_this.ElementAt(y), x);
        })
      : this.Select(function (x, y) {
          return result(x, list.ElementAt(y));
        });
  }
}

/**
 * Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
 * The immediate return value is an object that stores all the information that is required to perform the action.
 * The query represented by this method is not executed until the object is enumerated either by
 * calling its ToDictionary, ToLookup, ToList or ToArray methods
 */
class OrderedList extends Linq {
  constructor(elements, _comparer) {
    super(elements);
    this._comparer = _comparer;
    this._elements.sort(this._comparer);
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   * @override
   */
  ThenBy(keySelector) {
    return new OrderedList(this._elements, tools.composeComparers(this._comparer, tools.keyComparer(keySelector, false)));
  }

  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   * @override
   */
  ThenByDescending(keySelector) {
    return new OrderedList(this._elements, tools.composeComparers(this._comparer, tools.keyComparer(keySelector, true)));
  }
}

/**
 * Tool method
 */
const tools = {
  /**
   * Checks if the argument passed is an object
   */
  isObj(x) {
    return !!x && typeof x === 'object';
  },

  /**
   * Determine if two objects are equal
   */
  equal(a, b) {
    if (a === b) return true;
    if (typeof a != typeof b) return false;
    if (!(a instanceof Object)) return a === b;

    return Object.entries(a).every(_a => {
      var key = _a[0],
        val = _a[1];
      return this.isObj(val) ? this.equal(b[key], val) : b[key] === val;
    });
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
  },
};

module.exports = Linq;
