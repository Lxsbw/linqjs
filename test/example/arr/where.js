var dataA, dataA_F, dataB, dataB_F, dataC, dataC_F, Linq;

require('../../../src/Array/linqArray');

dataA = [0, 1, 2, 3, 4];
dataB = [1.5, 1.3, 3.2];
dataC = ['正一郎', '清次郎', '誠三郎', '征史郎'];

// 偶数
dataA_F = dataA.where(x => x % 2 === 0);
// 小于2
dataB_F = dataB.where(x => x < 2.0);
// 长度小于5
dataC_F = dataC.where(x => x.length < 5);

console.log('dataA_F:', dataA_F);
console.log('dataB_F:', dataB_F);
console.log('dataC_F:', dataC_F);
