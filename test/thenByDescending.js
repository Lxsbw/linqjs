// Generated by CoffeeScript 2.5.1
// jslinq =  require('../linqcs').jslinq
var jslinq, orderByID, persons, persons2, persons3, thenByAge, thenByName;

jslinq = require('../linqjs/linq');

persons = [
  { ID: 0, Age: 30, Name: 'A' },
  { ID: 1, Age: 25, Name: 'B' },
  { ID: 2, Age: 2, Name: 'G' },
  { ID: 2, Age: 18, Name: 'C' },
  { ID: 1, Age: 30, Name: 'D' },
  { ID: 1, Age: 25, Name: 'E' },
  { ID: 2, Age: 15, Name: 'F' }
];

orderByID = jslinq(persons)
  .orderByDescending(function (value) {
    return value.ID;
  })
  .ToArray();

thenByAge = jslinq(persons)
  .orderByDescending(function (value) {
    return value.ID;
  })
  .ThenBy(function (value) {
    return value.Age;
  })
  .ToArray();

thenByName = jslinq(persons)
  .orderByDescending(function (value) {
    return value.ID;
  })
  .ThenBy(function (value) {
    return value.Age;
  })
  .ThenByDescending(function (value) {
    return value.Name;
  })
  .ToArray();

console.log('orderByID:', orderByID);

console.log('thenByAge:', thenByAge);

console.log('thenByName:', thenByName);

// console.log 'persons:', persons
