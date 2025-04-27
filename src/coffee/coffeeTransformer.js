const CoffeeScript = require('coffeescript');

module.exports = {
  process(src, filePath) {
    // 编译 CoffeeScript -> JS
    const code = CoffeeScript.compile(src, {
      bare: true, // 移除 IIFE 包裹
      filename: filePath, // 保留文件名信息
      sourceMap: false, // 如果不需要 Sourcemap 可关闭
    });
    return { code };
  },
};
