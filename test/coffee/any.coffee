Linq =  require('../../src/coffee/linq')

numbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

reaultA = new Linq(numbers).Any( (value) -> value % 2 == 0 )
reaultB = new Linq(numbers).Any( (value) -> value >= 10 )
reaultC = new Linq(numbers).Any( (value) -> value < 5 )

console.log 'reaultA:', reaultA
console.log 'reaultB:', reaultB
console.log 'reaultC:', reaultC
