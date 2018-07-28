const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: { 
    rules: [{
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
    }]
  }
};
