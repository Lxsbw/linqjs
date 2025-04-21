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

console.log()
list = new Linq [1, 2, 3]
console.log Object.prototype.toString.call list  # 输出: [object List]
for item in list                # 无效
  console.log "Item:", item

console.log()
for item from list  # CoffeeScript 不支持，但我们可以转换成 JS 来实现
  console.log 'Item:', item

console.log()
iterator = list[Symbol.iterator]()
while true
  { value, done } = iterator.next()
  break if done
  console.log 'Item:', value
