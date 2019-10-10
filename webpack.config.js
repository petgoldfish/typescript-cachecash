const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpackMerge = require('webpack-merge');


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
      filename: '[name]/bundle.js'
    }
  });
  return merged;
});

// demonstrations
let demo = webpackMerge(coreConfig, {
  target: 'web',
  entry: {
	  basic: "./demo/basic/demo.js",
	  bigbuckbunny: "./demo/bigbuckbunny/demo.js",
	  "html5-download": "./demo/html5-download/demo.js"
  },
  output: {
    path: path.resolve(__dirname, './dist/demo'),
    publicPath: '../',
    filename: '[name]/bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
	    {from: 'demo/basic/index.html', to: 'basic/index.html'},
	    {from: 'demo/bigbuckbunny/index.html', to: 'bigbuckbunny/index.html'},
	    {from: 'demo/html5-download/index.html', to: 'html5-download/index.html'},
	    {from: 'demo/html5-download/style.css', to: 'html5-download/style.css'} 
    ])
  ],
  });
targets.push(demo);

module.exports = targets;
