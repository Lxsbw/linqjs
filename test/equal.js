var Linq, parameters, results;

Linq = require('../src/linq');


const obj1 = { A: '1', B: '2', C: '3'};
const obj2 = { A: '1', B: '2', C: '3', D: '4'};
const obj3 = { A: '1', B: '2', C: '3', dt: new Date('2018-02-03') };
const obj4 = { A: '1', B: '2', C: '3', dt: new Date('2018-02-03') };
// console.log(new Linq().equals(obj1, obj2));
// console.log();
// console.log(new Linq().equals(new Date(), obj1));
// console.log();
// console.log(new Linq().equals({}, {}));
// console.log();
// console.log(new Linq().equals({}, {arr:'a'}));
// console.log();
// console.log(new Linq().equals({}, {arr:[]}));
// console.log();
// console.log(new Linq().equals(new Date(), new Date()));
// console.log();
// console.log(new Linq().equals(new Date('2018-02-03'), new Date('2018-02-04')));
// console.log();
// console.log(new Linq().equals(new Date('2018-02-03'), new Date('2018-02-03')));
// console.log();
// console.log(new Linq().equals(new Date('2018-02-03 12:10:11'), new Date('2018-02-03 12:10:11')));
// console.log();
// console.log(new Linq().equals(new Date('2018-02-03 12:10:11.110'), new Date('2018-02-03 12:10:11.110')));
// console.log();
console.log(new Linq().equals(new RegExp('abc', 'g'), new RegExp('abcd', 'g')));
console.log();
console.log(new Linq().equals(new RegExp('abc', 'g'), []));
console.log();
console.log(new Linq().equals(new RegExp('abc', 'g'), new Date('2018-02-03')));
console.log();
console.log(new Linq().equals([1], { 0: 1 }));
console.log();
// console.log(new Linq().equals(obj3, obj4));
// console.log();
// console.log(new Linq().equals([1], [1, 2]));
// console.log();
// console.log(new Linq().equals([1], [1]));
// console.log();
// console.log(new Linq().equals([], []));
// console.log();
console.log(new Linq().equals([], {}));
console.log();
// console.log(new Linq().equals([1], [1, ['ab', 'cd']]));
// console.log();
// console.log(new Linq().equals([1, ['ab', 'cd']], [1, ['ab', 'cd']]));
// console.log();
console.log(new Linq().equals(null, null));
console.log();
console.log(new Linq().equals(undefined, undefined));
console.log();
console.log(new Linq().equals(null, undefined));
console.log();
