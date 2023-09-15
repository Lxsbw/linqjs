const Linq = require('../src/linq');

describe('Group 1:', () => {
  test('Any', () => {
    const fruits = new Linq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(fruits.any(x => x % 2 === 0)).toBeTruthy();
    expect(fruits.any(x => x >= 10)).toBeFalsy();
    expect(fruits.any(x => x < 5)).toBeTruthy();
  });

  test('All', () => {
    parameters = [
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

  test('Count', () => {
    const fruits = new Linq(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

    expect(fruits.count()).toBe(6);
    expect(fruits.count(x => x.length > 5)).toBe(3);
  });
});
