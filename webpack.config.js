const path = require('path');
const { existsSync, lstatSync, readdirSync } = require('fs')
const isDirectory = path => existsSync(path)&&lstatSync(path).isDirectory()

const CopyWebpackPlugin = require('copy-webpack-plugin')

const sourceDirectory = path.join(__dirname, 'apps');
const outputDirectory = path.join(__dirname, 'public', 'apps');
const publicPath = '/apps/';

module.exports = {
  entry: {
    main: path.join(sourceDirectory, "main/src/index.js"),
  },
  output: {
    path: outputDirectory,
    publicPath: publicPath,
    filename: '[name]/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(svg|png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options:{
            name: function(name){
              let relative = path.relative(sourceDirectory, name);
              let appName = path.dirname(relative).split(path.sep)[0]
              let extName = path.extname(relative)

              return path.join(appName, '[hash]'+extName);
            }
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(function(){
      return readdirSync(sourceDirectory).reduce(
        (acc, appName) => {
          let indexPath = path.join(sourceDirectory, appName, 'public', 'index.html')
          if(existsSync(indexPath)){
            acc.push({from: indexPath, to: path.join(appName+'.html')});
          }
          let appPublicPath = path.join(sourceDirectory, appName, 'public')
          if(isDirectory(appPublicPath)){
            acc.push({from: appPublicPath, to: appName, ignore: ['index.html']});
          }
          return acc;
        }, []);
    }())
  ]
};