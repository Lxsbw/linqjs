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

    this.add = this.Add
    this.append = this.Append
    this.prepend = this.Prepend
    this.addRange = this.AddRange
    this.aggregate = this.Aggregate
    this.all = this.All
    this.any = this.Any
    this.average = this.Average
    this.cast = this.Cast
    this.clear = this.Clear
    this.concat = this.Concat
    this.contains = this.Contains
    this.count = this.Count
    this.defaultIfEmpty = this.DefaultIfEmpty
    this.distinct = this.Distinct
    this.distinctBy = this.DistinctBy
    this.elementAt = this.ElementAt
    this.elementAtOrDefault = this.ElementAtOrDefault
    this.except = this.Except
    this.first = this.First
    this.firstOrDefault = this.FirstOrDefault
    this.forEach = this.ForEach
    this.groupBy = this.GroupBy
    this.groupJoin = this.GroupJoin
    this.indexOf = this.IndexOf
    this.insert = this.Insert
    this.intersect = this.Intersect
    this.join = this.Join
    this.last = this.Last
    this.lastOrDefault = this.LastOrDefault
    this.max = this.Max
    this.min = this.Min
    this.ofType = this.OfType
    this.orderBy = this.OrderBy
    this.orderByDescending = this.OrderByDescending
    this.thenBy = this.ThenBy
    this.thenByDescending = this.ThenByDescending
    this.remove = this.Remove
    this.removeAll = this.RemoveAll
    this.removeAt = this.RemoveAt
    this.reverse = this.Reverse
    this.select = this.Select
    this.selectMany = this.SelectMany
    this.sequenceEqual = this.SequenceEqual
    this.single = this.Single
    this.singleOrDefault = this.SingleOrDefault
    this.skip = this.Skip
    this.skipLast = this.SkipLast
    this.skipWhile = this.SkipWhile
    this.sum = this.Sum
    this.take = this.Take
    this.takeLast = this.TakeLast
    this.takeWhile = this.TakeWhile
    this.toArray = this.ToArray
    this.toDictionary = this.ToDictionary
    this.toList = this.ToList
    this.toLookup = this.ToLookup
    this.union = this.Union
    this.where = this.Where
    this.zip = this.Zip
    #endregion

  ###
    Adds an object to the end of the List<T>.
  ###
  Add: (element) ->
    this._elements.push(element)

  ###
    Appends an object to the end of the List<T>.
  ###
  Append: (element) ->
    this.Add(element)

  ###
    Add an object to the start of the List<T>.
  ###
  Prepend: (element) ->
    this._elements.unshift(element)

  ###
    Adds the elements of the specified collection to the end of the List<T>.
  ###
  AddRange: (elements) ->
    _a
    (_a = this._elements).push.apply(_a, elements)

  ###
    Applies an accumulator function over a sequence.
  ###
  Aggregate: (accumulator, initialValue) ->
    return this._elements.reduce(accumulator, initialValue)

  ###
    Determines whether all elements of a sequence satisfy a condition.
  ###
  All: (predicate) ->
    return this._elements.every(predicate)

  ###
    Determines whether a sequence contains any elements.
  ###
  Any: (predicate) ->
    return if predicate then this._elements.some(predicate) else this._elements.length > 0

  ###
    Computes the average of a sequence of number values that are obtained by invoking
    a transform function on each element of the input sequence.
  ###
  Average: (transform) ->
    return tools.calcNumDiv(this.Sum(transform), this.Count(transform))

  ###
    Casts the elements of a sequence to the specified type.
  ###
  Cast: () ->
    return new Linq(this._elements)

  ###
    Removes all elements from the List<T>.
  ###
  Clear: () ->
    this._elements.length = 0

  ###
    Concatenates two sequences.
  ###
  Concat: (list) ->
    return new Linq(this._elements.concat(list.ToArray()))

  ###
    Determines whether an element is in the List<T>.
  ###
  Contains: (element) ->
    return this.Any((x) -> x is element)

  ###
    Returns the number of elements in a sequence.
  ###
  Count: (predicate) ->
    return if predicate then this.Where(predicate).Count() else this._elements.length

  ###
    Returns the elements of the specified sequence or the type parameter's default value
    in a singleton collection if the sequence is empty.
  ###
  DefaultIfEmpty: (defaultValue) ->
    return if this.Count() then this else new Linq([defaultValue])

  ###
    Returns distinct elements from a sequence by using the default equality comparer to compare values.
  ###
  Distinct: () ->
    return this.Where((value, index, iter) ->
      return (
        (if tools.isObj(value) then iter.findIndex((obj) -> tools.equal(obj, value)) else iter.indexOf(value)) is index
      )
    )

  ###
    Returns distinct elements from a sequence according to specified key selector.
  ###
  DistinctBy: (keySelector) ->
    groups = this.GroupBy(keySelector)

    func = (res, key) ->
      curr = new Linq(groups).FirstOrDefault((x) -> tools.equal(x.key, key))
      res.Add(curr.elements[0])
      return res

    return new Linq(groups).Select((x) -> x.key).ToArray().reduce(func, new Linq())

  ###
    Returns the element at a specified index in a sequence.
  ###
  ElementAt: (index) ->
    if (index < this.Count() && index >= 0)
      return this._elements[index]
    else
      throw new Error('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.')

  ###
    Returns the element at a specified index in a sequence or a default value if the index is out of range.
  ###
  ElementAtOrDefault: (index) ->
    return if index < this.Count() && index >= 0 then this._elements[index] else undefined

  ###
    Produces the set difference of two sequences by using the default equality comparer to compare values.
  ###
  Except: (source) ->
    return this.Where((x) -> !source.Contains(x))

  ###
    Returns the first element of a sequence.
  ###
  First: (predicate) ->
    if this.Count()
      return if predicate then this.Where(predicate).First() else this._elements[0]
    else
      throw new Error(
        'InvalidOperationException: The source sequence is empty.')

  ###
    Returns the first element of a sequence, or a default value if the sequence contains no elements.
  ###
  FirstOrDefault: (predicate) ->
    return if this.Count(predicate) then this.First(predicate) else undefined

  ###
    Performs the specified action on each element of the List<T>.
  ###
  ForEach: (action) ->
    return this._elements.forEach(action)

  ###
    Groups the elements of a sequence according to a specified key selector function.
  ###
  GroupBy: (grouper, mapper) ->
    if (mapper is undefined)
      mapper = (val) -> val

    initialValue = []

    func = (ac, v) ->
      key = grouper(v)
      existingGroup = new Linq(ac).FirstOrDefault((x) -> tools.equal(x.key, key))
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

    return this.Aggregate(func, initialValue)

  ###
    Correlates the elements of two sequences based on equality of keys and groups the results.
    The default equality comparer is used to compare keys.
  ###
  GroupJoin: (list, key1, key2, result) ->
    return this.Select((x) ->
      return result x, list.Where((z) -> key1(x) is key2(z))
    )

  ###
    Returns the index of the first occurence of an element in the List.
  ###
  IndexOf: (element) ->
    return this._elements.indexOf(element)

  ###
    Inserts an element into the List<T> at the specified index.
  ###
  Insert: (index, element) ->
    if (index < 0 || index > this._elements.length)
      throw new Error('Index is out of range.')
    this._elements.splice(index, 0, element)

  ###
    Produces the set intersection of two sequences by using the default equality comparer to compare values.
  ###
  Intersect: (source) ->
    return this.Where((x) -> source.Contains(x))

  ###
    Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
  ###
  Join: (list, key1, key2, result) ->
    selectmany = (selector) =>
      return this.Aggregate(((ac, _, i) =>
        ac.AddRange(this.Select(selector).ElementAt(i).ToArray())
        ac
      ), new Linq())

    return selectmany((x) ->
      return list
        .Where((y) -> key2(y) is key1(x))
        .Select((z) -> result(x, z))
    )

  ###
    Returns the last element of a sequence.
  ###
  Last: (predicate) ->
    if this.Count()
      return if predicate then this.Where(predicate).Last() else this._elements[this.Count() - 1]
    else
      throw Error('InvalidOperationException: The source sequence is empty.')

  ###
    Returns the last element of a sequence, or a default value if the sequence contains no elements.
  ###
  LastOrDefault: (predicate) ->
    return if this.Count(predicate) then this.Last(predicate) else undefined

  ###
    Returns the maximum value in a generic sequence.
  ###
  Max: (selector) ->
    id = (x) -> x
    return Math.max.apply(Math, this._elements.map(selector || id))

  ###
    Returns the minimum value in a generic sequence.
  ###
  Min: (selector) ->
    id = (x) -> x
    return Math.min.apply(Math, this._elements.map(selector || id))

  ###
    Filters the elements of a sequence based on a specified type.
  ###
  OfType: (type) ->
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
    return if typeName is null then this.Where((x) -> x instanceof type).Cast() else this.Where((x) -> typeof x is typeName).Cast()

  ###
    Sorts the elements of a sequence in ascending order according to a key.
  ###
  OrderBy: (keySelector, comparer) ->
    if (comparer is undefined)
      comparer = tools.keyComparer(keySelector, false)
    # tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer)

  ###
    Sorts the elements of a sequence in descending order according to a key.
  ###
  OrderByDescending: (keySelector, comparer) ->
    if (comparer is undefined)
      comparer = tools.keyComparer(keySelector, true)
    # tslint:disable-next-line: no-use-before-declare
    return new OrderedList(tools.cloneDeep(this._elements), comparer)

  ###
    Performs a subsequent ordering of the elements in a sequence in
    ascending order according to a key.
  ###
  ThenBy: (keySelector) ->
    return this.OrderBy(keySelector)
  ###
    Performs a subsequent ordering of the elements in a sequence in
    descending order, according to a key.
  ###
  ThenByDescending: (keySelector) ->
    return this.OrderByDescending(keySelector)

  ###
    Removes the first occurrence of a specific object from the List<T>.
  ###
  Remove: (element) ->
    return if this.IndexOf(element) isnt -1 then (this.RemoveAt(this.IndexOf(element)); true) else false

  ###
    Removes all the elements that match the conditions defined by the specified predicate.
  ###
  RemoveAll: (predicate) ->
    return this.Where(tools.negate(predicate))

  ###
    Removes the element at the specified index of the List<T>.
  ###
  RemoveAt: (index) ->
    this._elements.splice(index, 1)

  ###
    Reverses the order of the elements in the entire List<T>.
  ###
  Reverse: () ->
    return new Linq(this._elements.reverse())

  ###
    Projects each element of a sequence into a new form.
  ###
  Select: (selector) ->
    return new Linq(this._elements.map(selector))

  ###
    Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
  ###
  SelectMany: (selector) ->
    _this = this
    return this.Aggregate(((ac, _, i) ->
      ac.AddRange(_this.Select(selector).ElementAt(i).ToArray())
      ac
    ), new Linq())

  ###
    Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
  ###
  SequenceEqual: (list) ->
    return this.All((e) -> list.Contains(e))

  ###
    Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
  ###
  Single: (predicate) ->
    if (this.Count(predicate) isnt 1)
      throw new Error('The collection does not contain exactly one element.')
    else
      return this.First(predicate)

  ###
    Returns the only element of a sequence, or a default value if the sequence is empty;
    this method throws an exception if there is more than one element in the sequence.
  ###
  SingleOrDefault: (predicate) ->
    return if this.Count(predicate) then this.Single(predicate) else undefined

  ###
    Bypasses a specified number of elements in a sequence and then returns the remaining elements.
  ###
  Skip: (amount) ->
    return new Linq(this._elements.slice(Math.max(0, amount)))

  ###
    Omit the last specified number of elements in a sequence and then returns the remaining elements.
  ###
  SkipLast: (amount) ->
    return new Linq(this._elements.slice(0, -Math.max(0, amount)))

  ###
    Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
  ###
  SkipWhile: (predicate) ->
    _this = this
    return this.Skip(
      this.Aggregate((ac) ->
        return if predicate(_this.ElementAt(ac)) then ++ac else ac
      , 0)
    )

  ###
    Computes the sum of the sequence of number values that are obtained by invoking
    a transform function on each element of the input sequence.
  ###
  Sum: (transform) ->
    return if transform then this.Select(transform).Sum() else this.Aggregate(((ac, v) -> return (ac = tools.calcNum(ac, +v))), 0)

  ###
    Returns a specified number of contiguous elements from the start of a sequence.
  ###
  Take: (amount) ->
    return new Linq(this._elements.slice(0, Math.max(0, amount)))

  ###
    Returns a specified number of contiguous elements from the end of a sequence.
  ###
  TakeLast: (amount) ->
    return new Linq(this._elements.slice(-Math.max(0, amount)))

  ###
    Returns elements from a sequence as long as a specified condition is true.
  ###
  TakeWhile: (predicate) ->
    _this = this
    return this.Take(
      this.Aggregate((ac) ->
        return if predicate(_this.ElementAt(ac)) then ++ac else ac
      , 0)
    )

  ###
    Copies the elements of the List<T> to a new array.
  ###
  ToArray: () ->
    return this._elements

  ###
    Creates a Dictionary<TKey, TValue> from a List<T> according to a specified key selector function.
  ###
  ToDictionary: (key, value) ->
    _this = this
    return this.Aggregate((dicc, v, i) ->
      dicc[_this.Select(key).ElementAt(i).toString()] = if value then _this.Select(value).ElementAt(i) else v

      dicc.Add({
        Key: _this.Select(key).ElementAt(i),
        Value: if value then _this.Select(value).ElementAt(i) else v
      })
      return dicc
    , new Linq())

  ###
    Creates a List<T> from an Enumerable.List<T>.
  ###
  ToList: () ->
    return this

  ###
    Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
  ###
  ToLookup: (keySelector, elementSelector) ->
    return this.GroupBy(keySelector, elementSelector)

  ###
    Produces the set union of two sequences by using the default equality comparer.
  ###
  Union: (list) ->
    return this.Concat(list).Distinct()

  ###
    Filters a sequence of values based on a predicate.
  ###
  Where: (predicate) ->
    return new Linq(this._elements.filter(predicate))

  ###
    Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
  ###
  Zip: (list, result) ->
    _this = this
    return if list.Count() < this.Count() then list.Select((x, y) -> result(_this.ElementAt(y), x)) else this.Select((x, y) -> result(x, list.ElementAt(y)))

###
  Represents a sorted sequence. The methods of this class are implemented by using deferred execution.
  The immediate return value is an object that stores all the information that is required to perform the action.
  The query represented by this method is not executed until the object is enumerated either by
  calling its ToDictionary, ToLookup, ToList or ToArray methods
###
class OrderedList extends Linq
  constructor: (elements, @_comparer) ->
    super(elements)
    this._elements.sort(@_comparer)

  ###
    Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
    @override
  ###
  ThenBy: (keySelector) ->
    return new OrderedList(
      this._elements,
      tools.composeComparers @_comparer, tools.keyComparer(keySelector, false))

  ###
    Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
    @override
  ###
  ThenByDescending: (keySelector) ->
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
  keyComparer: (_keySelector, descending) -> return (a, b) ->
    sortKeyA = _keySelector(a)
    sortKeyB = _keySelector(b)
    if (sortKeyA > sortKeyB)
      return if !descending then 1 else -1
    else if (sortKeyA < sortKeyB)
      return if !descending then -1 else 1
    else
      return 0

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
