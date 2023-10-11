const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
// const EnvironmentPlugin = require('EnvironmentPlugin')

// We use the loader supplied by plugin instead of style-loader here. This enables putting the styles
// as a stylesheet in the HTML, as opposed to styles done via JS in case of style-loader.

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./dist/index.html",
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new GenerateSW({
            swDest: './dist/service-worker.js'
            }),
        // new WorkboxPlugin.GenerateSW('./dist/service-worker.js')
        // new Dotenv({
        //     path: '.env',
        //   }),
        // new EnvironmentPlugin({
        //     NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        //     DEBUG: false,
        //     })
    ],
}
// module.exports = (env) => {
//     '${process.env.API_KEY}',
//     console.log('Goal: ', env.goal); // 'local'
//     console.log('Production: ', env.production); // true
  
//     return {
//         entry: './src/index.js',
//         output: {
//             filename: 'bundle.js',
//             path: path.resolve(__dirname, 'dist'),
//         },
//     plugins: [
//         new GenerateSW({
//             swDest: './service-worker.js'
//             }),
//         new Dotenv({
//             path: dotenvFilename,
//           }),
//         // new EnvironmentPlugin({
//         // NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
//         // DEBUG: false,
//         // })
//       ],    
//     };
//   };
