Linq = require '../src/coffee/linq'

describe 'Group 1:', () ->
  test 'Iterator', () ->
    pets = new Linq([
      { Age: 10, Name: 'Barley' }
      { Age: 4, Name: 'Boots' }
      { Age: 6, Name: 'Bissy' }
    ])
    for pet from pets
      expect(pet.Name.startsWith 'B').toBeTruthy()
    return

  test 'Spread', () ->
    pets = new Linq([
      { Age: 10, Name: 'Barley' }
      { Age: 4, Name: 'Boots' }
      { Age: 6, Name: 'Bissy' }
    ])
    petsCopy = [...pets]
    for pet in petsCopy
      expect(pet.Name.startsWith 'B').toBeTruthy()
    return

  test 'ArrayFrom', () ->
    pets = new Linq([
      { Age: 10, Name: 'Barley' }
      { Age: 4, Name: 'Boots' }
      { Age: 6, Name: 'Bissy' }
    ])
    petsFrom = Array.from(pets)
    for pet in petsFrom
      expect(pet.Name.startsWith 'B').toBeTruthy()
    return

  test 'toSet', () ->
    pets = new Linq([
      { Age: 10, Name: 'Barley' }
      { Age: 4, Name: 'Boots' }
      { Age: 6, Name: 'Bissy' }
    ])
    petsSet = new Set(pets)
    expect(petsSet.size).toBe(3)

  test 'toStringTag', () ->
    pets = new Linq []
    expect(pets.toString() is '[object List]').toBeTruthy()
    expect("#{pets}" is '[object List]').toBeTruthy()

  test 'Add', () ->
    list = new Linq []
    list.add('hey')
    expect(list.first()).toBe('hey')

  test 'Append', () ->
    list = new Linq []
    list.addRange ['hey', "what's", 'up']
    list.append('there')
    expect(list.last()).toBe('there')

  test 'Prepend', () ->
    list = new Linq []
    list.addRange ['hey', "what's", 'up']
    list.prepend('there')
    expect(list.first()).toBe('there')

  test 'AddRange', () ->
    list = new Linq []
    list.addRange ['hey', "what's", 'up']
    expect(list.toArray()).toEqual(['hey', "what's", 'up'])

  test 'Aggregate', () ->
    sentence = 'the quick brown fox jumps over the lazy dog'
    reversed = 'dog lazy the over jumps fox brown quick the '
    words = new Linq(sentence.split(' '))
    expect(words.aggregate(
      (workingSentence, next) ->
        next + ' ' + workingSentence
      ''
    )).toBe(reversed)
    expect(new Linq([1, 2, 3, 4, 5]).aggregate(
      (item, num) ->
        num + item
      0
    )).toBe(15)

  test 'All', () ->
    parameters = [
      { bill: 1, box: 'one', sn: 'fruits0', status: 30 },
      { bill: 1, box: 'one', sn: 'fruits1', status: 40 },
      { bill: 1, box: 'one', sn: 'fruits2', status: 0 },
      { bill: 1, box: 'two', sn: 'fruits3', status: 30 },
      { bill: 1, box: 'three', sn: 'fruits4', status: 30 },
      { bill: 1, box: 'four', sn: 'fruits4', status: 0 },
      { bill: 1, box: 'five', sn: 'fruits5', status: 40 },
    ]

    boxs = new Linq(parameters).select((x) -> x.box).distinct()
    res = boxs.count((x) -> new Linq(parameters).where((p) -> p.box is x).all((p) -> [30, 40].includes(p.status)))
    expect(res).toBe(3)

  test 'Any', () ->
    fruits = new Linq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    expect(fruits.any((x) -> x % 2 is 0)).toBeTruthy()
    expect(fruits.any((x) -> x >= 10)).toBeFalsy()
    expect(fruits.any((x) -> x < 5)).toBeTruthy()
    expect(fruits.any()).toBeTruthy()

  test 'Average', () ->
    numbers = [
      { Age: 0, Name: '正一郎' },
      { Age: 0.3, Name: '清次郎' },
      { Age: 0.5, Name: '誠三郎' },
      { Age: 0.8, Name: '征史郎' },
    ]

    numbers10 = [
      { Age: 0, Name: '正一郎' },
      { Age: 0.6, Name: '清次郎' },
      { Age: 0.09, Name: '誠三郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
      { Age: 0, Name: '征史郎' },
    ]
    # expect(new Linq(numbers).average((x) -> x.Age)).toBe(0.4)
    expect(new Linq(numbers).average((x) -> x.Age)).toBeCloseTo(0.4)
    expect(new Linq(numbers10).average((x) -> x.Age)).toBeCloseTo(0.069)

  test 'Cast', () ->
    pets = new Linq([
      { Age: 8, Name: 'Barley', Vaccinated: true },
      { Age: 1, Name: 'Whiskers', Vaccinated: false },
    ])

    dogs = pets.cast()

    # t.true(typeof dogs.first().Speak is 'function')
    expect(typeof dogs.first().Speak is 'function').toBeFalsy()
    # t.is(dogs.first().Speak(), 'Bark')
    # t.true(typeof dogs.last().Speak is 'undefined')

  test 'Clear', () ->
    pets = new Linq([
      { Age: 8, Name: 'Barley', Vaccinated: true },
      { Age: 1, Name: 'Whiskers', Vaccinated: false },
    ])

    expect(pets.count()).toBe(2)
    pets.clear()
    expect(pets.count()).toBe(0)

  test 'Concat', () ->
    cats = new Linq([
      { Age: 8, Name: 'Barley' },
      { Age: 4, Name: 'Boots' },
      { Age: 1, Name: 'Whiskers' },
    ])
    dogs = new Linq([
      { Age: 3, Name: 'Bounder' },
      { Age: 14, Name: 'Snoopy' },
      { Age: 9, Name: 'Fido' },
    ])
    expected = ['Barley', 'Boots', 'Whiskers', 'Bounder', 'Snoopy', 'Fido']
    expect(
      cats
        .select((cat) -> cat.Name)
        .concat(dogs.select((dog) -> dog.Name))
        .toArray()
    ).toEqual(expected)

  test 'Contains', () ->
    fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'])
    expect(fruits.contains('mango')).toBeTruthy()

  test 'Count', () ->
    fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'])
    intArray = [1, 5, 8, 12, 15, 16]
    stringList = ['正一郎', '清次郎', '誠三郎', '征史郎']
    parameters = [
      { bill: 1, box: 'one', sn: 'fruits0', status: 30 },
      { bill: 1, box: 'one', sn: 'fruits1', status: 40 },
      { bill: 1, box: 'one', sn: undefined, status: 0 },
      { bill: 1, box: 'two', status: 30 },
      { bill: 1, box: 'three', sn: '', status: 30 },
      { bill: 1, box: 'four', sn: 'fruits6', status: 0 },
      { bill: 1, box: 'five', sn: null, status: 40 },
    ]

    expect(fruits.count()).toBe(6)
    expect(fruits.count((x) -> x.length > 5)).toBe(3)

    expect(new Linq(intArray).count()).toBe(6)
    expect(new Linq(stringList).count()).toBe(4)
    expect(new Linq(intArray).count((x) -> x % 2 is 0)).toBe(3)
    expect(new Linq(stringList).count((x) -> x.indexOf('三') >= 0)).toBe(1)
    expect(new Linq(parameters).count((x) -> x.sn && x.sn.length > 0)).toBe(3)

  test 'DefaultIfEmpty', () ->
    pets = new Linq([
      { Age: 8, Name: 'Barley' },
      { Age: 4, Name: 'Boots' },
      { Age: 1, Name: 'Whiskers' },
    ])
    expect(
      pets
        .defaultIfEmpty()
        .select((pet) -> pet.Name)
        .toArray()
    ).toEqual(['Barley', 'Boots', 'Whiskers'])
    numbers = new Linq()
    expect(numbers.defaultIfEmpty(0).toArray()).toEqual([0])

  test 'Distinct', () ->
    dataA = [0, 1, 3, 3, 2]
    dataB = [1.5, 1.5, 1.5, 1.5]
    dataC = ['征史郎', '征四郎', '征史郎', '正史郎']
    parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '正一郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
    ]
    parametersSpecial = [
      { ID: 5, Rate: 0.0, Name: '正一郎', date: new Date('2018-02-03'), regData: new RegExp('abc', 'g') },
      { ID: 13, Rate: 0.1, Name: '清次郎', date: new Date('2018-02-04'), regData: new RegExp('123', 'g') },
      { ID: 25, Rate: 0.0, Name: '正一郎', date: null, regData: null },
      { ID: 42, Rate: 0.3, Name: '征史郎', date: new Date('2018-02-03'), regData: new RegExp('abc', 'g') },
    ]

    parametersObj = [
      { ID: 5, Rate: 0.0, Infos: { Name: '正一郎' } },
      { ID: 13, Rate: 0.1, Infos: { Name: '清次郎', Other: '1', SubInfo: [1, 2, 3] } },
      { ID: 13, Rate: 0.1, Infos: { Name: '清次郎', Other: '1', SubInfo: [1, 2, 3] } },
      { ID: 25, Rate: 0.0, Infos: { Name: '正一郎' } },
      { ID: 42, Rate: 0.3, Infos: { Name: '征史郎' } },
      { ID: 42, Rate: 0.3, Infos: new Date('2018-02-03') },
    ]

    dataA_D = new Linq(dataA).distinct().toArray()
    dataB_D = new Linq(dataB).distinct().toArray()
    dataC_D = new Linq(dataC).distinct().toArray()
    dataC_E = new Linq(parameters)
      .select((x) -> x.Name)
      .distinct()
      .toArray()
    dataC_F = new Linq(parametersSpecial)
      .select((x) -> x.date)
      .distinct()
      .toArray()
    dataC_G = new Linq(parametersSpecial)
      .select((x) -> x.regData)
      .distinct()
      .toArray()
    dataC_H = new Linq(parametersObj)
      .select((x) -> x.Infos)
      .distinct()
      .toArray()

    expect(dataA_D).toEqual([0, 1, 3, 2])
    expect(dataB_D).toEqual([1.5])
    expect(dataC_D).toEqual(['征史郎', '征四郎', '正史郎'])
    expect(dataC_E).toEqual(['正一郎', '清次郎', '征史郎'])

    expect(dataC_F).toEqual([new Date('2018-02-03'), new Date('2018-02-04'), null])
    expect(dataC_G).toEqual([new RegExp('abc', 'g'), new RegExp('123', 'g'), null])
    expect(dataC_H).toEqual([{ Name: '正一郎' }, { Name: '清次郎', Other: '1', SubInfo: [1, 2, 3] }, { Name: '征史郎' }, new Date('2018-02-03')])

  test 'DistinctBy', () ->
    data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
    ]

    data2 = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
      { id: 4, name: 'four', category: 1, countries: ['Japan'] },
      { id: 4, name: 'four', category: true, countries: ['Japan'] },
    ]

    # 去重
    result1 = new Linq(data).distinctBy((x) -> x.category).toArray()
    result2 = new Linq(data)
      .distinctBy((el) ->
        return { id: el.id, category: el.category }
      )
      .toArray()

    expect(result1).toEqual([
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
    ])
    expect(result2).toEqual([
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
    ])

    result3 = new Linq(data2).distinctBy((x) -> x.category).toArray()
    expect(result3).toEqual([
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 4, name: 'four', category: 1, countries: ['Japan'] },
      { id: 4, name: 'four', category: true, countries: ['Japan'] },
    ])

  test 'DistinctMap', () ->
    dataA = [0, 1, 3, 3, 2]
    parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '正一郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
      { ID: 19, Rate: 0.1, Name: '清次郎' },
      { ID: 45, Rate: 0.3, Name: '征史郎' },
      { ID: 26, Rate: 0.0, Name: '正一郎' },
      { ID: 27, Rate: 0.0, Name: '正二郎' },
    ]

    dataC_F = new Linq(parameters).distinctMap((x) -> x.Name).toArray()
    dataC_G = new Linq(parameters)
      .distinctMap((x) ->
        return { Name: x.Name }
      )
      .toArray()
    dataC_H = new Linq(dataA).distinctMap().toArray()

    expect(dataC_F).toEqual(['正一郎', '清次郎', '征史郎', '正二郎'])
    expect(dataC_G).toEqual([{ Name: '正一郎' }, { Name: '清次郎' }, { Name: '征史郎' }, { Name: '正二郎' }])
    expect(dataC_H).toEqual([0, 1, 3, 2])

  test 'ElementAt', () ->
    a = new Linq(['hey', 'hola', 'que', 'tal'])
    expect(a.elementAt(0)).toBe('hey')
    expect(() -> a.elementAt(4)).toThrow('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.')
    expect(() -> a.elementAt(-1)).toThrow(/ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./)

  test 'ElementAtOrDefault', () ->
    a = new Linq(['hey', 'hola', 'que', 'tal'])
    b = new Linq([2, 1, 0, -1, -2])
    expect(a.elementAtOrDefault(0)).toBe('hey')
    expect(b.elementAtOrDefault(2)).toBe(0)
    expect(a.elementAtOrDefault(4)).toBeNull()
    # expect(a.elementAtOrDefault(4)).toBeUndefined()

  test 'Except', () ->
    numbers1 = new Linq([2.0, 2.1, 2.2, 2.3, 2.4, 2.5])
    numbers2 = new Linq([2.2, 2.3])
    expect(numbers1.except(numbers2).toArray()).toEqual([2, 2.1, 2.4, 2.5]) # 差集

describe 'Group 2:', () ->
  test 'First', () ->
    numbers = [1, 2, 3, 5, 7, 11]

    expect(new Linq(numbers).first()).toBe(1)
    expect(new Linq(numbers).first((x) -> x % 2 is 0)).toBe(2)
    expect(() -> new Linq().first()).toThrow(/InvalidOperationException: The source sequence is empty./)

  test 'FirstOrDefault', () ->
    parameters = [
      { ID: 5, Name: '正一郎' },
      { ID: 13, Name: '清次郎' },
      { ID: 25, Name: '誠三郎' },
      { ID: 42, Name: '征史郎' },
    ]
    expect(new Linq(parameters).firstOrDefault((x) -> x.ID is 30)).toBeUndefined()
    expect(new Linq(parameters).firstOrDefault((x) -> x.ID is 13)).toEqual({ ID: 13, Name: '清次郎' })

  test 'ForEach', () ->
    names = new Linq(['Bruce', 'Alfred', 'Tim', 'Richard'])
    test = ''
    names.forEach((x, i) -> (test += "#{x} #{i} "))
    expect(test).toBe('Bruce 0 Alfred 1 Tim 2 Richard 3 ')

  test 'GroupBy', () ->
    data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      # { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      # { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
      # { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] }
    ]
    expect(new Linq(data).groupBy((el) -> el.category)).toEqual([
      {
        key: 'fruits',
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: 'vegetables', count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },
    ])

    expect(
      new Linq(data).groupBy((el) ->
        return { id: el.id, category: el.category }
      )
    ).toEqual([
      {
        key: { id: 1, category: 'fruits' },
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: { id: 2, category: 'vegetables' }, count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },
    ])

    dataManyType = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: null, countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: undefined, countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: '', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: ' ', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: '  ', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: true, countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: false, countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: 'true', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: 'false', countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: [1, 2], countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: [2, 1], countries: ['Italy', 'Germany'] },
      { id: 2, name: 'two', category: [1, 2], countries: ['Italy', 'Germany'] },
    ]
    expect(new Linq(dataManyType).groupBy((el) -> el.category)).toEqual([
      {
        key: 'fruits',
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: 'vegetables', count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },

      { key: null, count: 1, elements: [{ id: 2, name: 'two', category: null, countries: ['Italy', 'Germany'] }] },
      {
        key: undefined,
        count: 2,
        elements: [
          { id: 2, name: 'two', category: undefined, countries: ['Italy', 'Germany'] },
          { id: 2, name: 'two', countries: ['Italy', 'Germany'] },
        ],
      },
      { key: '', count: 1, elements: [{ id: 2, name: 'two', category: '', countries: ['Italy', 'Germany'] }] },
      { key: ' ', count: 1, elements: [{ id: 2, name: 'two', category: ' ', countries: ['Italy', 'Germany'] }] },
      { key: '  ', count: 1, elements: [{ id: 2, name: 'two', category: '  ', countries: ['Italy', 'Germany'] }] },
      { key: true, count: 1, elements: [{ id: 2, name: 'two', category: true, countries: ['Italy', 'Germany'] }] },
      { key: false, count: 1, elements: [{ id: 2, name: 'two', category: false, countries: ['Italy', 'Germany'] }] },
      { key: 'true', count: 1, elements: [{ id: 2, name: 'two', category: 'true', countries: ['Italy', 'Germany'] }] },
      { key: 'false', count: 1, elements: [{ id: 2, name: 'two', category: 'false', countries: ['Italy', 'Germany'] }] },
      {
        key: [1, 2],
        count: 2,
        elements: [
          { id: 2, name: 'two', category: [1, 2], countries: ['Italy', 'Germany'] },
          { id: 2, name: 'two', category: [1, 2], countries: ['Italy', 'Germany'] },
        ],
      },
      { key: [2, 1], count: 1, elements: [{ id: 2, name: 'two', category: [2, 1], countries: ['Italy', 'Germany'] }] },
    ])

    dataMany = {
      ZWMS_WERKS: '1000',
      ZWMS_MATNR: '02312SCU-NFA01',
      ZWMS_KCLX: '02',
      ZWMS_KCSL: 7,
      ZWMS_ZYSL: 2,
      ZWMS_LGORT: 'BJ41',
      ZWMS_NUMBE: 'Z2000156365',
      ZWMS_CONTAC: '1Y01032503120R',
      ZWMS_KCBJ: 'Z',
    }
    list = []
    for index in [1..200000]
      ent = JSON.parse(JSON.stringify(dataMany))
      ent.id = (index + 1).toString()
      list.push(ent)

    ent = JSON.parse(JSON.stringify(dataMany))
    ent.id = '200000'
    list.push(ent)

    expect(new Linq(list).count()).toBe(200001)
    expect(new Linq(list).groupBy((el) -> el.id).length).toBe(200000)

  test 'groupByMini', () ->
    data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      # { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      # { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
      # { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] }
    ]
    expect(new Linq(data).groupByMini((el) -> el.category)).toEqual([
      {
        key: 'fruits',
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: 'vegetables', count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },
    ])

    expect(
      new Linq(data).groupByMini((el) ->
        return { id: el.id, category: el.category }
      )
    ).toEqual([
      {
        key: { id: 1, category: 'fruits' },
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: { id: 2, category: 'vegetables' }, count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },
    ])

  test 'GroupJoin', () ->
    magnus = { Name: 'Hedlund, Magnus' }
    terry = { Name: 'Adams, Terry' }
    charlotte = { Name: 'Weiss, Charlotte' }

    barley = { Name: 'Barley', Owner: terry }
    boots = { Name: 'Boots', Owner: terry }
    whiskers = { Name: 'Whiskers', Owner: charlotte }
    daisy = { Name: 'Daisy', Owner: magnus }

    people = new Linq([magnus, terry, charlotte])
    pets = new Linq([barley, boots, whiskers, daisy])

    # create a list where each element is an anonymous
    # type that contains a person's name and
    # a collection of names of the pets they own.
    query = people.groupJoin(
      pets,
      (person) -> person,
      (pet) -> pet.Owner,
      (person, petCollection) -> ({
        OwnerName: person.Name,
        Pets: petCollection.select((pet) -> pet.Name),
      })
    )
    expected = ['Hedlund, Magnus: Daisy', 'Adams, Terry: Barley,Boots', 'Weiss, Charlotte: Whiskers']
    expect(query.select((obj) -> "#{obj.OwnerName}: #{obj.Pets.toArray()}").toArray()).toEqual(expected)

  test 'IndexOf', () ->
    fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'])

    barley = { Age: 8, Name: 'Barley', Vaccinated: true }
    boots = { Age: 4, Name: 'Boots', Vaccinated: false }
    whiskers = { Age: 1, Name: 'Whiskers', Vaccinated: false }
    pets = new Linq([barley, boots, whiskers])

    expect(fruits.indexOf('orange')).toBe(3)
    expect(fruits.indexOf('strawberry')).toBeLessThanOrEqual(-1)
    expect(pets.indexOf(boots)).toBe(1)

  test 'Insert', () ->
    pets = new Linq([
      { Age: 10, Name: 'Barley' },
      { Age: 4, Name: 'Boots' },
      { Age: 6, Name: 'Whiskers' },
    ])

    newPet = { Age: 12, Name: 'Max' }

    pets.insert(0, newPet)
    pets.insert(pets.count(), newPet)

    expect(pets.first()).toEqual(newPet)
    expect(pets.last()).toEqual(newPet)
    expect(() -> pets.insert(-1, newPet)).toThrow(/Index is out of range./)
    expect(() -> pets.insert(pets.count() + 1, newPet)).toThrow(/Index is out of range./)

  test 'Intersect', () ->
    id1 = new Linq([44, 26, 92, 30, 71, 38])
    id2 = new Linq([39, 59, 83, 47, 26, 4, 30])
    expect(id1.intersect(id2).toArray()).toEqual([26, 30]) # 交集
    expect(id1.intersect(id2).sum((x) -> x)).toBe(56)

  test 'Join', () ->
    persons = [
      { CityID: 1, Name: 'ABC' },
      { CityID: 1, Name: 'EFG' },
      { CityID: 2, Name: 'HIJ' },
      { CityID: 3, Name: 'KLM' },
      { CityID: 3, Name: 'NOP' },
      { CityID: 4, Name: 'QRS' },
      { CityID: 5, Name: 'TUV' },
    ]
    cities = [
      { ID: 1, Name: 'Guangzhou' },
      { ID: 2, Name: 'Shenzhen' },
      { ID: 3, Name: 'Beijing' },
      { ID: 4, Name: 'Shanghai' },
    ]

    result = new Linq(persons)
      .join(
        new Linq(cities),
        (p) -> p.CityID,
        (c) -> c.ID,
        (p, c) ->
          return { CityID: c.ID, PersonName: p.Name, CityName: c.Name }
      )
      .toArray()
    expect(result).toEqual([
      { CityID: 1, PersonName: 'ABC', CityName: 'Guangzhou' },
      { CityID: 1, PersonName: 'EFG', CityName: 'Guangzhou' },
      { CityID: 2, PersonName: 'HIJ', CityName: 'Shenzhen' },
      { CityID: 3, PersonName: 'KLM', CityName: 'Beijing' },
      { CityID: 3, PersonName: 'NOP', CityName: 'Beijing' },
      { CityID: 4, PersonName: 'QRS', CityName: 'Shanghai' },
    ])

  test 'Last', () ->
    expect(new Linq(['hey', 'hola', 'que', 'tal']).last()).toBe('tal')
    expect(new Linq([1, 2, 3, 4, 5]).last((x) -> x > 2)).toBe(5)
    expect(() -> new Linq().last()).toThrow(/InvalidOperationException: The source sequence is empty./)

  test 'LastOrDefault', () ->
    expect(new Linq(['hey', 'hola', 'que', 'tal']).lastOrDefault()).toBe('tal')
    expect(new Linq().lastOrDefault()).toBeUndefined()

  test 'Max', () ->
    parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ]

    expect(new Linq(parameters).max((x) -> x.Age)).toBe(52)
    expect(new Linq([52, 28, 20, 18]).max()).toBe(52)

  test 'Min', () ->
    parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ]

    expect(new Linq(parameters).min((x) -> x.Age)).toBe(18)
    expect(new Linq([52, 28, 20, 18]).min()).toBe(18)

  test 'OfType', () ->
    pets = new Linq([
      { Age: 8, Name: 'Barley', Vaccinated: true },
      { Age: 1, Name: 'Whiskers', Vaccinated: false },
    ])
    anyArray = new Linq(['dogs', 'cats', 13, true])

    expect(anyArray.ofType(String).count()).toBe(2)
    expect(anyArray.ofType(Number).count()).toBe(1)
    expect(anyArray.ofType(Boolean).count()).toBe(1)
    expect(anyArray.ofType(Function).count()).toBe(0)
    expect(() -> anyArray.ofType({})).toThrow()
    # expect(pets.ofType(Dog).count()).toBe(1)
    # expect(pets.ofType < Dog > Dog.First().Speak(), 'Bark')

  test 'OrderBy', () ->
    parameters = [
      { ID: 0, Name: '正一郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 5, Name: '征史郎' },
    ]

    special = [
      { ID: 0, date: new Date(), regData: new RegExp('abc', 'g') },
      { ID: 3, date: new Date('2018-02-03 12:10:11'), regData: new RegExp('abcd', 'g') },
      { ID: 2, date: new Date('2018-02-03 12:10:11.110'), regData: new RegExp('1', 'g') },
      { ID: 5, date: new Date('2023-02-03'), regData: new RegExp('2', 'g') },
    ]

    specialType = [
      { ID: 0, date: new Date(), regData: new RegExp() },
      { ID: 3, date: new Date('2018-02-03 12:10:11') },
      { ID: '我音', date: new Date('2018-02-03 12:10:11.110') },
      { ID: '拼音', date: new Date('2023-02-03') },
      { ID: '拼音', date: new Date('2023-02-03') },
    ]

    specialTypeDesc = [
      { ID: 0, date: new Date(), regData: new RegExp() },
      { ID: 3, date: new Date('2018-02-03 12:10:11') },
      { ID: '拼音', date: new Date('2023-02-03') },
      { ID: '我音', date: new Date('2018-02-03 12:10:11.110') },
      { ID: '拼音', date: new Date('2023-02-03') },
      { ID: '我音', date: new Date('2018-02-03 12:10:11.120') },
    ]
    orl = new Linq(parameters).orderBy((x) -> x.ID).toArray()
    expect(orl).toEqual([
      { ID: 0, Name: '正一郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 5, Name: '征史郎' },
    ])

    expect(
      new Linq(parameters)
        .thenBy((x) -> x.ID)
        .select((x) -> x.ID)
        .toArray()
    ).toEqual([0, 2, 3, 5])
    expect(
      new Linq(parameters)
        .thenByDescending((x) -> x.ID)
        .select((x) -> x.ID)
        .toArray()
    ).toEqual([5, 3, 2, 0])

    listId = new Linq(special)
      .orderBy((x) -> x.date)
      .select((x) -> x.ID)
      .toArray()
    expect(listId).toEqual([3, 2, 5, 0])

    listIdType = new Linq(specialType, 'zh-CN')
      .orderBy((x) -> x.ID)
      .select((x) -> x.ID)
      .toArray()
    expect(listIdType).toEqual([0, 3, '拼音', '拼音', '我音'])

    listIdTypeDesc = new Linq(specialTypeDesc, 'zh-CN')
      .orderByDescending((x) -> x.ID)
      .select((x) -> x.ID)
      .toArray()
    expect(listIdTypeDesc).toEqual([3, 0, '我音', '我音', '拼音', '拼音'])

  test 'OrderByDescending', () ->
    parameters = [
      { ID: 0, Name: '正一郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 5, Name: '征史郎' },
    ]

    parametersObj = [
      { ID: 0, Infos: { Info: { Name: '正一郎' } } },
      { ID: 3, Infos: { Info: { Name: '清次郎' } } },
      { ID: 2, Infos: { Info: { Name: '誠三郎' } } },
    ]
    subObj = { ID: 5, Infos: { Info: { Name: '征史郎' } } }
    # subObj.__proto__.pName = '原型链属性'
    Object.defineProperty(subObj.__proto__, 'pName', {
      value: '原型链属性',
      enumerable: true,
      configurable: true,
    })
  
    parametersObj.push(subObj)

    or2 = new Linq(parametersObj).orderByDescending((x) -> x.ID).toArray()
    delete subObj.__proto__.pName # 用完删除，否则会有影响

    noArray = new Linq('noarray string').orderBy((x) -> x).toArray()
    expect(noArray).toEqual('noarray string')

    orl = new Linq(parameters).orderByDescending((x) -> x.ID).toArray()
    expect(orl).toEqual([
      { ID: 5, Name: '征史郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 0, Name: '正一郎' },
    ])
    expect(or2).toEqual([
      { ID: 5, Infos: { Info: { Name: '征史郎' } } },
      { ID: 3, Infos: { Info: { Name: '清次郎' } } },
      { ID: 2, Infos: { Info: { Name: '誠三郎' } } },
      { ID: 0, Infos: { Info: { Name: '正一郎' } } },
    ])

  test 'thenBy & thenByDescending', () ->
    persons = [
      { ID: 0, Age: 30, Name: 'A' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 2, Age: 15, Name: 'F' },
    ]

    orderByID = new Linq(persons).orderByDescending((x) -> x.ID).toArray()
    thenByAge = new Linq(persons)
      .orderByDescending((x) -> x.ID)
      .thenBy((x) -> x.Age)
      .toArray()
    thenByName = new Linq(persons)
      .orderByDescending((x) -> x.ID)
      .thenBy((x) -> x.Age)
      .thenByDescending((x) -> x.Name)
      .toArray()

    expect(orderByID).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 0, Age: 30, Name: 'A' },
    ])
    expect(thenByAge).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 0, Age: 30, Name: 'A' },
    ])
    expect(thenByName).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 0, Age: 30, Name: 'A' },
    ])

  test 'OrderByLocalSort', () ->
    parameters = [
      { Code: 'S', Name: '诗涵' },
      { Code: 'F', Name: '芳菲' },
      # { Code: 'U', Name: '悠悦' },
      { Code: 'H', Name: '慧琳' },
      { Code: 'E', Name: '恩琪' },
      { Code: 'R', Name: '睿萱' },
      { Code: 'B', Name: '碧琳' },
      { Code: 'C', Name: '采薇' },
      { Code: 'C', Name: '采薇' },
      { Code: 'T', Name: '天翊' },
      { Code: 'G', Name: '冠宇' },
      { Code: 'Q', Name: '绮梦' },
      { Code: 'M', Name: '梦琪' },
      # { Code: 'V', Name: '薇雅' },
      { Code: 'Z', Name: '梓涵' },
      { Code: 'A', Name: '安雅' },
      # { Code: 'I', Name: '依诺' },
      { Code: 'Y', Name: '雅琴' },
      { Code: 'W', Name: '婉婷' },
      { Code: 'L', Name: '乐瑶' },
      { Code: 'K', Name: '可昕' },
      { Code: 'X', Name: '晓妍' },
      { Code: 'J', Name: '佳颖' },
      { Code: 'N', Name: '娜菲' },
      { Code: 'D', Name: '丹妮' },
      { Code: 'O', Name: '欧雅' },
      { Code: 'P', Name: '佩珊' },
    ]

    listName = new Linq(parameters, 'zh-CN').orderBy((x) -> x.Name).toArray()
    expect(listName).toEqual([
      { Code: 'A', Name: '安雅' },
      { Code: 'B', Name: '碧琳' },
      { Code: 'C', Name: '采薇' },
      { Code: 'C', Name: '采薇' },
      { Code: 'D', Name: '丹妮' },
      { Code: 'E', Name: '恩琪' },
      { Code: 'F', Name: '芳菲' },
      { Code: 'G', Name: '冠宇' },
      { Code: 'H', Name: '慧琳' },
      { Code: 'J', Name: '佳颖' },
      { Code: 'K', Name: '可昕' },
      { Code: 'L', Name: '乐瑶' },
      { Code: 'M', Name: '梦琪' },
      { Code: 'N', Name: '娜菲' },
      { Code: 'O', Name: '欧雅' },
      { Code: 'P', Name: '佩珊' },
      { Code: 'Q', Name: '绮梦' },
      { Code: 'R', Name: '睿萱' },
      { Code: 'S', Name: '诗涵' },
      { Code: 'T', Name: '天翊' },
      { Code: 'W', Name: '婉婷' },
      { Code: 'X', Name: '晓妍' },
      { Code: 'Y', Name: '雅琴' },
      { Code: 'Z', Name: '梓涵' },
    ])

    expect(new Linq(parameters).orderBy((x) -> x.Name).count()).toBe(24)

  test 'Remove', () ->
    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    new Linq(numbers).remove(6)
    new Linq(numbers).remove(16)

    expect(numbers).toEqual([0, 1, 2, 3, 4, 5, 7, 8, 9])
    expect(numbers.length).toBe(9)

  test 'RemoveAll', () ->
    dinosaurs = new Linq(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'])
    lessDinosaurs = new Linq(['Compsognathus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Gallimimus', 'Triceratops'])
    expect(dinosaurs.removeAll((x) -> x.endsWith('saurus'))).toEqual(lessDinosaurs)

  test 'RemoveAt', () ->
    dinosaurs = new Linq(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'])
    lessDinosaurs = new Linq(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'])
    dinosaurs.removeAt(3)
    expect(dinosaurs).toEqual(lessDinosaurs)

  test 'Reverse', () ->
    expect(new Linq([1, 2, 3, 4, 5]).reverse().toArray()).toEqual([5, 4, 3, 2, 1])

describe 'Group 3:', () ->
  test 'Select', () ->
    parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '誠三郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
    ]

    results = new Linq(parameters)
      .select((value) ->
        return { ID: value.ID, Name: value.Name }
      )
      .toArray()
    results2 = new Linq(parameters).select((value) -> value.Name).toArray()
    expect(results).toEqual([
      { ID: 5, Name: '正一郎' },
      { ID: 13, Name: '清次郎' },
      { ID: 25, Name: '誠三郎' },
      { ID: 42, Name: '征史郎' },
    ])
    expect(results2).toEqual(['正一郎', '清次郎', '誠三郎', '征史郎'])

  test 'SelectMany', () ->
    parameters = [
      { Name: '正一郎', Numbers: [1, 2, 3] },
      { Name: '清次郎', Numbers: [1, 3, 5] },
      { Name: '誠三郎', Numbers: [2, 4, 6] },
      { Name: '征史郎', Numbers: [9, 8, 7] },
    ]

    results = new Linq(parameters).selectMany((x) -> new Linq(x.Numbers)).toArray()
    expect(results).toEqual([1, 2, 3, 1, 3, 5, 2, 4, 6, 9, 8, 7])
    expect(results.length).toBe(12)

  test 'Sum', () ->
    parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ]

    numbers = [
      { Age: 0, Name: '正一郎' },
      { Age: 0.3, Name: '清次郎' },
      { Age: 0.5, Name: '誠三郎' },
      { Age: 0.8, Name: '征史郎' },
    ]

    expect(new Linq(parameters).sum((x) -> x.Age)).toBeCloseTo(118)
    expect(new Linq(numbers).sum((x) -> x.Age)).toBeCloseTo(1.6)
    expect(new Linq(['A', null]).sum((x) -> x)).toBeCloseTo(0)

  test 'SequenceEqual', () ->
    pet1 = { Age: 2, Name: 'Turbo' }
    pet2 = { Age: 8, Name: 'Peanut' }

    # create three lists of pets.
    pets1 = new Linq([pet1, pet2])
    pets2 = new Linq([pet1, pet2])
    pets3 = new Linq([pet1])
    expect(pets1.sequenceEqual(pets2)).toBeTruthy()
    expect(pets1.sequenceEqual(pets3)).toBeFalsy()

  test 'Single', () ->
    fruits1 = new Linq([])
    fruits2 = new Linq(['orange'])
    fruits3 = new Linq(['orange', 'apple'])
    numbers1 = new Linq([1, 2, 3, 4, 5, 5])

    expect(fruits2.single()).toBe('orange')
    expect(() -> fruits1.single()).toThrow(/The collection does not contain exactly one element./)
    expect(() -> fruits3.single()).toThrow(/The collection does not contain exactly one element./)

    expect(numbers1.single((x) -> x is 1)).toBe(1)
    expect(() -> numbers1.single((x) -> x is 5)).toThrow(/The collection does not contain exactly one element./)
    expect(() -> numbers1.single((x) -> x > 5)).toThrow(/The collection does not contain exactly one element./)

  test 'SingleOrDefault', () ->
    fruits1 = new Linq()
    fruits2 = new Linq(['orange'])
    fruits3 = new Linq(['orange', 'apple'])
    numbers1 = new Linq([1, 2, 3, 4, 5, 5])

    expect(fruits1.singleOrDefault()).toBeUndefined()
    expect(fruits2.singleOrDefault()).toBe('orange')
    expect(() -> fruits3.singleOrDefault()).toThrow(/The collection does not contain exactly one element./)

    expect(numbers1.singleOrDefault((x) -> x is 1)).toBe(1)
    expect(numbers1.singleOrDefault((x) -> x > 5)).toBeUndefined()
    expect(() -> numbers1.singleOrDefault((x) -> x is 5)).toThrow(/The collection does not contain exactly one element./)

  test 'Skip', () ->
    texts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    expect(new Linq(texts).skip(4).toArray()).toEqual(['Thu', 'Fri', 'Sat'])

  test 'SkipLast', () ->
    grades = new Linq([59, 82, 70, 56, 92, 98, 85])
    expect(
      grades
        .orderByDescending((x) -> x)
        .skipLast(3)
        .toArray()
    ).toEqual([98, 92, 85, 82])

  test 'SkipWhile', () ->
    grades = new Linq([59, 82, 70, 56, 92, 98, 85])
    expect(
      grades
        .orderByDescending((x) -> x)
        .skipWhile((grade) -> grade >= 80)
        .toArray()
    ).toEqual([70, 59, 56])

  test 'Take', () ->
    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    texts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    # 开始的3个
    expect(new Linq(numbers).take(3).toArray()).toEqual([0, 1, 2])
    # 开始的4个
    expect(new Linq(texts).take(4).toArray()).toEqual(['Sun', 'Mon', 'Tue', 'Wed'])

  test 'TakeLast', () ->
    grades = new Linq([59, 82, 70, 56, 92, 98, 85])
    expect(
      grades
        .orderByDescending((x) -> x)
        .takeLast(3)
        .toArray()
    ).toEqual([70, 59, 56])

  test 'TakeWhile', () ->
    expected = ['apple', 'banana', 'mango']
    fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'])
    expect(fruits.takeWhile((fruit) -> fruit isnt 'orange').toArray()).toEqual(expected)

  test 'ToArray', () ->
    expect(new Linq([1, 2, 3, 4, 5]).toArray()).toEqual([1, 2, 3, 4, 5])

  test 'ToDictionary', () ->
    parameters = [
      { ID: 0, Age: 52, Name: '正一郎' },
      { ID: 8, Age: 28, Name: '清次郎' },
      { ID: 3, Age: 20, Name: '誠三郎' },
      { ID: 4, Age: 18, Name: '征史郎' },
    ]

    dictionary = new Linq(parameters).toDictionary((x) -> x.ID).toArray()
    dictionary2 = new Linq(parameters)
      .toDictionary((value) ->
        return { ID: value.ID, Name: value.Name }
      )
      .toArray()

    expect(dictionary).toEqual([
      { Key: 0, Value: { ID: 0, Age: 52, Name: '正一郎' } },
      { Key: 8, Value: { ID: 8, Age: 28, Name: '清次郎' } },
      { Key: 3, Value: { ID: 3, Age: 20, Name: '誠三郎' } },
      { Key: 4, Value: { ID: 4, Age: 18, Name: '征史郎' } },
    ])
    expect(dictionary2).toEqual([
      {
        Key: { ID: 0, Name: '正一郎' },
        Value: { ID: 0, Age: 52, Name: '正一郎' },
      },
      {
        Key: { ID: 8, Name: '清次郎' },
        Value: { ID: 8, Age: 28, Name: '清次郎' },
      },
      {
        Key: { ID: 3, Name: '誠三郎' },
        Value: { ID: 3, Age: 20, Name: '誠三郎' },
      },
      {
        Key: { ID: 4, Name: '征史郎' },
        Value: { ID: 4, Age: 18, Name: '征史郎' },
      },
    ])

    people = new Linq([
      { Age: 15, Name: 'Cathy' },
      { Age: 25, Name: 'Alice' },
      { Age: 50, Name: 'Bob' },
    ])
    dictionary3 = people.toDictionary((x) -> x.Name).toArray()
    expect(dictionary3.find((x) -> x.Key is 'Bob').Value).toEqual({ Age: 50, Name: 'Bob' })
    expect(dictionary3.find((x) -> x.Key is 'Bob').Value.Age).toBe(50)

    dictionary4 = people
      .toDictionary(
        (x) -> x.Name,
        (y) -> y.Age
      )
      .toArray()
    expect(dictionary4.find((x) -> x.Key is 'Alice').Value).toBe(25)

  test 'ToList', () ->
    expect(new Linq([1, 2, 3]).toList().toArray()).toEqual([1, 2, 3])

  test 'ToLookup', () ->
    # create a list of Packages
    packages = new Linq([
      { Company: 'Coho Vineyard', TrackingNumber: 89453312, Weight: 25.2 },
      { Company: 'Lucerne Publishing', TrackingNumber: 89112755, Weight: 18.7 },
      { Company: 'Wingtip Toys', TrackingNumber: 299456122, Weight: 6.0 },
      { Company: 'Contoso Pharmaceuticals', TrackingNumber: 670053128, Weight: 9.3 },
      { Company: 'Wide World Importers', TrackingNumber: 4665518773, Weight: 33.8 },
    ])

    # create a Lookup to organize the packages.
    # use the first character of Company as the key value.
    # select Company appended to TrackingNumber
    # as the element values of the Lookup.
    lookup = packages.toLookup(
      (p) -> p.Company.substring(0, 1),
      (p) -> p.Company + ' ' + p.TrackingNumber
    )
    result = [
      { key: 'C', count: 2, elements: ['Coho Vineyard 89453312', 'Contoso Pharmaceuticals 670053128'] },
      { key: 'L', count: 1, elements: ['Lucerne Publishing 89112755'] },
      { key: 'W', count: 2, elements: ['Wingtip Toys 299456122', 'Wide World Importers 4665518773'] },
    ]
    expect(lookup).toEqual(result)

  test 'Union', () ->
    ints1 = new Linq([5, 3, 9, 7, 5, 9, 3, 7])
    ints2 = new Linq([8, 3, 6, 4, 4, 9, 1, 0])
    expect(ints1.union(ints2).toArray()).toEqual([5, 3, 9, 7, 8, 6, 4, 1, 0]) # 并集

    result = [
      { Name: 'apple', Code: 9 },
      { Name: 'orange', Code: 4 },
      { Name: 'lemon', Code: 12 },
    ]
    store1 = new Linq([
      { Name: 'apple', Code: 9 },
      { Name: 'orange', Code: 4 },
    ])
    store2 = new Linq([
      { Name: 'apple', Code: 9 },
      { Name: 'lemon', Code: 12 },
    ])
    expect(store1.union(store2).toArray()).toEqual(result)

  test 'Where', () ->
    dataA = [0, 1, 2, 3, 4]
    dataB = [1.5, 1.3, 3.2]
    dataC = ['正一郎', '清次郎', '誠三郎', '征史郎']

    # 偶数
    dataA_F = new Linq(dataA).where((x) -> x % 2 is 0).toArray()
    # 小于2
    dataB_F = new Linq(dataB).where((x) -> x < 2.0).toArray()
    # 长度小于5
    dataC_F = new Linq(dataC).where((x) -> x.length < 5).toArray()

    expect(dataA_F).toEqual([0, 2, 4])
    expect(dataB_F).toEqual([1.5, 1.3])
    expect(dataC_F).toEqual(['正一郎', '清次郎', '誠三郎', '征史郎'])

  test 'Zip', () ->
    numbers = new Linq([1, 2, 3, 4])
    words = new Linq(['one', 'two', 'three'])
    expect(numbers.zip(words, (first, second) -> "#{first} #{second}").toArray()).toEqual(['1 one', '2 two', '3 three'])

    # larger second array
    expected = ['one 1', 'two 2', 'three 3']
    numbers2 = new Linq([1, 2, 3, 4])
    words2 = new Linq(['one', 'two', 'three'])
    expect(words2.zip(numbers2, (first, second) -> "#{first} #{second}").toArray()).toEqual(expected)

  test 'cloneDeep', () ->
    numbers = [1, 2, 3, 4]

    toolObj = new Linq()

    cloneNums = toolObj.cloneDeep(numbers)
    expect(cloneNums).toEqual([1, 2, 3, 4])
    expect(cloneNums is numbers).toBeFalsy()

    special = [
      { ID: 0, date: new Date(), regData: new RegExp('abc', 'g') },
      { ID: 3, date: new Date('2018-02-03 12:10:11'), regData: new RegExp('abcd', 'g') },
      { ID: 2, date: new Date('2018-02-03 12:10:11.110'), regData: new RegExp('1', 'g') },
      { ID: 5, date: new Date('2023-02-03'), regData: new RegExp('2', 'g') },
    ]

    expect(toolObj.cloneDeep(special).map((x) -> x.ID)).toEqual([0, 3, 2, 5])
