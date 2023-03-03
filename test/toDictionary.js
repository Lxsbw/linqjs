var dictionary, dictionary2, Linq, parameters;

Linq = require('../src/linq');

parameters = [
  { ID: 0, Age: 52, Name: '正一郎' },
  { ID: 8, Age: 28, Name: '清次郎' },
  { ID: 3, Age: 20, Name: '誠三郎' },
  { ID: 4, Age: 18, Name: '征史郎' }
];

dictionary = new Linq(parameters).ToDictionary(x => x.ID).toArray();

dictionary2 = new Linq(parameters)
  .ToDictionary(function (value) {
    return { ID: value.ID, Name: value.Name };
  })
  .toArray();

// dictionary3  =  new Linq(parameters).ToDictionary \
//   ((value) -> value.ID, (value) -> value.Name).toArray()
console.log('dictionary:', dictionary);

console.log('dictionary2:', dictionary2);
