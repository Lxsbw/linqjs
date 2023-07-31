var dictionary, dictionary2, Linq, parameters;

require('../arr_init');

parameters = [
  { ID: 0, Age: 52, Name: '正一郎' },
  { ID: 8, Age: 28, Name: '清次郎' },
  { ID: 3, Age: 20, Name: '誠三郎' },
  { ID: 4, Age: 18, Name: '征史郎' }
];

dictionary = parameters.toDictionary(x => x.ID)//.toArray();

dictionary2 = parameters
  .toDictionary(function (value) {
    return { ID: value.ID, Name: value.Name };
  })
  .toArray();

// dictionary3  =  parameters.toDictionary \
//   ((value) -> value.ID, (value) -> value.Name).toArray()
console.log('dictionary:', dictionary);

console.log('dictionary2:', dictionary2);
