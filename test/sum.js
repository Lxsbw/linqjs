let ageSum, Linq, parameters, numbers;

Linq = require('../src/index');

parameters = [
  { Age: 52, Name: '正一郎' },
  { Age: 28, Name: '清次郎' },
  { Age: 20, Name: '誠三郎' },
  { Age: 18, Name: '征史郎' }
];

numbers = [
  { Age: 0.1, Name: '正一郎' },
  { Age: 0.3, Name: '清次郎' },
  { Age: 0.5, Name: '誠三郎' },
  { Age: 0.8, Name: '征史郎' }
];

ageSum = new Linq(parameters).Sum(x => x.Age);
ageSumByNum = new Linq(numbers).Sum(x => x.Age);
ageDivByNum = new Linq(numbers).Average(x => x.Age);

console.log('ageSum:', ageSum);
console.log('ageSumByNum:', ageSumByNum);
console.log('ageDivByNum:', ageDivByNum);
