/**
 * Created by chang on 2017/7/1.
 */
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'src', 'index.js')
    ],
    devtool: 'source-map',
    output: {
        filename: "bundle.js",
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
                exclude: [/node_modules/,/\.less$/,],
                loader: 'style-loader!css-loader!postcss-loader!less-loader?{modifyVars:{"@primary-color":"#1DA57A"}',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=5000'
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=5000'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new webpack.LoaderOptionsPlugin({
            postcss() {
                return [require('autoprefixer')];
            }
        }),

        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev'),
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
        })
    ],

    devServer: {
        publicPath: '/',
        historyApiFallback: true,
        clientLogLevel: 'none',
        host: 'localhost',
        port: 8030,
        open: true,
        openPage: '',
        hot: true,
        inline: true,
        compress: true,
        stats: {
            colors: true,
            errors: true,
            warnings: true,
            modules: false,
            chunks: false
        }
    }

};

