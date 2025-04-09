Linq = require '../../../src/coffee/linq'

dataA = [ 0, 1, 2, 3, 4 ]
dataB = [ 1.5, 1.3, 3.2 ]
dataC = [ "正一郎", "清次郎", "誠三郎", "征史郎" ]

# 偶数
dataA_F = new Linq(dataA).where( (value) -> value % 2 == 0 ).toArray()
# 小于2
dataB_F = new Linq(dataB).where( (value) -> value < 2.0 ).toArray()
# 长度小于5
dataC_F = new Linq(dataC).where( (value) -> value.length < 5 ).toArray()

console.log 'dataA_F:', dataA_F
console.log 'dataB_F:', dataB_F
console.log 'dataC_F:', dataC_F

console.log 'toList:', new Linq(dataC).toList()
