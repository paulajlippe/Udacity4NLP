const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin')
const { DefinePlugin } = require ('webpack')

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
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new GenerateSW({
            swDest: './dist/service-worker.js'
            }),
        new DotenvPlugin({
            sample: './.env',
            path: './.env'
            }),
        new DefinePlugin({
            "process.env": JSON.stringify(process.env),
            }),
        // new DefinePlugin({
        //     'process.env': JSON.stringify(dotenv.config().parsed)
        // })
    ],
}

// // this is to load env vars for this config
// require('dotenv').config({ // it puts the content to the "process.env" var. System vars are taking precedence
//     path: '.env',
// });

// module.exports = (env) => {
//     '${process.env.API_KEY}',
//     console.log('Goal: ', env.goal); // 'local'
//     console.log('Production: ', env.production); // true
    // const isProduction = env.NODE_ENV === 'production';
    // const dotenvFilename = isProduction ? '.env' : '.env';
  
//     return {
//         entry: './src/index.js',
//         output: {
//             filename: 'bundle.js',
//             path: path.resolve(__dirname, 'dist'),
//         },
//     plugins: [
//         new Dotenv({
//             path: dotenvFilename,
//           }),
//       ],    
//     };
//   };
