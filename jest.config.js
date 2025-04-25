module.exports = {
  transform: {
    // 定义 CoffeeScript 文件的转换器
    '^.+\\.coffee$': './src/coffee/coffeeTransformer.js',
  },
  testMatch: [
    // 匹配所有 .coffee 测试文件
    '**/test/*.coffee',
  ],
  moduleFileExtensions: ['js', 'coffee'], // 支持的文件扩展名
  collectCoverageFrom: ['src/coffee/*.coffee'], // 收集覆盖率
};
