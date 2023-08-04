var data, Linq, result;

require('../arr_init');

data = [
  { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
  { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
  { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
  { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
  { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] }
];

// 去重
result1 = data.distinctBy(x => x.category); //;
result2 = data.distinctBy(el => {
  return { id: el.id, category: el.category };
})
;

console.log('result:', result1);
console.log('result:', result2);
