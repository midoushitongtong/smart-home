const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // antd 按需加载
  fixBabelImports('babel-plugin-import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // less 编译器
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]' // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  })
);
