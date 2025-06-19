/**
 * @jest-environment jsdom
 */

describe('Linq Browser Environment', () => {
  beforeAll(() => {
    require('../src/linq');
    // require('../src/es5/linq');
  });

  test('Linq in window', () => {
    // 已 require 执行过代码，直接检查 window 对象
    expect(Linq).toBeDefined();
    expect(window.Linq).toBeDefined();
    expect(new window.Linq()).toBeInstanceOf(window.Linq);
    expect(new Linq()).toBeInstanceOf(window.Linq);
  });

  test('Add', () => {
    const linq = new Linq([1]);
    linq.add(2);
    expect(linq.toArray()).toEqual([1, 2]);
  });
});
