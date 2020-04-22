const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(!isDev) {
        config.minimizer = [
            new OptimizeCssWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (secLoader = '') => {
    const config = {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true 
        }
    }

    let loaders = [
        config, 
        'css-loader'
    ]

    !!secLoader ? loaders.push(secLoader) : null;

    return loaders;
}

const scriptLoaders = (presets = [], plugins = []) => {
    let config = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }
    }

    if(presets.length) {
        config = {
            ...config,
            options: {
                ...config.options,
                presets: [
                    ...config.options.presets,
                    ...presets
                ]
            }
        }
    }

    if(plugins.length) {
        config = {
            ...config,
            options: {
                ...config.options,
                plugins: [
                    ...config.options.plugins,
                    ...plugins
                ]
            }
        }
    }

    let loaders = [
        config
    ]

    isDev ? loaders.push('eslint-loader') : null;

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill' ,'./index.js'],
        analytics: './analytics.ts',
        react: './react.jsx'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', 'jsx'],
        alias: {
            '@models': path.resolve(__dirname, './src/models'),
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        port: 3322,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/favicon.ico'),
                to: path.resolve(__dirname, './dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.csv$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: scriptLoaders()
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: scriptLoaders(['@babel/preset-typescript'])
            },
            {
                test: /\.jsx$/,
                exclude: '/node_modules/',
                use: scriptLoaders(['@babel/preset-react'])
            },
            {
                test: /\.vue$/,
                exclude: 'node_modules',
                use: scriptLoaders(['@vue/babel-preset-app'])
            }
        ]
    }
}