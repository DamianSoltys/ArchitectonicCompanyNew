const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const bundlePath = path.resolve(__dirname, 'dist');

module.exports = {
    mode:'production',

    entry: {
        index: './src/scripts/index.js'
    },

    output: {
        path: bundlePath,
        filename: 'scripts/[name].[hash].js',
        chunkFilename: 'scripts/[id].[hash].js',
        publicPath: '../',
    },

    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules./,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|jfif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    publicPath: '../assets',
                    esModule: false,
                }
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            Assets: path.resolve(__dirname, 'src/assets'),
            Html: path.resolve(__dirname, 'src/html'),
            Styles: path.resolve(__dirname, 'src/styles'),
        }           
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css',
            chunkFilename: 'styles/[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'html/index.html',
            template: './src/html/index.html',
            inject: true,
            chunks: ['index'],
        })
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({}),
        ]
    }
}