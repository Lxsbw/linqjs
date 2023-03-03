Linq =  require('../../src/coffee/linq')

dataA = [ 0, 1, 2, 3, 4 ]
dataB = [ 1.5, 1.3, 3.2 ]
dataC = [ "正一郎", "清次郎", "誠三郎", "征史郎" ]

# 偶数
dataA_F = new Linq(dataA).Where( (value) -> value % 2 == 0 ).ToArray()
# 小于2
dataB_F = new Linq(dataB).Where( (value) -> value < 2.0 ).ToArray()
# 长度小于5
dataC_F = new Linq(dataC).Where( (value) -> value.length < 5 ).ToArray()

console.log 'dataA_F:', dataA_F
console.log 'dataB_F:', dataB_F
console.log 'dataC_F:', dataC_F
