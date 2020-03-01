const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const bundlePath = path.resolve(__dirname, 'dist');
const devPath = path.resolve(__dirname, 'src');


module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: {
        index: './src/scripts/index.js',
        common: './src/scripts/common.js',
    },

    output: {
        path: bundlePath,
        filename: 'scripts/[name].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
        publicPath: '/',
    },

    devServer: {
        port: 8080,
        contentBase: devPath,
        hot: true,
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
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: "pre",
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    configFile: "./.eslintrc.json"
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|jfif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images',
                    publicPath: '../assets/images',
                    esModule: false,
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    outputPath: 'assets/fonts',
                    publicPath: '../assets/fonts',
                }
            },
        ],
    },

    resolve: {  
        extensions: [".js", ".scss", ".html"],
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
            chunks: ['index','common'],
        }),
    ],
}