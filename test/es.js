
const Linq = require('../src/linq');

const Linq5 = require('../src/linqes5');


console.log('Linq:', Linq);
console.log('Linq5:', Linq5);

var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var reaultA = new Linq(numbers);
var reaultB = new Linq5(numbers);

console.log('reaultA:', reaultA);
console.log('reaultB:', reaultB);
