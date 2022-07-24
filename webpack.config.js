const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup:'./src/Popup.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [{ 
       test: /\.js$|jsx/, 
        exclude:/node_modules/,
        use: {
            loader: 'babel-loader',
            options : {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }
        },
       { type: 'javascript/auto', test: /\.json$/, use: [ { loader: 'file-loader', options: { name: '[name].json', outputPath: './', publicPath: './' } } ]},
        {
          test: /\.json$/,
          exclude: /node_modules/,
          use: [
              'file-loader?name=[name].[ext]&outputPath=portal/content/json'
          ]
      },
      {
        test: /strings\.json$/,
        use: ['webpack-json-access-optimizer'],
        type: 'json'
    },
        {
          test: /\.(jpe?g|png|gif|svg)$/i, 
          loader: 'file-loader',
          options: {
            name: '/public/icons/[name].[ext]'
          }
      },

        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
      }
      ],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template:'./src/popup.html',
    filename:'popup.html'
  }),
  new CopyPlugin({
    patterns: [
      { from: "public" },
    ],
  }),
 
],
};