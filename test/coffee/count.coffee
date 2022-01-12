Linq =  require('../../src/coffee')

intArray    = [ 1, 5, 8, 12, 15, 16 ]
stringList  = ["正一郎", "清次郎", "誠三郎", "征史郎" ]


intCount    = new Linq(intArray).Count()
stringCount = new Linq(stringList).Count()

intCount2    = new Linq(intArray).Count( (value) -> value % 2 == 0 )
stringCount2 = new Linq(stringList).Count( (value) -> value.indexOf("三") >= 0 )

console.log 'intCount:', intCount
console.log 'stringCount:', stringCount
console.log 'intCount2:', intCount2
console.log 'stringCount2:', stringCount2
