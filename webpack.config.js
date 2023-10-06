const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import { GenerateSW } from 'workbox-webpack-plugin';
const EnvironmentPlugin = require('EnvironmentPlugin');

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    module: {
        rules: [
            {
                test: '\/.js$',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ],
    },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),
            new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
            }),
            new GenerateSW({
                swDest: '../../../dist/service-worker.js'
              }),
            new EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false,
            })
        ]
}
module.exports = (env) => {
    // Use env.<YOUR VARIABLE> here:
    console.log('Goal: ', env.goal); // 'local'
    console.log('Production: ', env.production); // true
  
    return {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    };
  };
