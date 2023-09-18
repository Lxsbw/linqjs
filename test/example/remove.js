var Linq, numbers;

Linq = require('../../src/linq');

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

new Linq(numbers).remove(6);

console.log(numbers);

console.log(numbers.length);
