Linq = require '../../src/coffee/linq'

dataA = [ 0, 1, 3, 3, 2 ]
dataB = [ 1.5, 1.5, 1.5, 1.5 ]
dataC = [ "征史郎", "征四郎", "征史郎", "正史郎" ]

dataA_D = new Linq(dataA).distinct().toArray()
dataB_D = new Linq(dataB).distinct().toArray()
dataC_D = new Linq(dataC).distinct().toArray()

console.log 'dataA_D:', dataA_D
console.log 'dataB_D:', dataB_D
console.log 'dataC_D:', dataC_D
