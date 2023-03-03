###
  LINQ to CoffeeScript (Language Integrated Query)
###
class Linq
  ###
    Defaults the elements of the list
  ###
  constructor: (elements) ->
    elements = [] if not elements
    this._elements = elements

    #region Method alias

    # this.add = this.add
    # this.append = this.append
    # this.prepend = this.prepend
    # this.addRange = this.addRange
    # this.aggregate = this.aggregate
    # this.all = this.all
    # this.any = this.any
    # this.average = this.average
    # this.cast = this.cast
    # this.clear = this.clear
    # this.concat = this.concat
    # this.contains = this.contains
    # this.count = this.count
    # this.defaultIfEmpty = this.defaultIfEmpty
    # this.distinct = this.distinct
    # this.distinctBy = this.distinctBy
    # this.distinctMap = this.distinctMap
    # this.elementAt = this.elementAt
    # this.elementAtOrDefault = this.elementAtOrDefault
    # this.except = this.except
    # this.first = this.first
    # this.firstOrDefault = this.firstOrDefault
    # this.forEach = this.forEach
    # this.groupBy = this.groupBy
    # this.groupJoin = this.groupJoin
    # this.indexOf = this.indexOf
    # this.insert = this.insert
    # this.intersect = this.intersect
    # this.join = this.join
    # this.last = this.last
    # this.lastOrDefault = this.lastOrDefault
    # this.max = this.max
    # this.min = this.min
    # this.ofType = this.ofType
    # this.orderBy = this.orderBy
    # this.orderByDescending = this.orderByDescending
    # this.thenBy = this.thenBy
    # this.thenByDescending = this.thenByDescending
    # this.remove = this.remove
    # this.removeAll = this.removeAll
    # this.removeAt = this.removeAt
    # this.reverse = this.reverse
    # this.select = this.select
    # this.selectMany = this.selectMany
    # this.sequenceEqual = this.sequenceEqual
    # this.single = this.single
    # this.singleOrDefault = this.singleOrDefault
    # this.skip = this.skip
    # this.skipLast = this.skipLast
    # this.skipWhile = this.skipWhile
    # this.sum = this.sum
    # this.take = this.take
    # this.takeLast = this.takeLast
    # this.takeWhile = this.takeWhile
    # this.toArray = this.toArray
    # this.toDictionary = this.toDictionary
    # this.toList = this.toList
    # this.toLookup = this.toLookup
    # this.union = this.union
    # this.where = this.where
    # this.zip = this.zip
    #endregion

  ###
    Adds an object to the end of the List<T>.
  ###
  add: (element) ->
    this._elements.push(element)

  ###
    Appends an object to the end of the List<T>.
  ###
  append: (element) ->
    this.add(element)

  ###
    Add an object to the start of the List<T>.
  ###
  prepend: (element) ->
    this._elements.unshift(element)

  ###
    Adds the elements of the specified collection to the end of the List<T>.
  ###
  addRange: (elements) ->
    _a
    (_a = this._elements).push.apply(_a, elements)

  ###
    Applies an accumulator function over a sequence.
  ###
  aggregate: (accumulator, initialValue) ->
    return this._elements.reduce(accumulator, initialValue)

  ###
    Determines whether all elements of a sequence satisfy a condition.
  ###
  all: (predicate) ->
    return this._elements.every(predicate)

  ###
    Determines whether a sequence contains any elements.
  ###
  any: (predicate) ->
    return if predicate then this._elements.some(predicate) else this._elements.length > 0

  ###
    Computes the average of a sequence of number values that are obtained by invoking
    a transform function on each element of the input sequence.
  ###
  average: (transform) ->
    return tools.calcNumDiv(this.sum(transform), this.count())

  ###
    Casts the elements of a sequence to the specified type.
  ###
  cast: () ->
    return new Linq(this._elements)

  ###
    Removes all elements from the List<T>.
  ###
  clear: () ->
    this._elements.length = 0

  ###
    Concatenates two sequences.
  ###
  concat: (list) ->
    return new Linq(this._elements.concat(list.toArray()))

  ###
    Determines whether an element is in the List<T>.
  ###
  contains: (element) ->
    return this.any((x) -> x is element)

  ###
    Returns the number of elements in a sequence.
  ###
  count: (predicate) ->
    return if predicate then this.where(predicate).count() else this._elements.length

  ###
    Returns the elements of the specified sequence or the type parameter's default value
    in a singleton collection if the sequence is empty.
  ###
  defaultIfEmpty: (defaultValue) ->
    return if this.count() then this else new Linq([defaultValue])

  ###
    Returns distinct elements from a sequence by using the default equality comparer to compare values.
  ###
  distinct: () ->
    return this.where((value, index, iter) ->
      return (
        (if tools.isObj(value) then iter.findIndex((obj) -> tools.equal(obj, value)) else iter.indexOf(value)) is index
      )
    )

  ###
    Returns distinct elements from a sequence according to specified key selector.
  ###
  distinctBy: (keySelector) ->
    groups = this.groupBy(keySelector)

    func = (res, key) ->
      curr = new Linq(groups).firstOrDefault((x) -> tools.equal(x.key, key))
      res.add(curr.elements[0])
      return res

    return new Linq(groups).select((x) -> x.key).toArray().reduce(func, new Linq())

  ###
    Returns distinct elements from a sequence by using the default equality comparer to compare values and this.select method.
  ###
  distinctMap: (predicate) ->
    return if predicate then this.select(predicate).distinct() else this.distinct()

  ###
    Returns the element at a specified index in a sequence.
  ###
  elementAt: (index) ->
    if (index < this.count() && index >= 0)
      return this._elements[index]
    else
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.')

  ###
    Returns the element at a specified index in a sequence or a default value if the index is out of range.
  ###
  elementAtOrDefault: (index) ->
    return if index < this.count() && index >= 0 then this._elements[index] else undefined

  ###
    Produces the set difference of two sequences by using the default equality comparer to compare values.
  ###
  except: (source) ->
    return this.where((x) -> !source.contains(x))

  ###
    Returns the first element of a sequence.
  ###
  first: (predicate) ->
    if this.count()
      return if predicate then this.where(predicate).first() else this._elements[0]
    else
      throw new Error(
        'InvalidOperationException: The source sequence is empty.')

  ###
    Returns the first element of a sequence, or a default value if the sequence contains no elements.
  ###
  firstOrDefault: (predicate) ->
    return if this.count(predicate) then this.first(predicate) else undefined

  ###
    Performs the specified action on each element of the List<T>.
  ###
  forEach: (action) ->
    return this._elements.forEach(action)

  ###
    Groups the elements of a sequence according to a specified key selector function.
  ###
  groupBy: (grouper, mapper) ->
    if (mapper is undefined)
      mapper = (val) -> val

    initialValue = []

    func = (ac, v) ->
      key = grouper(v)
      existingGroup = new Linq(ac).firstOrDefault((x) -> tools.equal(x.key, key))
      mappedValue = mapper(v)

      if existingGroup
        existingGroup.elements.push(mappedValue)
        existingGroup.count++
      else
        existingMap = {
          key: key,
          count: 1,
          elements: [mappedValue]
        }
        ac.push(existingMap)
      return ac

    return this.aggregate(func, initialValue)

  ###
    Correlates the elements of two sequences based on equality of keys and groups the results.
    The default equality comparer is used to compare keys.
  ###
  groupJoin: (list, key1, key2, result) ->
    return this.select((x) ->
      return result x, list.where((z) -> key1(x) is key2(z))
    )

  ###
    Returns the index of the first occurence of an element in the List.
  ###
  indexOf: (element) ->
    return this._elements.indexOf(element)

  ###
    Inserts an element into the List<T> at the specified index.
  ###
  insert: (index, element) ->
    if (index < 0 || index > this._elements.length)
      throw new Error('Index is out of range.')
    this._elements.splice(index, 0, element)

  ###
    Produces the set intersection of two sequences by using the default equality comparer to compare values.
  ###
  intersect: (source) ->
    return this.where((x) -> source.contains(x))

  ###
    Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
  ###
  join: (list, key1, key2, result) ->
    selectmany = (selector) =>
      return this.aggregate(((ac, _, i) =>
        ac.addRange(this.select(selector).elementAt(i).toArray())
        ac
      ), new Linq())

    return selectmany((x) ->
      return list
        .where((y) -> key2(y) is key1(x))
        .select((z) -> result(x, z))
    )

  ###
    Returns the last element of a sequence.
  ###
  last: (predicate) ->
    if this.count()
      return if predicate then this.where(predicate).last() else this._elements[this.count() - 1]
    else
      throw Error('InvalidOperationException: The source sequence is empty.')

  ###
    Returns the last element of a sequence, or a default value if the sequence contains no elements.
  ###
  lastOrDefault: (predicate) ->
    return if this.count(predicate) then this.last(predicate) else undefined

  ###
    Returns the maximum value in a generic sequence.
  ###
  max: (selector) ->
    id = (x) -> x
    return Math.max.apply(Math, this._elements.map(selector || id))

  ###
    Returns the minimum value in a generic sequence.
  ###
  min: (selector) ->
    id = (x) -> x
    return Math.min.apply(Math, this._elements.map(selector || id))

  ###
    Filters the elements of a sequence based on a specified type.
  ###
  ofType: (type) ->
    typeName
    switch (type)
      when Number
        typeName = typeof 0
        break
      when String
        typeName = typeof ''
        break
      when Boolean
        typeName = typeof true
        break
      when Function
        typeName = typeof () -> # tslint:disable-line no-empty
        break
      else
        typeName = null
        break
    return if typeName is null then this.where((x) -> x instanceof type).cast() else this.where((x) -> typeof x is typeName).cast()

  ###
    Sorts the elements of a sequence in ascending order according to a key.
  ###
  orderBy: (keySelector, comparer) ->
    if (comparer is undefined)
      comparer = tools.keyComparer(keySelector, false)
    # tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer)

  ###
    Sorts the elements of a sequence in descending order according to a key.
  ###
  orderByDescending: (keySelector, comparer) ->
    if (comparer is undefined)
      comparer = tools.keyComparer(keySelector, true)
    # tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer)

  ###
    Performs a subsequent ordering of the elements in a sequence in
    ascending order according to a key.
  ###
  thenBy: (keySelector) ->
    return this.orderBy(keySelector)

  ###
    Performs a subsequent ordering of the elements in a sequence in
    descending order, according to a key.
  ###
  thenByDescending: (keySelector) ->
    return this.orderByDescending(keySelector)

  ###
    Removes the first occurrence of a specific object from the List<T>.
  ###
  remove: (element) ->
    return if this.indexOf(element) isnt -1 then (this.removeAt(this.indexOf(element)); true) else false

  ###
    Removes all the elements that match the conditions defined by the specified predicate.
  ###
  removeAll: (predicate) ->
    return this.where(tools.negate(predicate))

  ###
    Removes the element at the specified index of the List<T>.
  ###
  removeAt: (index) ->
    this._elements.splice(index, 1)

  ###
    Reverses the order of the elements in the entire List<T>.
  ###
  reverse: () ->
    return new Linq(this._elements.reverse())

  ###
    Projects each element of a sequence into a new form.
  ###
  select: (selector) ->
    return new Linq(this._elements.map(selector))

  ###
    Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
  ###
  selectMany: (selector) ->
    _this = this
    return this.aggregate(((ac, _, i) ->
      ac.addRange(_this.select(selector).elementAt(i).toArray())
      ac
    ), new Linq())

  ###
    Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
  ###
  sequenceEqual: (list) ->
    return this.all((e) -> list.contains(e))

  ###
    Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
  ###
  single: (predicate) ->
    if (this.count(predicate) isnt 1)
      throw new Error('The collection does not contain exactly one element.')
    else
      return this.first(predicate)

  ###
    Returns the only element of a sequence, or a default value if the sequence is empty;
    this method throws an exception if there is more than one element in the sequence.
  ###
  singleOrDefault: (predicate) ->
    return if this.count(predicate) then this.single(predicate) else undefined

  ###
    Bypasses a specified number of elements in a sequence and then returns the remaining elements.
  ###
  skip: (amount) ->
    return new Linq(this._elements.slice(Math.max(0, amount)))

  ###
    Omit the last specified number of elements in a sequence and then returns the remaining elements.
  ###
  skipLast: (amount) ->
    return new Linq(this._elements.slice(0, -Math.max(0, amount)))

  ###
    Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
  ###
  skipWhile: (predicate) ->
    _this = this
    return this.skip(
      this.aggregate((ac) ->
        return if predicate(_this.elementAt(ac)) then ++ac else ac
      , 0)
    )

  ###
    Computes the sum of the sequence of number values that are obtained by invoking
    a transform function on each element of the input sequence.
  ###
  sum: (transform) ->
    return if transform then this.select(transform).sum() else this.aggregate(((ac, v) -> return (ac = tools.calcNum(ac, +v))), 0)

  ###
    Returns a specified number of contiguous elements from the start of a sequence.
  ###
  take: (amount) ->
    return new Linq(this._elements.slice(0, Math.max(0, amount)))

  ###
    Returns a specified number of contiguous elements from the end of a sequence.
  ###
  takeLast: (amount) ->
    return new Linq(this._elements.slice(-Math.max(0, amount)))

  ###
    Returns elements from a sequence as long as a specified condition is true.
  ###
  takeWhile: (predicate) ->
    _this = this
    return this.take(
      this.aggregate((ac) ->
        return if predicate(_this.elementAt(ac)) then ++ac else ac
      , 0)
    )

  ###
    Copies the elements of the List<T> to a new array.
  ###
  toArray: () ->
    return this._elements

  ###
    Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
  ###
  toDictionary: (key, value) ->
    _this = this
    return this.aggregate((dicc, v, i) ->
      dicc[_this.select(key).elementAt(i).toString()] = if value then _this.select(value).elementAt(i) else v

      dicc.add({
        Key: _this.select(key).elementAt(i),
        Value: if value then _this.select(value).elementAt(i) else v
      })
      return dicc
    , new Linq())

  ###
    Creates a List<T> from an Enumerable.List<T>.
  ###
  toList: () ->
    return this

  ###
    Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
  ###
  toLookup: (keySelector, elementSelector) ->
    return this.groupBy(keySelector, elementSelector)

  ###
    Produces the set union of two sequences by using the default equality comparer.
  ###
  union: (list) ->
    return this.concat(list).distinct()

  ###
    Filters a sequence of values based on a predicate.
  ###
  where: (predicate) ->
    return new Linq(this._elements.filter(predicate))

  ###
    Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
  ###
  zip: (list, result) ->
    _this = this
    return if list.count() < this.count() then list.select((x, y) -> result(_this.elementAt(y), x)) else this.select((x, y) -> result(x, list.elementAt(y)))

###
  Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
  The immediate return value is an object that stores all the information that is required to perform the action.
  The query represented by this method is not executed until the object is enumerated either by
  calling its toDictionary, toLookup, toList or toArray methods
###
class OrderedList extends Linq
  constructor: (elements, @_comparer) ->
    super(elements)
    this._elements.sort(@_comparer)

  ###
    Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
    @override
  ###
  thenBy: (keySelector) ->
    return new OrderedList(
      this._elements,
      tools.composeComparers @_comparer, tools.keyComparer(keySelector, false))

  ###
    Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
    @override
  ###
  thenByDescending: (keySelector) ->
    return new OrderedList(
      this._elements,
      tools.composeComparers @_comparer, tools.keyComparer(keySelector, true))

###
  Tool method
###
tools = {
  ###
    Checks if the argument passed is an object
  ###
  isObj: (x) ->
    return !!x && typeof x is 'object'

  ###
    Determine if two objects are equal
  ###
  equal: (a, b) ->
    if (a is b) then return true
    if (typeof a isnt typeof b) then return false
    if not (a instanceof Object) then return a is b

    return Object.entries(a).every((_a) =>
      key = _a[0]
      val = _a[1]
      return if @isObj(val) then @equal(b[key], val) else b[key] is val)

  ###
    Creates a function that negates the result of the predicate
  ###
  negate: (pred) -> return () ->
    args = []
    for _i of arguments
      args[_i] = arguments[_i]
    return !pred.apply(undefined, args)

  ###
    Comparer helpers
  ###
  composeComparers: (previousComparer, currentComparer) -> return (a, b) ->
    return previousComparer(a, b) || currentComparer(a, b)

  ###
    Key comparer
  ###
  keyComparer: (_keySelector, descending) ->
    # common comparer
    _comparer = (sortKeyA, sortKeyB) ->
      if (sortKeyA > sortKeyB)
        return if !descending then 1 else -1
      else if (sortKeyA < sortKeyB)
        return if !descending then -1 else 1
      else
        return 0

    # string comparer
    _stringComparer = (sortKeyA, sortKeyB) ->
      if (sortKeyA.localeCompare(sortKeyB) > 0)
        return if !descending then 1 else -1
      else if (sortKeyB.localeCompare(sortKeyA) > 0)
        return if !descending then -1 else 1
      else
        return 0

    return (a, b) =>
      sortKeyA = _keySelector(a)
      sortKeyB = _keySelector(b)
      if @isString(sortKeyA) and @isString(sortKeyB)
        return _stringComparer(sortKeyA, sortKeyB)
      return _comparer(sortKeyA, sortKeyB)

  ###
    Number calculate addition
  ###
  calcNum: (num1, num2) ->
    if (not @isNum num1) or (not @isNum num2)
      return 0
    { mult, place } = @calcMultiple(num1, num2)
    return Number(((num1 * mult + num2 * mult) / mult).toFixed(place))
  
  ###
    Number calculate division
    To be improved
  ###
  calcNumDiv: (num1, num2) ->
    return num1 / num2

  ###
    Check number
  ###
  isNum: (args) ->
    return (typeof args is 'number') and (not isNaN(args))

  ###
    Check string
  ###
  isString: (args) ->
    return (typeof args is 'string') and (args.constructor is String)

  ###
    Calculation multiple
  ###
  calcMultiple: (num1, num2) ->
    arrNum1 = num1.toString().split('.')
    arrNum2 = num2.toString().split('.')
    sq1 = if arrNum1.length > 1 then arrNum1[1].length else 0
    sq2 = if arrNum2.length > 1 then arrNum2[1].length else 0
    mult = Math.pow(10, Math.max(sq1, sq2))
    place = if sq1 >= sq2 then sq1 else sq2
    return { mult, place }

  ###
    Clone data
  ###
  cloneDeep: (obj) ->
    # Handle the 3 simple types, and null or undefined
    return obj if null is obj || "object" isnt typeof obj

    # Handle Date
    if obj instanceof Date
      result = new Date()
      result.setTime obj.getTime()
      return result

    # Handle RegExp
    if obj instanceof RegExp
      result = obj
      return result

    # Handle Array
    if obj instanceof Array
      result = (@cloneDeep o for o in obj)
      return result

    # Handle Object
    if obj instanceof Object
      result = {}
      result[k] = @cloneDeep v for k, v of obj when obj.hasOwnProperty k
      return result

    throw new Error("Unable to copy param! Its type isn't supported.")
}

module.exports = Linq
