const path = require('path');

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

module.exports = {
   mode: 'development',
   context: path.join(__dirname, './src'),
   entry: [
     './index.ts'
   ],
   module: {
    rules: [
      {
         test: /\.tsx?$/,
         exclude: /node_modules/,
         use: [
           isProduction && {
             loader: 'babel-loader',
             options: { 
               plugins: [
                 "react-hot-loader/babel", 
                 "syntax-dynamic-import"
               ] 
             }
           },  
           'ts-loader'
         ].filter(Boolean)
       }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      publicPath: '/'
   },
   target: 'node', // socket.io runs on Node runtime
   externals: {
      uws: "uws"  // deprecated dependency used in socket.io 
   }
};