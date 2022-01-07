/*
  多字段排序（正序、倒序）
  field1 -> { name: 'iswhole', type: 1 }
  name 字段名
  type 1: 正序 -1: 倒序
*/

// 注意：这个函数会把字符串转成小写。见 fmt
const formatStr = function (str) {
  if (!str) str = '';
  return str.toString().trim().toLocaleLowerCase();
};

const getName = function (field, name = 'name') {
  return field != null ? field[name] : void 0;
};

const getType = function (field, name = 'type') {
  return field != null ? field[name] : void 0;
};

// console.log(-1 * 'A'.localeCompare('a'));
// console.log(-1 * 'A'.localeCompare('A'));
// console.log(1 * 'A'.localeCompare('a'));
// console.log(1 * 'A'.localeCompare('A'));

const _sortFor = function (field1, field2, field3, field4) {
  return function (fir, sec) {
    if (fir[getName(field1)] !== sec[getName(field1)] || !getName(field2)) {
      return getType(field1) * formatStr(fir[getName(field1)]).localeCompare(formatStr(sec[getName(field1)]));
    }
    if (fir[getName(field2)] !== sec[getName(field2)] || !getName(field3)) {
      return getType(field2) * formatStr(fir[getName(field2)]).localeCompare(formatStr(sec[getName(field2)]));
    }
    if (fir[getName(field3)] !== sec[getName(field3)] || !getName(field4)) {
      return getType(field3) * formatStr(fir[getName(field3)]).localeCompare(formatStr(sec[getName(field3)]));
    }
    return getType(field4) * formatStr(fir[getName(field4)]).localeCompare(formatStr(sec[getName(field4)]));
  };
};

let persons = [
  { ID: 0, Age: 30, Name: 'A' },
  { ID: 1, Age: 25, Name: 'B' },
  { ID: 2, Age: 2, Name: 'G' },
  { ID: 2, Age: 18, Name: 'C' },
  { ID: 1, Age: 30, Name: 'D' },
  { ID: 1, Age: 25, Name: 'E' },
  { ID: 2, Age: 15, Name: 'F' }
];

console.log('orderByID:', persons.sort(_sortFor({ name: 'ID', type: -1 })));
console.log('thenByAge:', persons.sort(_sortFor({ name: 'ID', type: -1 }, { name: 'Age', type: 1 })));
console.log('thenByName:', persons.sort(_sortFor({ name: 'ID', type: -1 }, { name: 'Age', type: 1 }, { name: 'Name', type: -1 })));
