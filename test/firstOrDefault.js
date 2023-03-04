var Linq, numbers, parameters, result;

Linq = require('../src/linq');

numbers = [1, 2, 3, 5, 7, 11];

result = new Linq(numbers).first();
console.log('result:', result);

result = new Linq(numbers).first(x => x % 2 === 0);
console.log('result:', result);

parameters = [
  { ID: 5, Name: '正一郎' },
  { ID: 13, Name: '清次郎' },
  { ID: 25, Name: '誠三郎' },
  { ID: 42, Name: '征史郎' }
];
result = new Linq(parameters).firstOrDefault(x => x.ID === 30);
console.log('result:', result);
