const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },

            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 9000,
        contentBase: "./dist",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TODO',
            filename: 'index.html',
            template: './src/index.html',
            hash: true
        }),
        new webpack.EnvironmentPlugin({
            'API_URL': 'http://localhost:8080/',
            'MOCK': false
        })
      ]
};