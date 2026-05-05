/**
 * @jest-environment jsdom
 */
const testLinqImple = (implePath, impleName) => {
  describe(`Linq Browser Environment (${impleName})`, () => {
    beforeAll(() => {
      jest.resetModules();
      require(implePath);
    });

    test('Linq in window', () => {
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
};

testLinqImple('../src/linq', 'ESNext');
testLinqImple('../src/es5/linq', 'ES5');
// testLinqImple('../build/linq.min.js', 'ESMini');
// testLinqImple('../build/coffee_to_linq.js', 'ESCoffee');
// testLinqImple('../build/linq.es5.min.js', 'ES5Mini');
