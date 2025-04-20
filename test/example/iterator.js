var Linq = require('../../src/linq');

const pets = new Linq([
  { Age: 10, Name: 'Barley' },
  { Age: 4, Name: 'Boots' },
  { Age: 6, Name: 'Bissy' },
]);

for (const pet of pets) {
  console.log('pet:', pet);
}

console.log();
const petsCopy = [...pets];
for (const pet of petsCopy) {
  console.log('petsCopy:', pet);
}
console.log();

const petsss = new Linq([]);
console.log(petsss.toString() === '[object List]');
console.log(`${petsss}` === '[object List]');
