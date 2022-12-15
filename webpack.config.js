const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const JavaScriptObfuscator = require('webpack-obfuscator');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/module.js',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new JavaScriptObfuscator({
        //     rotateStringArray: true
        // }),
        new CopyPlugin({
            patterns: [
                { from: "module.json", to: "" },
            ],
        }),
    ],
    output: {
        filename: 'module.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

};
