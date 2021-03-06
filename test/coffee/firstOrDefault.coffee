Linq =  require('../../src/coffee')

numbers = [ 1, 2, 3, 5, 7, 11 ]
result  = new Linq(numbers).First()
console.log 'result:', result
result  = new Linq(numbers).First( (value) -> value % 2 == 0 )
console.log 'result:', result

parameters = [{ ID: 5, Name: "正一郎" }
             { ID: 13, Name: "清次郎" }
             { ID: 25, Name: "誠三郎" }
             { ID: 42, Name: "征史郎" }]

result = new Linq(parameters).FirstOrDefault( (value) -> value.ID == 30 )
console.log 'result:', result
