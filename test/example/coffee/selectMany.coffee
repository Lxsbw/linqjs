Linq = require '../../../src/coffee/linq'

parameters = [
  { Name: "正一郎", Numbers: [ 1, 2, 3 ] }
  { Name: "清次郎", Numbers: [ 1, 3, 5 ] }
  { Name: "誠三郎", Numbers: [ 2, 4, 6 ] }
  { Name: "征史郎", Numbers: [ 9, 8, 7 ] }
]

results = new Linq(parameters).selectMany((value) -> new Linq(value.Numbers)).toArray()
# results2 = new Linq(parameters).selectMany((value) -> value.Name).toArray()

console.log 'results:', results
console.log 'results:', results.length

# console.log 'results2:', results2
