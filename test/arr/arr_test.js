require('./arr_init');

parameters = [
  { ID: 5, Rate: 0.0, Name: '正一郎' },
  { ID: 13, Rate: 0.1, Name: '清次郎' },
  { ID: 25, Rate: 0.0, Name: '誠三郎' },
  { ID: 42, Rate: 0.3, Name: '征史郎' }
];
results = parameters.where(x => x.Rate > 0).select(value => value.Name);
console.log('results:', results);

numbers = [
  { Age: 0, Name: '正一郎' },
  { Age: 0.3, Name: '清次郎' },
  { Age: 0.5, Name: '誠三郎' },
  { Age: 0.8, Name: '征史郎' }
];

ageSumByNum = numbers.sum(x => x.Age);
ageDivByNum = numbers.average(x => x.Age);
console.log('ageSumByNum:', ageSumByNum);
console.log('ageDivByNum:', ageDivByNum);
