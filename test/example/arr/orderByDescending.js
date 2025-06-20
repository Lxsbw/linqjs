require('../../../src/Array/linqArray');

let parameters = [
  { ID: 0, Name: '正一郎' },
  { ID: 3, Name: '清次郎' },
  { ID: 2, Name: '誠三郎' },
  { ID: 5, Name: '征史郎' },
];

// console.log('parameters:', parameters);

let orderedParameters = parameters.orderByDescending(x => x.ID);

// console.log('global:', global.structuredClone === structuredClone);

// console.log('globalnull:', structuredClone(null));
// console.log('global123:', structuredClone(123));

console.log('parameters:', parameters);
console.log('orderedParameters:', orderedParameters);
