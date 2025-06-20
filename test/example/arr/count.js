var intArray, intCount, intCount2, Linq, stringCount, stringCount2, stringList;

require('../../../src/Array/linqArray');

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

intCount = intArray.count();
stringCount = stringList.count();
intCount2 = intArray.count(x => x % 2 === 0);
stringCount2 = stringList.count(x => x.indexOf('三') >= 0);

const Qty = parameters.count(x => x.sn && x.sn.length > 0);
const noQty = parameters.where(x => !x.sn);

console.log('intCount:', intCount);
console.log('stringCount:', stringCount);
console.log('intCount2:', intCount2);
console.log('stringCount2:', stringCount2);
console.log('Qty:', Qty);
// console.log('noQty:', noQty);

// parameters.add(parameters2);
console.log(parameters);
