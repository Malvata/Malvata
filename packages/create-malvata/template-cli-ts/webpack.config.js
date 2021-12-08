const path = require("path");
const webpack = require("webpack");
var nodeExternals = require('webpack-node-externals');

module.exports = env => {
    return {
        entry: "./src/main.ts",
        output: {
            filename: 'main.js',
            chunkFormat: 'commonjs',
        },
        mode: "development",
        devtool: false,
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
        },
        target: 'node', // in order to ignore built-in modules like path, fs, etc.
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        plugins: [
            new webpack.SourceMapDevToolPlugin({}),
            new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
        ],
        devServer: {
            static: './dev',
        },
    };
};