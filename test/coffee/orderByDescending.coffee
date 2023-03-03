Linq =  require('../../src/coffee/linq')

parameters = [
  { ID: 0, Name: "正一郎" }
  { ID: 3, Name: "清次郎" }
  { ID: 2, Name: "誠三郎" }
  { ID: 5, Name: "征史郎" }
]

orderedParameters = new Linq(parameters).OrderByDescending( (value) -> value.ID ).toArray()

console.log 'orderedParameters:', orderedParameters
