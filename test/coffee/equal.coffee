Linq = require '../../src/coffee/linq'


obj1 = { A: '1', B: '2', C: '3'}
obj2 = { A: '1', B: '2', C: '3', D: '4'}
obj3 = { A: '1', B: '2', C: '3', dt: new Date('2018-02-03') }
obj4 = { A: '1', B: '2', C: '3', dt: new Date('2018-02-03') }
console.log(new Linq().equals(obj1, obj2))
console.log()
console.log(new Linq().equals(new Date(), obj1))
console.log()
console.log(new Linq().equals({}, {}))
console.log()
console.log(new Linq().equals({}, {arr:'a'}))
console.log()
console.log(new Linq().equals({}, {arr:[]}))
console.log()
console.log(new Linq().equals(new Date('2018-02-03'), new Date('2018-02-04')))
console.log()
console.log(new Linq().equals(new Date('2018-02-03'), new Date('2018-02-03')))
console.log()
console.log(new Linq().equals([1], [1, 2]))
console.log()
console.log(new Linq().equals([1], [1]))
console.log()
console.log(new Linq().equals(new RegExp('abc', 'g'), new RegExp('abcd', 'g')))
console.log()
console.log(new Linq().equals(obj3, obj4))
console.log()