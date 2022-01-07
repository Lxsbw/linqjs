// Generated by CoffeeScript 2.5.1
var intArray,
  intCount,
  intCount2,
  jslinq,
  stringCount,
  stringCount2,
  stringList;

jslinq = require('../linqjs/linq');

intArray = [1, 5, 8, 12, 15, 16];
stringList = ['正一郎', '清次郎', '誠三郎', '征史郎'];

parameters = [
  { bill: 1, box: 'one', sn: 'fruits0', status: 30 },
  { bill: 1, box: 'one', sn: 'fruits1', status: 40 },
  { bill: 1, box: 'one', sn: undefined, status: 0 },
  { bill: 1, box: 'two', status: 30 },
  { bill: 1, box: 'three', sn: '', status: 30 },
  { bill: 1, box: 'four', sn: 'fruits6', status: 0 },
  { bill: 1, box: 'five', sn: null, status: 40 }
];

parameters2 = [
  { bill: 1, box: 'nine', sn: 'fruits0', status: 30 },
  { bill: 1, box: 'ten', sn: 'fruits1', status: 40 }
];

intCount = jslinq(intArray).Count();
stringCount = jslinq(stringList).Count();
intCount2 = jslinq(intArray).Count(function (value) {
  return value % 2 === 0;
});
stringCount2 = jslinq(stringList).Count(function (value) {
  return value.indexOf('三') >= 0;
});

const Qty = jslinq(parameters).count((x) => x.sn && x.sn.length > 0);
const noQty = jslinq(parameters).where((x) => !x.sn);

console.log('intCount:', intCount);
console.log('stringCount:', stringCount);
console.log('intCount2:', intCount2);
console.log('stringCount2:', stringCount2);
console.log('Qty:', Qty);
console.log('noQty:', noQty);

jslinq(parameters).add(parameters2);
console.log(parameters);
