Linq = require '../../src/coffee/linq'

data = [
  { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
  { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
  { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
  # { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
  # { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
  # { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] },
]

# 分组
# console.log 'this:', new Linq(data)
result = new Linq(data).GroupBy((el) -> el.category)
# result = new Linq(data).GroupBy((el) -> el.id)
# result = new Linq(data).GroupBy((el) -> { id: el.id, category: el.category })

# 去重
# result = new Linq(data).DistinctBy((x) -> x.category).toArray()
# result = new Linq(data).DistinctBy((el) -> { id: el.id, category: el.category }).toArray()

console.log 'result:', result
