module.exports = {
  entry: './src/index.js',
  output:{
    // 虚拟打包路径，不会真的生成
    publicPath: 'dist',
    filename: 'bundle.js'
  },
  devServer:{
    port: 8080,
    open: true,
    contentBase: './public'
  }
}