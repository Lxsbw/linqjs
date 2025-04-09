Linq = require '../../../src/coffee/linq'

data = [
  { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
  { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
  { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: null, countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: undefined, countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: '', countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: true, countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: false, countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: 'true', countries: ['Italy', 'Germany'] },
  { id: 2, name: 'two', category: 'false', countries: ['Italy', 'Germany'] },
  # { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
  # { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
  # { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] },
]

# 分组
# console.log 'this:', new Linq(data)
result = new Linq(data).groupBy((el) -> el.category)
resultMini = new Linq(data).groupByMini((el) -> el.category)
# result = new Linq(data).groupBy((el) -> el.id)
# result = new Linq(data).groupBy((el) -> { id: el.id, category: el.category })

console.log 'result:', result
console.log 'resultMini:', resultMini
