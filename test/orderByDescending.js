var Linq, orderedParameters, parameters;
Linq = require('../src/index');

parameters = [
  { ID: 0, Name: '正一郎' },
  { ID: 3, Name: '清次郎' },
  { ID: 2, Name: '誠三郎' },
  { ID: 5, Name: '征史郎' }
];

console.log('parameters:', parameters);

orderedParameters = new Linq(parameters).OrderByDescending(x => x.ID).ToArray();

console.log('parameters:', parameters);
console.log('orderedParameters:', orderedParameters);
