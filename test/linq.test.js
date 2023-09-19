const Linq = require('../src/linq');

describe('Group 1:', () => {
  test('Add', () => {
    const list = new Linq([]);

    list.add('hey');
    expect(list.first()).toBe('hey');
  });

  test('Append', () => {
    const list = new Linq([]);

    list.addRange(['hey', "what's", 'up']);
    list.append('there');
    expect(list.last()).toBe('there');
  });

  test('Prepend', () => {
    const list = new Linq([]);

    list.addRange(['hey', "what's", 'up']);
    list.prepend('there');
    expect(list.first()).toBe('there');
  });

  test('AddRange', () => {
    const list = new Linq([]);

    list.addRange(['hey', "what's", 'up']);
    expect(list.toArray()).toEqual(['hey', "what's", 'up']);
  });

  test('Aggregate', () => {
    const sentence = 'the quick brown fox jumps over the lazy dog';
    const reversed = 'dog lazy the over jumps fox brown quick the ';
    const words = new Linq(sentence.split(' '));
    expect(words.aggregate((workingSentence, next) => next + ' ' + workingSentence, '')).toBe(reversed);
    expect(new Linq([1, 2, 3, 4, 5]).aggregate((item, num) => num + item, 0)).toBe(15);
  });

  test('All', () => {
    const parameters = [
      { bill: 1, box: 'one', sn: 'fruits0', status: 30 },
      { bill: 1, box: 'one', sn: 'fruits1', status: 40 },
      { bill: 1, box: 'one', sn: 'fruits2', status: 0 },
      { bill: 1, box: 'two', sn: 'fruits3', status: 30 },
      { bill: 1, box: 'three', sn: 'fruits4', status: 30 },
      { bill: 1, box: 'four', sn: 'fruits4', status: 0 },
      { bill: 1, box: 'five', sn: 'fruits5', status: 40 },
    ];

    let boxs = new Linq(parameters).select(x => x.box).distinct();
    const res = boxs.count(x => new Linq(parameters).where(p => p.box === x).all(p => [30, 40].includes(p.status)));
    expect(res).toBe(3);
  });

  test('Any', () => {
    const fruits = new Linq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(fruits.any(x => x % 2 === 0)).toBeTruthy();
    expect(fruits.any(x => x >= 10)).toBeFalsy();
    expect(fruits.any(x => x < 5)).toBeTruthy();
  });

  test('Average', () => {
    const numbers = [
      { Age: 0, Name: '正一郎' },
      { Age: 0.3, Name: '清次郎' },
      { Age: 0.5, Name: '誠三郎' },
      { Age: 0.8, Name: '征史郎' },
    ];

    // expect(new Linq(numbers).average(x => x.Age)).toBe(0.4);
    expect(new Linq(numbers).average(x => x.Age)).toBeCloseTo(0.4);
  });

  test('Cast', () => {
    const pets = new Linq([
      { Age: 8, Name: 'Barley', Vaccinated: true },
      { Age: 1, Name: 'Whiskers', Vaccinated: false },
    ]);

    const dogs = pets.cast();

    // t.true(typeof dogs.first().Speak === 'function')
    expect(typeof dogs.first().Speak === 'function').toBeFalsy();
    // t.is(dogs.first().Speak(), 'Bark')
    // t.true(typeof dogs.last().Speak === 'undefined')
  });

  test('Clear', () => {
    const pets = new Linq([
      { Age: 8, Name: 'Barley', Vaccinated: true },
      { Age: 1, Name: 'Whiskers', Vaccinated: false },
    ]);

    expect(pets.count()).toBe(2);
    pets.clear();
    expect(pets.count()).toBe(0);
  });

  test('Concat', () => {
    const cats = new Linq([
      { Age: 8, Name: 'Barley' },
      { Age: 4, Name: 'Boots' },
      { Age: 1, Name: 'Whiskers' },
    ]);
    const dogs = new Linq([
      { Age: 3, Name: 'Bounder' },
      { Age: 14, Name: 'Snoopy' },
      { Age: 9, Name: 'Fido' },
    ]);
    const expected = ['Barley', 'Boots', 'Whiskers', 'Bounder', 'Snoopy', 'Fido'];
    expect(
      cats
        .select(cat => cat.Name)
        .concat(dogs.select(dog => dog.Name))
        .toArray()
    ).toEqual(expected);
  });

  test('Contains', () => {
    const fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
    expect(fruits.contains('mango')).toBeTruthy();
  });

  test('Count', () => {
    const fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
    const intArray = [1, 5, 8, 12, 15, 16];
    const stringList = ['正一郎', '清次郎', '誠三郎', '征史郎'];
    const parameters = [
      { bill: 1, box: 'one', sn: 'fruits0', status: 30 },
      { bill: 1, box: 'one', sn: 'fruits1', status: 40 },
      { bill: 1, box: 'one', sn: undefined, status: 0 },
      { bill: 1, box: 'two', status: 30 },
      { bill: 1, box: 'three', sn: '', status: 30 },
      { bill: 1, box: 'four', sn: 'fruits6', status: 0 },
      { bill: 1, box: 'five', sn: null, status: 40 },
    ];

    expect(fruits.count()).toBe(6);
    expect(fruits.count(x => x.length > 5)).toBe(3);

    expect(new Linq(intArray).count()).toBe(6);
    expect(new Linq(stringList).count()).toBe(4);
    expect(new Linq(intArray).count(x => x % 2 === 0)).toBe(3);
    expect(new Linq(stringList).count(x => x.indexOf('三') >= 0)).toBe(1);
    expect(new Linq(parameters).count(x => x.sn && x.sn.length > 0)).toBe(3);
  });

  test('DefaultIfEmpty', () => {
    const pets = new Linq([
      { Age: 8, Name: 'Barley' },
      { Age: 4, Name: 'Boots' },
      { Age: 1, Name: 'Whiskers' },
    ]);
    expect(
      pets
        .defaultIfEmpty()
        .select(pet => pet.Name)
        .toArray()
    ).toEqual(['Barley', 'Boots', 'Whiskers']);
    const numbers = new Linq();
    expect(numbers.defaultIfEmpty(0).toArray()).toEqual([0]);
  });

  test('Distinct', () => {
    const dataA = [0, 1, 3, 3, 2];
    const dataB = [1.5, 1.5, 1.5, 1.5];
    const dataC = ['征史郎', '征四郎', '征史郎', '正史郎'];

    const parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '正一郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
    ];

    const dataA_D = new Linq(dataA).distinct().toArray();
    const dataB_D = new Linq(dataB).distinct().toArray();
    const dataC_D = new Linq(dataC).distinct().toArray();
    const dataC_E = new Linq(parameters)
      .select(x => x.Name)
      .distinct()
      .toArray();

    expect(dataA_D).toEqual([0, 1, 3, 2]);
    expect(dataB_D).toEqual([1.5]);
    expect(dataC_D).toEqual(['征史郎', '征四郎', '正史郎']);
    expect(dataC_E).toEqual(['正一郎', '清次郎', '征史郎']);
  });

  test('DistinctBy', () => {
    const data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
    ];

    // 去重
    const result1 = new Linq(data).distinctBy(x => x.category).toArray();
    const result2 = new Linq(data)
      .distinctBy(el => {
        return { id: el.id, category: el.category };
      })
      .toArray();

    expect(result1).toEqual([
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
    ]);
    expect(result2).toEqual([
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
    ]);
  });

  test('DistinctMap', () => {
    const dataA = [0, 1, 3, 3, 2];
    const parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '正一郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
      { ID: 19, Rate: 0.1, Name: '清次郎' },
      { ID: 45, Rate: 0.3, Name: '征史郎' },
      { ID: 26, Rate: 0.0, Name: '正一郎' },
      { ID: 27, Rate: 0.0, Name: '正二郎' },
    ];

    const dataC_F = new Linq(parameters).distinctMap(x => x.Name).toArray();
    const dataC_G = new Linq(parameters)
      .distinctMap(x => {
        return { Name: x.Name };
      })
      .toArray();
    const dataC_H = new Linq(dataA).distinctMap().toArray();

    expect(dataC_F).toEqual(['正一郎', '清次郎', '征史郎', '正二郎']);
    expect(dataC_G).toEqual([{ Name: '正一郎' }, { Name: '清次郎' }, { Name: '征史郎' }, { Name: '正二郎' }]);
    expect(dataC_H).toEqual([0, 1, 3, 2]);
  });

  test('ElementAt', () => {
    const a = new Linq(['hey', 'hola', 'que', 'tal']);

    expect(a.elementAt(0)).toBe('hey');
    expect(() => a.elementAt(4)).toThrow('ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source.');
    expect(() => a.elementAt(-1)).toThrow(/ArgumentOutOfRangeException: index is less than 0 or greater than or equal to the number of elements in source./);
  });

  test('ElementAtOrDefault', () => {
    const a = new Linq(['hey', 'hola', 'que', 'tal']);
    const b = new Linq([2, 1, 0, -1, -2]);
    expect(a.elementAtOrDefault(0)).toBe('hey');
    expect(b.elementAtOrDefault(2)).toBe(0);
    expect(a.elementAtOrDefault(4)).toBeUndefined;
  });

  test('Except', () => {
    const numbers1 = new Linq([2.0, 2.1, 2.2, 2.3, 2.4, 2.5]);
    const numbers2 = new Linq([2.2, 2.3]);
    expect(numbers1.except(numbers2).toArray()).toEqual([2, 2.1, 2.4, 2.5]);
  });
});

describe('Group 2:', () => {
  test('First', () => {
    const numbers = [1, 2, 3, 5, 7, 11];

    expect(new Linq(numbers).first()).toBe(1);
    expect(new Linq(numbers).first(x => x % 2 === 0)).toBe(2);
    expect(() => new Linq().first()).toThrow(/InvalidOperationException: The source sequence is empty./);
  });

  test('FirstOrDefault', () => {
    const parameters = [
      { ID: 5, Name: '正一郎' },
      { ID: 13, Name: '清次郎' },
      { ID: 25, Name: '誠三郎' },
      { ID: 42, Name: '征史郎' },
    ];
    expect(new Linq(parameters).firstOrDefault(x => x.ID === 30)).toBeUndefined();
    expect(new Linq(parameters).firstOrDefault(x => x.ID === 13)).toEqual({ ID: 13, Name: '清次郎' });
  });

  test('ForEach', () => {
    const names = new Linq(['Bruce', 'Alfred', 'Tim', 'Richard']);
    let test = '';
    names.forEach((x, i) => (test += `${x} ${i} `));
    expect(test).toBe('Bruce 0 Alfred 1 Tim 2 Richard 3 ');
  });

  test('GroupBy', () => {
    const data = [
      { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
      { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
      { id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] },
      // { id: 3, name: 'three', category: 'vegetables', countries: ['Germany'] },
      // { id: 4, name: 'four', category: 'fruits', countries: ['Japan'] },
      // { id: 5, name: 'five', category: 'fruits', countries: ['Japan', 'Italy'] }
    ];
    expect(new Linq(data).groupBy(el => el.category)).toEqual([
      {
        key: 'fruits',
        count: 2,
        elements: [
          { id: 1, name: 'one', category: 'fruits', countries: ['lxsbw', 'xliecz'] },
          { id: 1, name: 'one', category: 'fruits', countries: ['Italy', 'Austria'] },
        ],
      },
      { key: 'vegetables', count: 1, elements: [{ id: 2, name: 'two', category: 'vegetables', countries: ['Italy', 'Germany'] }] },
    ]);

    expect(
      new Linq(data).groupBy(el => {
        return { id: el.id, category: el.category };
      })
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
    ]);
  });

  test('Join', () => {
    const persons = [
      { CityID: 1, Name: 'ABC' },
      { CityID: 1, Name: 'EFG' },
      { CityID: 2, Name: 'HIJ' },
      { CityID: 3, Name: 'KLM' },
      { CityID: 3, Name: 'NOP' },
      { CityID: 4, Name: 'QRS' },
      { CityID: 5, Name: 'TUV' },
    ];
    const cities = [
      { ID: 1, Name: 'Guangzhou' },
      { ID: 2, Name: 'Shenzhen' },
      { ID: 3, Name: 'Beijing' },
      { ID: 4, Name: 'Shanghai' },
    ];

    const result = new Linq(persons)
      .join(
        new Linq(cities),
        p => p.CityID,
        c => c.ID,
        (p, c) => {
          return { CityID: c.ID, PersonName: p.Name, CityName: c.Name };
        }
      )
      .toArray();
    expect(result).toEqual([
      { CityID: 1, PersonName: 'ABC', CityName: 'Guangzhou' },
      { CityID: 1, PersonName: 'EFG', CityName: 'Guangzhou' },
      { CityID: 2, PersonName: 'HIJ', CityName: 'Shenzhen' },
      { CityID: 3, PersonName: 'KLM', CityName: 'Beijing' },
      { CityID: 3, PersonName: 'NOP', CityName: 'Beijing' },
      { CityID: 4, PersonName: 'QRS', CityName: 'Shanghai' },
    ]);
  });

  test('Max', () => {
    const parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ];

    expect(new Linq(parameters).max(x => x.Age)).toBe(52);
  });

  test('Min', () => {
    const parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ];

    expect(new Linq(parameters).min(x => x.Age)).toBe(18);
  });

  test('OrderBy', () => {
    const parameters = [
      { ID: 0, Name: '正一郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 5, Name: '征史郎' },
    ];

    const or = new Linq(parameters).orderBy(x => x.ID).toArray();
    expect(or).toEqual([
      { ID: 0, Name: '正一郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 5, Name: '征史郎' },
    ]);
  });

  test('OrderByDescending', () => {
    const parameters = [
      { ID: 0, Name: '正一郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 5, Name: '征史郎' },
    ];

    const or = new Linq(parameters).orderByDescending(x => x.ID).toArray();
    expect(or).toEqual([
      { ID: 5, Name: '征史郎' },
      { ID: 3, Name: '清次郎' },
      { ID: 2, Name: '誠三郎' },
      { ID: 0, Name: '正一郎' },
    ]);
  });

  test('thenBy & thenByDescending', () => {
    const persons = [
      { ID: 0, Age: 30, Name: 'A' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 2, Age: 15, Name: 'F' },
    ];

    const orderByID = new Linq(persons).orderByDescending(x => x.ID).toArray();
    const thenByAge = new Linq(persons)
      .orderByDescending(x => x.ID)
      .thenBy(x => x.Age)
      .toArray();
    const thenByName = new Linq(persons)
      .orderByDescending(x => x.ID)
      .thenBy(x => x.Age)
      .thenByDescending(x => x.Name)
      .toArray();

    expect(orderByID).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 0, Age: 30, Name: 'A' },
    ]);
    expect(thenByAge).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 0, Age: 30, Name: 'A' },
    ]);
    expect(thenByName).toEqual([
      { ID: 2, Age: 2, Name: 'G' },
      { ID: 2, Age: 15, Name: 'F' },
      { ID: 2, Age: 18, Name: 'C' },
      { ID: 1, Age: 25, Name: 'E' },
      { ID: 1, Age: 25, Name: 'B' },
      { ID: 1, Age: 30, Name: 'D' },
      { ID: 0, Age: 30, Name: 'A' },
    ]);
  });

  test('Remove', () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    new Linq(numbers).remove(6);

    expect(numbers).toEqual([0, 1, 2, 3, 4, 5, 7, 8, 9]);
    expect(numbers.length).toBe(9);
  });
});

describe('Group 3:', () => {
  test('Select', () => {
    const parameters = [
      { ID: 5, Rate: 0.0, Name: '正一郎' },
      { ID: 13, Rate: 0.1, Name: '清次郎' },
      { ID: 25, Rate: 0.0, Name: '誠三郎' },
      { ID: 42, Rate: 0.3, Name: '征史郎' },
    ];

    const results = new Linq(parameters)
      .select(value => {
        return { ID: value.ID, Name: value.Name };
      })
      .toArray();
    const results2 = new Linq(parameters).select(value => value.Name).toArray();
    expect(results).toEqual([
      { ID: 5, Name: '正一郎' },
      { ID: 13, Name: '清次郎' },
      { ID: 25, Name: '誠三郎' },
      { ID: 42, Name: '征史郎' },
    ]);
    expect(results2).toEqual(['正一郎', '清次郎', '誠三郎', '征史郎']);
  });

  test('SelectMany', () => {
    const parameters = [
      { Name: '正一郎', Numbers: [1, 2, 3] },
      { Name: '清次郎', Numbers: [1, 3, 5] },
      { Name: '誠三郎', Numbers: [2, 4, 6] },
      { Name: '征史郎', Numbers: [9, 8, 7] },
    ];

    const results = new Linq(parameters).selectMany(x => new Linq(x.Numbers)).toArray();
    expect(results).toEqual([1, 2, 3, 1, 3, 5, 2, 4, 6, 9, 8, 7]);
    expect(results.length).toBe(12);
  });

  test('Sum', () => {
    const parameters = [
      { Age: 52, Name: '正一郎' },
      { Age: 28, Name: '清次郎' },
      { Age: 20, Name: '誠三郎' },
      { Age: 18, Name: '征史郎' },
    ];

    const numbers = [
      { Age: 0, Name: '正一郎' },
      { Age: 0.3, Name: '清次郎' },
      { Age: 0.5, Name: '誠三郎' },
      { Age: 0.8, Name: '征史郎' },
    ];

    expect(new Linq(parameters).sum(x => x.Age)).toBeCloseTo(118);
    expect(new Linq(numbers).sum(x => x.Age)).toBeCloseTo(1.6);
  });

  test('Skip', () => {
    const texts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    expect(new Linq(texts).skip(4).toArray()).toEqual(['Thu', 'Fri', 'Sat']);
  });

  test('Take', () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const texts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 开始的3个
    expect(new Linq(numbers).take(3).toArray()).toEqual([0, 1, 2]);
    // 开始的4个
    expect(new Linq(texts).take(4).toArray()).toEqual(['Sun', 'Mon', 'Tue', 'Wed']);
  });

  test('ToDictionary', () => {
    const parameters = [
      { ID: 0, Age: 52, Name: '正一郎' },
      { ID: 8, Age: 28, Name: '清次郎' },
      { ID: 3, Age: 20, Name: '誠三郎' },
      { ID: 4, Age: 18, Name: '征史郎' },
    ];

    const dictionary = new Linq(parameters).toDictionary(x => x.ID).toArray();
    const dictionary2 = new Linq(parameters)
      .toDictionary(function (value) {
        return { ID: value.ID, Name: value.Name };
      })
      .toArray();

    expect(dictionary).toEqual([
      { Key: 0, Value: { ID: 0, Age: 52, Name: '正一郎' } },
      { Key: 8, Value: { ID: 8, Age: 28, Name: '清次郎' } },
      { Key: 3, Value: { ID: 3, Age: 20, Name: '誠三郎' } },
      { Key: 4, Value: { ID: 4, Age: 18, Name: '征史郎' } },
    ]);
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
    ]);
  });

  test('Where', () => {
    const dataA = [0, 1, 2, 3, 4];
    const dataB = [1.5, 1.3, 3.2];
    const dataC = ['正一郎', '清次郎', '誠三郎', '征史郎'];

    // 偶数
    const dataA_F = new Linq(dataA).where(x => x % 2 === 0).toArray();
    // 小于2
    const dataB_F = new Linq(dataB).where(x => x < 2.0).toArray();
    // 长度小于5
    const dataC_F = new Linq(dataC).where(x => x.length < 5).toArray();

    expect(dataA_F).toEqual([0, 2, 4]);
    expect(dataB_F).toEqual([1.5, 1.3]);
    expect(dataC_F).toEqual(['正一郎', '清次郎', '誠三郎', '征史郎']);
  });
});