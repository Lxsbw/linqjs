Linq = require '../../../src/coffee/linq'

pets = new Linq([
  { Age: 10, Name: 'Barley' },
  { Age: 4, Name: 'Boots' },
  { Age: 6, Name: 'Bissy' },
])
for pet from pets
  console.log('pet:', pet)

console.log()
petsCopy = [...pets]
for pet in petsCopy
  console.log('petsCopy:', pet)

# console.log()
# pets.elementAt(1).Name = 'Boots2'
# for pet from pets
#   console.log('pet:', pet)
# for pet in petsCopy
#   console.log('petsCopy:', pet)

console.log()
petsss = new Linq([])
console.log(petsss.toString() is '[object List]')
console.log("#{petsss}" is '[object List]')
