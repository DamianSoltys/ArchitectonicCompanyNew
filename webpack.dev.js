const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); 
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const bundlePath = path.resolve(__dirname, 'dist');
const devPath = path.resolve(__dirname, 'src');

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: {
        index: './src/scripts/index.js'
    },

    output: {
        path: bundlePath,
        filename: 'scripts/[name].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
        publicPath: '/',
    },

    devServer: {
        port: 8080,
        contentBase: devPath
    },

    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
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
                    publicPath: 'assets',
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
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
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