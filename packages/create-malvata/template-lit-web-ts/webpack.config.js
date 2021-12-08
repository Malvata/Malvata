const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var PACKAGE = require('./package.json');
var version = PACKAGE.version;
console.log(version)
module.exports = env => {
    return {
        entry: "./src/main.ts",
        output: {
            filename: `[name].bundle.${version}.js`,
        },
        devtool: false,
        module: {
            rules: [{
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {}
                    }]
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 5,
                        name: '[name].[hash].[ext]',

                    },
                },
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".json"],
            alias: {
                path: require.resolve("path-browserify"),
            }
        },
        externals: {},
        plugins: [
            new HtmlWebpackPlugin({ filename: "index.html", template: "index.html", title: "lit-ts", favicon: "./favicon.svg", }),
            new ForkTsCheckerWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    // { from: "./node_modules/xy-ui/iconfont", to: "iconfont" },
                    // { from: "favicon.ico", to: "favicon.ico" },
                    { from: "assets", to: "assets" },
                    { from: "lang", to: "lang" },
                    { from: "doc", to: "doc" },
                ],
            }),
            new webpack.DefinePlugin({
                version: `'${version}'`,
            }),
            new webpack.SourceMapDevToolPlugin({}),
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'server',
            //     // generateStatsFile: true,
            //     // statsOptions: { source: false }
            // })
        ],
        devServer: {
            static: './dev',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};