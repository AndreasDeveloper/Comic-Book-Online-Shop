const path = require('path');   // path package, stored in path const var.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['@babel/polyfill', './resources/js/index.js'], // Entry point
    output: {
        path: path.resolve(__dirname, 'dist'),   // Outputs bundle to this directory
        filename: 'js/bundle.js'   // with this filename
    },
    devServer: {
        contentBase: './dist',   // live server direction
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './resources/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    module: {
        rules: [
            // -- BABEL LOADER --
            {
                test: /\.js$/,  // checks for all possible files that has .js in their name
                exclude: /node_modules/,    // excluding node_modules folder
                use: {
                    loader: 'babel-loader'
                }
            },
            // -- CSS/SCSS LOADER --
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            // -- URL/IMG LOADER --
            {
                test: /\.(png|jpg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/img/'
                        }
                    }
                ]
            }
        ]
    }
};
