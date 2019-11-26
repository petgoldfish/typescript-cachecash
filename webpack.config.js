const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');


var coreConfig = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.tsx', '.ts']
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist/node"),
    filename: "[name]/bundle.js",
  },
  mode: "development",
};

let targets = ['web', 'node'].map((target) => {
  let merged = webpackMerge(coreConfig, {
    target: target,
    entry: {
      cachecash: "./src/index.ts"
    },
    output: {
      path: path.resolve(__dirname, './dist/' + target),
      filename: '[name]/bundle.js',
      libraryTarget: "umd",
      library: "cachecash"
    }
    // TODO: we should probably mark grpc etc as externals. 
    // https://webpack.js.org/guides/author-libraries/#authoring-a-library
  });
  return merged;
});

// demonstrations
let demo = webpackMerge(coreConfig, {
  target: 'web',
  entry: {
    basic: "./demo/basic/bootstrap.js",
    bigbuckbunny: "./demo/bigbuckbunny/bootstrap.js",
    "html5-download": "./demo/html5-download/bootstrap.js"
  },
  output: {
    path: path.resolve(__dirname, './dist/demo'),
    publicPath: '../',
    filename: '[name]/bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'demo/basic/index.html', to: 'basic/index.html' },
      { from: 'demo/bigbuckbunny/index.html', to: 'bigbuckbunny/index.html' },
      { from: 'demo/html5-download/index.html', to: 'html5-download/index.html' },
      { from: 'demo/html5-download/style.css', to: 'html5-download/style.css' }
    ]),
    new webpack.DefinePlugin({
      'process.env.PUBLISHER_ADDR': JSON.stringify(process.env.PUBLISHER_ADDR),
    })
  ],
});
targets.push(demo);

module.exports = targets;
