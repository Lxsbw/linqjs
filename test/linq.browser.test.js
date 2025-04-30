/**
 * @jest-environment jsdom
 */

describe('Linq Browser Environment', () => {
  beforeAll(() => {
    require('../src/linq'); // 直接引入模块
  });

  test('Linq 应挂载到 window', () => {
    // 由于已经通过 require 执行过代码，这里可以直接检查 window 对象
    expect(Linq).toBeDefined();
    expect(window.Linq).toBeDefined();
    expect(new window.Linq()).toBeInstanceOf(window.Linq);
    expect(new Linq()).toBeInstanceOf(window.Linq);
  });

  test('add 方法添加元素', () => {
    const linq = new Linq([1]); // 使用直接引入的 Linq 类
    linq.add(2);
    expect(linq.toArray()).toEqual([1, 2]);
  });
});
