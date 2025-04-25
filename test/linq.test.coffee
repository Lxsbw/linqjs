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
