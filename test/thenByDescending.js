var Linq, orderByID, persons, persons2, persons3, thenByAge, thenByName;

Linq = require('../src/index');

persons = [
  { ID: 0, Age: 30, Name: 'A' },
  { ID: 1, Age: 25, Name: 'B' },
  { ID: 2, Age: 2, Name: 'G' },
  { ID: 2, Age: 18, Name: 'C' },
  { ID: 1, Age: 30, Name: 'D' },
  { ID: 1, Age: 25, Name: 'E' },
  { ID: 2, Age: 15, Name: 'F' }
];

orderByID = new Linq(persons).orderByDescending(x => x.ID).ToArray();

thenByAge = new Linq(persons)
  .orderByDescending(x => x.ID)
  .ThenBy(x => x.Age)
  .ToArray();

thenByName = new Linq(persons)
  .orderByDescending(x => x.ID)
  .ThenBy(x => x.Age)
  .ThenByDescending(x => x.Name)
  .ToArray();

console.log('orderByID:', orderByID);
console.log('thenByAge:', thenByAge);
console.log('thenByName:', thenByName);
console.log('persons:', persons);

intArray = [1, 5, 8, 12, 15, 16];
console.log('number:', new Linq(intArray).OrderByDescending(x => x).ToArray());
console.log('number:', intArray);
