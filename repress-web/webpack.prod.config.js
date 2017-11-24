/**
 * Created by chang on 2017/7/1.
 */
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require(path.resolve(__dirname, 'package.json'));


module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.jsx'),
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: './js/[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "presets": [
                        ["env", {"modules": false}], "react"],
                    "plugins": [
                        ['import', [{ libraryName: "antd", style: true }]],
                        ["transform-runtime", {
                            "helpers": false,
                            "polyfill": false,
                            "regenerator": true,
                            "moduleName": "babel-runtime"
                        }],
                        "transform-decorators-legacy",
                        "transform-async-to-generator",
                    ]
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!less-loader?{modifyVars:{"@primary-color":"#1DA57A"}}'
                }),
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: extractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader'}),
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=5000&name=./img/[name].[chunkhash:8].[ext]'
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=5000&name=./fonts/[name].[chunkhash:8].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            postcss() {
                return [require('autoprefixer')];
            }
        }),

        new webpack.BannerPlugin('Copyright by wjchang'),

        new htmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),

        new webpack.optimize.ModuleConcatenationPlugin(),

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.optimize.UglifyJsPlugin(),

        new extractTextPlugin('./css/[name].[chunkhash:8].css'),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: './js/[name].[chunkhash:8].js'
        }),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
        })
    ],

};

