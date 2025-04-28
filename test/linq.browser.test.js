/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Group 4:', () => {
  beforeAll(() => {
    jest.resetModules();
    // 读取被测代码并注入到window环境
    const linqCode = fs.readFileSync(path.resolve(__dirname, '../src/linq.js'), 'utf8');
    window.eval(linqCode);
  });

  test('should assign Linq to window', () => {
    // console.log('window.Linq:', window.Linq);
    expect(window.Linq).toBeDefined(); // 验证window.Linq存在
  });

  test('window对象存在', () => {
    expect(window).toBeDefined();
    expect(document).toBeDefined();
  });

  test('Add', () => {
    const list = new Linq([]);

    list.add('hey');
    console.log('window.list:', list);

    expect(list.first()).toBe('hey');
  });
});
