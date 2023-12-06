Linq =  require('../../src/coffee/linq')

parameters = [
  { Age: 52, Name: "正一郎" }
  { Age: 28, Name: "清次郎" }
  { Age: 20, Name: "誠三郎" }
  { Age: 18, Name: "征史郎" }
]

numbers = [
  { Age: 0, Name: '正一郎' }
  { Age: 0.3, Name: '清次郎' }
  { Age: 0.5, Name: '誠三郎' }
  { Age: 0.8, Name: '征史郎' }
]

ageSum = new Linq(parameters).sum( (value) -> value.Age )
ageSumByNum = new Linq(numbers).sum((x) -> x.Age)
ageDivByNum = new Linq(numbers).average((x) -> x.Age)

console.log 'ageSum:', ageSum
console.log 'ageSumByNum:', ageSumByNum
console.log 'ageDivByNum:', ageDivByNum

# entity = new Linq(parameters)
# console.log entity
# console.dir entity.__proto__, { showHidden: true }
# console.dir Linq.prototype, { showHidden: true }
# console.log entity.__proto__.hasOwnProperty('DistinctMap')
# console.log entity.__proto__ is Linq.prototype
