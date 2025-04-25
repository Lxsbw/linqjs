Linq = require '../src/coffee/linq'

describe 'Group 1:', () ->

  test 'Add', () ->
    list = new Linq([])
    list.add('hey')
    expect(list.first()).toBe('hey')
