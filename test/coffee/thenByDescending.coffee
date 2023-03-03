Linq = require '../../src/coffee/linq/linq'

persons = [
  { ID: 0, Age: 30, Name: "A" }
  { ID: 1, Age: 25, Name: "B" }
  { ID: 2, Age: 18, Name: "C" }
  { ID: 1, Age: 30, Name: "D" }
  { ID: 1, Age: 25, Name: "E" }
  { ID: 2, Age: 15, Name: "F" }
]

orderByID  = new Linq(persons).orderBy((value) -> value.ID).toArray()
thenByAge  = new Linq(persons).orderBy((value) -> value.ID).thenBy((value) -> value.Age).toArray()
thenByName = new Linq(persons).orderBy((value) -> value.ID).thenBy((value) -> value.Age).thenByDescending((value) -> value.Name).toArray()

console.log 'orderByID:', orderByID
console.log 'thenByAge:', thenByAge
console.log 'thenByName:', thenByName

console.log 'persons:', persons

intArray = [ 1, 5, 8, 12, 15, 16 ]
console.log 'number:', new Linq(intArray).orderByDescending((x) -> x).toArray()
console.log 'number:', intArray
