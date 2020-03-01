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
        index: './src/scripts/index.js', 
        common: './src/scripts/common.js',
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
            Scripts: path.resolve(__dirname, 'src/scripts'),
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
            inject: 'true',
            chunks: ['index','common','vendor'],
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({}),
        ],
        namedChunks: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true
                },
            }    
        }
    }
}