/**
 * Linq to JavaScript (Language Integrated Query)
 * Documentation from Linq .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 */
declare type PredicateType<T> = (value?: T, index?: number, list?: T[]) => boolean;

declare class Linq<T> {
  protected _elements: T[];
  protected _locales: string | string[];
  /**
   * Make the Linq iterable and Spreadable
   */
  [Symbol.iterator](): Generator<T, void, unknown>;
  /**
   * property represents the Object name
   */
  get [Symbol.toStringTag](): string;
  /**
   * Defaults the elements of the list
   */
  constructor(elements?: T[], locales?: string | string[]);
  /**
   * Adds an object to the end of the Linq<T>.
   */
  add(element: T): void;
  /**
   * Appends an object to the end of the Linq<T>.
   */
  append(element: T): void;
  /**
   * Add an object to the start of the Linq<T>.
   */
  prepend(element: T): void;
  /**
   * Adds the elements of the specified collection to the end of the Linq<T>.
   */
  addRange(elements: T[]): void;
  /**
   * Applies an accumulator function over a sequence.
   */
  aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  all(predicate: PredicateType<T>): boolean;
  /**
   * Determines whether a sequence contains any elements.
   */
  any(predicate?: PredicateType<T>): boolean;
  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  average(transform?: (value?: T, index?: number, list?: T[]) => any): number;
  /**
   * Casts the elements of a sequence to the specified type.
   */
  cast<U>(): Linq<U>;
  /**
   * Removes all elements from the Linq<T>.
   */
  clear(): void;
  /**
   * Concatenates two sequences.
   */
  concat(list: Linq<T>): Linq<T>;
  /**
   * Determines whether an element is in the Linq<T>.
   */
  contains(element: T): boolean;
  /**
   * Returns the number of elements in a sequence.
   */
  count(predicate?: PredicateType<T>): number;
  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  defaultIfEmpty(defaultValue?: T): Linq<T>;
  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  distinct(): Linq<T>;
  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  distinctBy<TOut>(keySelector: (key: T) => TOut): Linq<T>;
  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values and this.select method.
   */
  distinctMap<TOut>(selector?: (element: T, index: number) => TOut): Linq<T | TOut>;
  /**
   * Returns the element at a specified index in a sequence.
   */
  elementAt(index: number): T;
  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  elementAtOrDefault(index: number): T | null;
  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  except(source: Linq<T>): Linq<T>;
  /**
   * Returns the first element of a sequence.
   */
  first(predicate?: PredicateType<T>): T;
  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  firstOrDefault(predicate?: PredicateType<T>): T;
  /**
   * Performs the specified action on each element of the Linq<T>.
   */
  forEach(action: (value?: T, index?: number, list?: T[]) => any): void;
  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  groupBy<TOut, TResult = T>(grouper: (key: T) => TOut, mapper?: (element: T) => TResult): TResult[];
  /**
   * Groups the elements of a sequence according to a specified key selector function.
   * a little data.
   */
  groupByMini<TOut, TResult = T>(grouper: (key: T) => TOut, mapper?: (element: T) => TResult): TResult[];
  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  groupJoin<U, R>(list: Linq<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: Linq<U>) => R): Linq<R>;
  /**
   * Returns the index of the first occurence of an element in the Linq.
   */
  indexOf(element: T): number;
  /**
   * Inserts an element into the Linq<T> at the specified index.
   */
  insert(index: number, element: T): void | Error;
  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  intersect(source: Linq<T>): Linq<T>;
  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  join<U, R>(list: Linq<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => R): Linq<R>;
  /**
   * Returns the last element of a sequence.
   */
  last(predicate?: PredicateType<T>): T;
  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  lastOrDefault(predicate?: PredicateType<T>): T;
  /**
   * Returns the maximum value in a generic sequence.
   */
  max(selector?: (value: T, index: number, array: T[]) => number): number;
  // max(selector?: (element: T, index: number) => number): number;
  /**
   * Returns the minimum value in a generic sequence.
   */
  min(selector?: (value: T, index: number, array: T[]) => number): number;
  // min(selector?: (element: T, index: number) => number): number;
  /**
   * Filters the elements of a sequence based on a specified type.
   */
  ofType<U>(type: any): Linq<U>;
  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  orderBy(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): Linq<T>;
  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  orderByDescending(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): Linq<T>;
  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  thenBy(keySelector: (key: T) => any): Linq<T>;
  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  thenByDescending(keySelector: (key: T) => any): Linq<T>;
  /**
   * Removes the first occurrence of a specific object from the Linq<T>.
   */
  remove(element: T): boolean;
  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  removeAll(predicate: PredicateType<T>): Linq<T>;
  /**
   * Removes the element at the specified index of the Linq<T>.
   */
  removeAt(index: number): void;
  /**
   * Reverses the order of the elements in the entire Linq<T>.
   */
  reverse(): Linq<T>;
  /**
   * Projects each element of a sequence into a new form.
   */
  select<TOut>(selector: (element: T, index: number) => TOut): Linq<TOut>;
  /**
   * Projects each element of a sequence to a Linq<any> and flattens the resulting sequences into one sequence.
   */
  selectMany<TOut extends Linq<any>>(selector: (element: T, index: number) => TOut): TOut;
  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  sequenceEqual(list: Linq<T>): boolean;
  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  single(predicate?: PredicateType<T>): T;
  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  singleOrDefault(predicate?: PredicateType<T>): T;
  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  skip(amount: number): Linq<T>;
  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  skipLast(amount: number): Linq<T>;
  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  skipWhile(predicate: PredicateType<T>): Linq<T>;
  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  sum(transform?: (value?: T, index?: number, list?: T[]) => number): number;
  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  take(amount: number): Linq<T>;
  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  takeLast(amount: number): Linq<T>;
  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  takeWhile(predicate: PredicateType<T>): Linq<T>;
  /**
   * Copies the elements of the Linq<T> to a new array.
   */
  toArray(): T[];
  /**
   * Creates a Dictionary<TKey, TValue> from a Linq<T> according to a specified key selector function.
   */
  toDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value?: (value: T) => TValue
  ): Linq<{
    Key: TKey;
    Value: T | TValue;
  }>;
  /**
   * Creates a Linq<T> from an Enumerable.Linq<T>.
   */
  toList(): Linq<T>;
  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  toLookup<TResult>(keySelector: (key: T) => string | number, elementSelector: (element: T) => TResult): TResult[];
  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  union(list: Linq<T>): Linq<T>;
  /**
   * Filters a sequence of values based on a predicate.
   */
  where(predicate: PredicateType<T>): Linq<T>;
  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  zip<U, TOut>(list: Linq<U>, result: (first: T, second: U) => TOut): Linq<TOut>;
  /**
   * clone deep object.
   */
  cloneDeep<T, Y>(param: any): T | Y;
}

export default Linq;
