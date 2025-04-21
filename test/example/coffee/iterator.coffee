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


# Linq实现了 Symbol.iterator：
# 这就让 pets 可以用于：
# 	•	for ... from pets
# 	•	[...pets]
# 	•	Array.from(pets)
# 	•	new Set(pets)
# 等 ES6 支持的 iterable 场景。


# 这段 CoffeeScript 写法完全没问题，前提是你：
# 	1.	使用 CoffeeScript 2.x 或更新版本（支持 ...spread 和 Symbol.iterator）
# 	2.	正确实现了迭代器接口（你已经做到了）
