var data, Linq, result;

Linq = require('../src/index');

data = [
  { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
  { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
  { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }
  // { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
  // { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
  // { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] }
];

// 分组
// console.log('this:', new Linq(data));
// // console.log('__proto__:', new Linq(data).__proto__);
// console.log('get:', Object.getOwnPropertyNames(new Linq(data).__proto__));
// console.log('__proto__ keys:', Object.keys(new Linq(data).__proto__));
result = new Linq(data).groupBy(el => el.category);
// result = new Linq(data).groupBy(el => el.category);
// result = new Linq(data).GroupBy((el) => {
//   return { id: el.id, category: el.category };
// });
// 定制化结果分组
// func = (x) => {
//   return { id: x.id, category: x.category };
// };
// result = new Linq(data).groupBy((el) => el.category, func);

// result = new Linq(data).ToLookup(el => el.category);

// 去重
// result = new Linq(data)
//   .distinctBy(x => x.category)
//   .toArray();
// result = new Linq(data)
//   .DistinctBy(el => {
//     return { id: el.id, category: el.category };
//   })
//   .ToArray();

// result.forEach(x => console.log(x.key.toString(), x.count));

console.log('result:', result);
// result.forEach((x) => console.log(x.elements));
// console.log('result:', JSON.stringify(result));
