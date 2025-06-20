var numbers, reaultA, reaultB, reaultC;

require('../../../src/Array/linqArray');

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

reaultA = numbers.any(x => x % 2 === 0);

reaultB = numbers.any(x => x >= 10);

reaultC = numbers.any(x => x < 5);

console.log('reaultA:', reaultA);
console.log('reaultB:', reaultB);
console.log('reaultC:', reaultC);
