Linq = require '../../src/coffee/linq'

numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

console.log numbers
console.log numbers.length

console.log new Linq(numbers).Remove(6)

console.log numbers
console.log numbers.length
