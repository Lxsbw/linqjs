/**
 * Linq to JavaScript
 *
 * Documentation from Linq .NET specification (https://msdn.microsoft.com/en-us/library/system.linq.enumerable.aspx)
 *
 */

declare type PredicateType<T> = (value?: T, index?: number, list?: T[]) => boolean;
declare class Linq<T> {
  protected _elements: T[];
  /**
   * Defaults the elements of the list
   */
  constructor(elements?: T[]);
  /**
   * Adds an object to the end of the Linq<T>.
   */
  Add(element: T): void;
  /**
   * Appends an object to the end of the Linq<T>.
   */
  Append(element: T): void;
  /**
   * Add an object to the start of the Linq<T>.
   */
  Prepend(element: T): void;
  /**
   * Adds the elements of the specified collection to the end of the Linq<T>.
   */
  AddRange(elements: T[]): void;
  /**
   * Applies an accumulator function over a sequence.
   */
  Aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any;
  /**
   * Determines whether all elements of a sequence satisfy a condition.
   */
  All(predicate: PredicateType<T>): boolean;
  /**
   * Determines whether a sequence contains any elements.
   */
  Any(): boolean;
  Any(predicate: PredicateType<T>): boolean;
  /**
   * Computes the average of a sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Average(): number;
  Average(transform: (value?: T, index?: number, list?: T[]) => any): number;
  /**
   * Casts the elements of a sequence to the specified type.
   */
  Cast<U>(): Linq<U>;
  /**
   * Removes all elements from the Linq<T>.
   */
  Clear(): void;
  /**
   * Concatenates two sequences.
   */
  Concat(list: Linq<T>): Linq<T>;
  /**
   * Determines whether an element is in the Linq<T>.
   */
  Contains(element: T): boolean;
  /**
   * Returns the number of elements in a sequence.
   */
  Count(): number;
  Count(predicate: PredicateType<T>): number;
  /**
   * Returns the elements of the specified sequence or the type parameter's default value
   * in a singleton collection if the sequence is empty.
   */
  DefaultIfEmpty(defaultValue?: T): Linq<T>;
  /**
   * Returns distinct elements from a sequence by using the default equality comparer to compare values.
   */
  Distinct(): Linq<T>;
  /**
   * Returns distinct elements from a sequence according to specified key selector.
   */
  DistinctBy<TOut>(keySelector: (key: T) => TOut): Linq<T>;
  /**
   * Returns the element at a specified index in a sequence.
   */
  ElementAt(index: number): T;
  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   */
  ElementAtOrDefault(index: number): T | null;
  /**
   * Produces the set difference of two sequences by using the default equality comparer to compare values.
   */
  Except(source: Linq<T>): Linq<T>;
  /**
   * Returns the first element of a sequence.
   */
  First(): T;
  First(predicate: PredicateType<T>): T;
  /**
   * Returns the first element of a sequence, or a default value if the sequence contains no elements.
   */
  FirstOrDefault(): T;
  FirstOrDefault(predicate: PredicateType<T>): T;
  /**
   * Performs the specified action on each element of the Linq<T>.
   */
  ForEach(action: (value?: T, index?: number, list?: T[]) => any): void;
  /**
   * Groups the elements of a sequence according to a specified key selector function.
   */
  GroupBy<TOut, TResult = T>(
    grouper: (key: T) => TOut,
    mapper?: (element: T) => TResult
  ): {
    [key: string]: TResult[];
  };
  /**
   * Correlates the elements of two sequences based on equality of keys and groups the results.
   * The default equality comparer is used to compare keys.
   */
  GroupJoin<U, R>(list: Linq<U>, key1: (k: T) => any, key2: (k: U) => any, result: (first: T, second: Linq<U>) => R): Linq<R>;
  /**
   * Returns the index of the first occurence of an element in the List.
   */
  IndexOf(element: T): number;
  /**
   * Inserts an element into the Linq<T> at the specified index.
   */
  Insert(index: number, element: T): void | Error;
  /**
   * Produces the set intersection of two sequences by using the default equality comparer to compare values.
   */
  Intersect(source: Linq<T>): Linq<T>;
  /**
   * Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.
   */
  Join<U, R>(list: Linq<U>, key1: (key: T) => any, key2: (key: U) => any, result: (first: T, second: U) => R): Linq<R>;
  /**
   * Returns the last element of a sequence.
   */
  Last(): T;
  Last(predicate: PredicateType<T>): T;
  /**
   * Returns the last element of a sequence, or a default value if the sequence contains no elements.
   */
  LastOrDefault(): T;
  LastOrDefault(predicate: PredicateType<T>): T;
  /**
   * Returns the maximum value in a generic sequence.
   */
  Max(): number;
  Max(selector: (value: T, index: number, array: T[]) => number): number;
  /**
   * Returns the minimum value in a generic sequence.
   */
  Min(): number;
  Min(selector: (value: T, index: number, array: T[]) => number): number;
  /**
   * Filters the elements of a sequence based on a specified type.
   */
  OfType<U>(type: any): Linq<U>;
  /**
   * Sorts the elements of a sequence in ascending order according to a key.
   */
  OrderBy(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): Linq<T>;
  /**
   * Sorts the elements of a sequence in descending order according to a key.
   */
  OrderByDescending(keySelector: (key: T) => any, comparer?: (a: T, b: T) => number): Linq<T>;
  /**
   * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.
   */
  ThenBy(keySelector: (key: T) => any): Linq<T>;
  /**
   * Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.
   */
  ThenByDescending(keySelector: (key: T) => any): Linq<T>;
  /**
   * Removes the first occurrence of a specific object from the Linq<T>.
   */
  Remove(element: T): boolean;
  /**
   * Removes all the elements that match the conditions defined by the specified predicate.
   */
  RemoveAll(predicate: PredicateType<T>): Linq<T>;
  /**
   * Removes the element at the specified index of the Linq<T>.
   */
  RemoveAt(index: number): void;
  /**
   * Reverses the order of the elements in the entire Linq<T>.
   */
  Reverse(): Linq<T>;
  /**
   * Projects each element of a sequence into a new form.
   */
  Select<TOut>(selector: (element: T, index: number) => TOut): Linq<TOut>;
  /**
   * Projects each element of a sequence to a List<any> and flattens the resulting sequences into one sequence.
   */
  SelectMany<TOut extends Linq<any>>(selector: (element: T, index: number) => TOut): TOut;
  /**
   * Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.
   */
  SequenceEqual(list: Linq<T>): boolean;
  /**
   * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
   */
  Single(predicate?: PredicateType<T>): T;
  /**
   * Returns the only element of a sequence, or a default value if the sequence is empty;
   * this method throws an exception if there is more than one element in the sequence.
   */
  SingleOrDefault(predicate?: PredicateType<T>): T;
  /**
   * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
   */
  Skip(amount: number): Linq<T>;
  /**
   * Omit the last specified number of elements in a sequence and then returns the remaining elements.
   */
  SkipLast(amount: number): Linq<T>;
  /**
   * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
   */
  SkipWhile(predicate: PredicateType<T>): Linq<T>;
  /**
   * Computes the sum of the sequence of number values that are obtained by invoking
   * a transform function on each element of the input sequence.
   */
  Sum(): number;
  Sum(transform: (value?: T, index?: number, list?: T[]) => number): number;
  /**
   * Returns a specified number of contiguous elements from the start of a sequence.
   */
  Take(amount: number): Linq<T>;
  /**
   * Returns a specified number of contiguous elements from the end of a sequence.
   */
  TakeLast(amount: number): Linq<T>;
  /**
   * Returns elements from a sequence as long as a specified condition is true.
   */
  TakeWhile(predicate: PredicateType<T>): Linq<T>;
  /**
   * Copies the elements of the Linq<T> to a new array.
   */
  ToArray(): T[];
  /**
   * Creates a Dictionary<TKey, TValue> from a Linq<T> according to a specified key selector function.
   */
  ToDictionary<TKey>(key: (key: T) => TKey): Linq<{
    Key: TKey;
    Value: T;
  }>;
  ToDictionary<TKey, TValue>(
    key: (key: T) => TKey,
    value: (value: T) => TValue
  ): Linq<{
    Key: TKey;
    Value: T | TValue;
  }>;
  /**
   * Creates a Linq<T> from an Enumerable.Linq<T>.
   */
  ToList(): Linq<T>;
  /**
   * Creates a Lookup<TKey, TElement> from an IEnumerable<T> according to specified key selector and element selector functions.
   */
  ToLookup<TResult>(
    keySelector: (key: T) => string | number,
    elementSelector: (element: T) => TResult
  ): {
    [key: string]: TResult[];
  };
  /**
   * Produces the set union of two sequences by using the default equality comparer.
   */
  Union(list: Linq<T>): Linq<T>;
  /**
   * Filters a sequence of values based on a predicate.
   */
  Where(predicate: PredicateType<T>): Linq<T>;
  /**
   * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
   */
  Zip<U, TOut>(list: Linq<U>, result: (first: T, second: U) => TOut): Linq<TOut>;
}

export = Linq;
