Linq =  require('../../src/coffee/linq')

intArray    = [ 1, 5, 8, 12, 15, 16 ]
stringList  = ["正一郎", "清次郎", "誠三郎", "征史郎" ]


intCount    = new Linq(intArray).count()
stringCount = new Linq(stringList).count()

intCount2    = new Linq(intArray).count( (value) -> value % 2 == 0 )
stringCount2 = new Linq(stringList).count( (value) -> value.indexOf("三") >= 0 )

console.log 'intCount:', intCount
console.log 'stringCount:', stringCount
console.log 'intCount2:', intCount2
console.log 'stringCount2:', stringCount2
