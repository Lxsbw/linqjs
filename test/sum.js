var ageSum, Linq, parameters;

Linq = require('../src/index');

parameters = [
  { Age: 52, Name: '正一郎' },
  { Age: 28, Name: '清次郎' },
  { Age: 20, Name: '誠三郎' },
  { Age: 18, Name: '征史郎' }
];

ageSum = new Linq(parameters).Sum(x => x.Age);

console.log('ageSum:', ageSum);
