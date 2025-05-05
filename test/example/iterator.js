var Linq = require('../../src/linq');

const pets = new Linq([
  { Age: 10, Name: 'Barley' },
  { Age: 4, Name: 'Boots' },
  { Age: 6, Name: 'Bissy' },
]);

console.log('=============================== for...of ========================');
for (const pet of pets) {
  console.log('pet:', pet);
}

console.log();
console.log('=============================== [...pets] ========================');
const petsCopy = [...pets];
for (const pet of petsCopy) {
  console.log('petsCopy:', pet);
}

console.log();
console.log('=============================== Array.from() ========================');
const petsFrom = Array.from(pets);
for (const pet of petsFrom) {
  console.log('petsFrom:', pet);
}

console.log();
console.log('=============================== new Set() ========================');
const petsSet = new Set(pets);
console.log('petsSet:', petsSet);


console.log();
const petsss = new Linq([]);
console.log(petsss.toString() === '[object Linq]');
console.log(`${petsss}` === '[object Linq]');
