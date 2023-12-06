var Linq, numbers, takenNumbers, takenTexts, texts;

Linq = require('../../src/linq');

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

texts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 开始的3个
takenNumbers = new Linq(numbers).take(3).toArray();

// 开始的4个
takenTexts = new Linq(texts).take(4).toArray();

console.log('takenNumbers:', takenNumbers);

console.log('takenTexts:', takenTexts);
