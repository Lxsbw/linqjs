var orderByID, persons, thenByAge, thenByName;

require('../arr_init');

persons = [
  { ID: 0, Age: 30, Name: 'A' },
  { ID: 1, Age: 25, Name: 'B' },
  { ID: 2, Age: 2, Name: 'G' },
  { ID: 2, Age: 18, Name: 'C' },
  { ID: 1, Age: 30, Name: 'D' },
  { ID: 1, Age: 25, Name: 'E' },
  { ID: 2, Age: 15, Name: 'F' },
];

orderByID = persons.orderByDescending(x => x.ID);

thenByAge = persons.orderByDescending(x => x.ID).thenBy(x => x.Age);

thenByName = persons
  .orderByDescending(x => x.ID)
  .thenBy(x => x.Age)
  .thenByDescending(x => x.Name);
 

console.log('orderByID:', orderByID);
console.log('thenByAge:', thenByAge);
console.log('thenByName:', thenByName);
// console.log('persons:', persons);

intArray = [1, 5, 8, 12, 15, 16];
console.log('number:', intArray.orderByDescending(x => x));
console.log('number:', intArray);

const personsMul = [
  { ID: 0, Age: 30, Name: 'A', hobby: 'Aabc', remark: 'Amart' },
  { ID: 1, Age: 25, Name: 'B', hobby: 'Babc', remark: 'Bmart' },
  { ID: 1, Age: 25, Name: 'B', hobby: 'Zabc', remark: 'Bmart' },
  { ID: 1, Age: 25, Name: 'B', hobby: 'Habc', remark: '8mart' },
  { ID: 1, Age: 25, Name: 'B', hobby: 'Habc', remark: '3mart' },
  { ID: 1, Age: 25, Name: 'B', hobby: 'Habc', remark: '6mart' },
  { ID: 2, Age: 2, Name: 'G', hobby: 'Gabc', remark: 'Gmart' },
  { ID: 2, Age: 18, Name: 'C', hobby: 'Cabc', remark: 'Cmart' },
  { ID: 1, Age: 30, Name: 'D', hobby: 'Dabc', remark: 'Dmart' },
  { ID: 1, Age: 25, Name: 'E', hobby: 'Eabc', remark: 'Emart' },
  { ID: 2, Age: 15, Name: 'F', hobby: 'Fabc', remark: 'Fmart' }
];

console.log(personsMul.orderByDescending(x=>x.ID))
console.log(personsMul.orderByDescending(x=>x.ID).thenBy(x=>x.Age))
console.log(personsMul.orderByDescending(x=>x.ID).thenBy(x=>x.Age).thenByDescending(x=>x.Name))
console.log(personsMul.orderByDescending(x=>x.ID).thenBy(x=>x.Age).thenByDescending(x=>x.Name).thenBy(x=>x.hobby))
console.log(personsMul.orderByDescending(x=>x.ID).thenBy(x=>x.Age).thenByDescending(x=>x.Name).thenBy(x=>x.hobby).thenByDescending(x=>x.remark))