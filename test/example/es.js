
const Linq = require('../../src/linq');

const Linq5 = require('../src/es5/linq');


console.log('Linq:', Linq);
console.log('Linq5:', Linq5);

// console.dir(Linq, { showHidden: true });
// console.dir(Linq5, { showHidden: true });

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var reaultA = new Linq(numbers);
var reaultB = new Linq5(numbers);

console.dir(reaultA, { showHidden: true });
console.dir(reaultB, { showHidden: true });


var persons = [
  { ID: 0, Age: 30, Name: 'A' },
  { ID: 1, Age: 25, Name: 'B' },
  { ID: 2, Age: 2, Name: 'G' },
  { ID: 2, Age: 18, Name: 'C' },
  { ID: 1, Age: 30, Name: 'D' },
  { ID: 1, Age: 25, Name: 'E' },
  { ID: 2, Age: 15, Name: 'F' }
];

var thenByName = new Linq5(persons)
  .orderByDescending(x => x.ID)
  .thenBy(x => x.Age)
  .thenByDescending(x => x.Name)
  .toArray();

console.log('thenByName:', thenByName);
