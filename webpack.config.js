const path = require('path');   // path package, stored in path const var.
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

module.exports = {
    entry: ['@babel/polyfill', './resources/js/index.js'], // Entry point
    output: {
        path: path.resolve(__dirname, 'dist'),   // Outputs bundle to this directory
        filename: 'js/bundle.js'   // with this filename
    },
    devServer: {
        contentBase: './dist',   // live server direction
        open: true,
        port: 8080
    },
    plugins: [
        // MARKUPS
        new HtmlWebpackPlugin({ // LANDING PAGE
            filename: 'html/landing/landing.html',
            template: './resources/html/landing/landing.html'
        }),
        new HtmlWebpackPlugin({ // SHOP PAGE
            filename: 'html/shop/index.ejs',
            template: './resources/html/shop/index.ejs'
        }),
        new HtmlWebpackPlugin({
            filename: 'html/authentication/login.html',
            template: './resources/html/authentication/login.html'
        }),
        new HtmlWebpackPlugin({ // NAVIGATION PARTIAL
            filename: 'html/partials/navigation.ejs',
            template: './resources/html/partials/navigation.ejs',
            excludeAssets: [/main.css/, /bundle.js/] // Excluding css from this file
        }),
        // PLUGIN SETUPS
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // Calling/Activating ExcludeAssets Plugin
        new HtmlWebpackExcludeAssetsPlugin()
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
            },
            // IMG/URL LOADER IN HTML
            {
                test: /\.(html|ejs)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href', 'img:data-lazy']
                    }
                }
            }
        ]
    }
};