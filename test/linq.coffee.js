require('coffeescript/register'); //npm install coffeescript, must declare

const Linq = require('../src/coffee/linq.coffee');

describe('Group 1:', () => {
  test('Any', () => {
    const fruits = new Linq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(fruits.any(x => x % 2 === 0)).toBeTruthy();
    expect(fruits.any(x => x >= 10)).toBeFalsy();
    expect(fruits.any(x => x < 5)).toBeTruthy();
  });

 
});
