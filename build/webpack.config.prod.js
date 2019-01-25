const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const base = require('./webpack.config.base');

const {
    title,
    p
} = require('./config');

const seen = new Set();
const nameLength = 4;

module.exports = merge(base, {
    mode: 'production',
    // devtool: '#@cheap-eval-source-map',
    entry: [
        path.resolve(p.ENTRY, 'index.jsx')
    ],
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'common/js/[name].[chunkhash].js',
        path: p.OUTPUT,
        publicPath: '/'
    },
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     root: p.ROOT
        // }),
        new HtmlWebpackPlugin({
            title,
            filename: 'index.html',
            template: `${p.ENTRY}/index.html`,
            inject: true
        }),
        new MiniCssExtractPlugin({
            // 这里需要使用contenthash，原因：在css没有修改的情况下，如果使用其他hash，那么js的变化也会引起css的变化；contenthash就是为了解决这个问题而出现的
            // filename 是指在入口文件entry中引入生成出来的文件名
            filename: 'css/[name].[contenthash].css',
            // chunkname是指那些未被在入口文件entry引入，但又通过按需加载（异步）模块的时候引入的文件
            chunkFilename: 'common/css/[name].[contenthash].css',
        }),

        new webpack.NamedChunksPlugin(chunk => {
            if (chunk.name) {
                return chunk.name;
            }

            const modules = Array.from(chunk.modulesIterable);

            if (modules.length > 1) {
                const hash = require("hash-sum");
                const joinedHash = hash(modules.map(m => m.id).join("_"));
                let len = nameLength;

                while (seen.has(joinedHash.substr(0, len))) len++;

                seen.add(joinedHash.substr(0, len));

                return `chunk-${joinedHash.substr(0, len)}`;
            } else {
                return modules[0].id;
            }
        }),
    ],
    optimization: {
        moduleIds: 'hashed',
        noEmitOnErrors: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: {
                    safe: true,
                    // 这个插件会将通过autoprefixer添加的前缀删除，所以这里需要设置为true, 禁用掉cssnano对于浏览器前缀的处理。
                    autoprefixer: {
                        disable: true
                    },
                    mergeLonghand: false,
                    discardComments: {
                        removeAll: true // 移除注释
                    }
                },
                canPrint: true
            }),
            // new UglifyJsWebpackPlugin({
            //     exclude: /node_modules/,
            //     // 是否启用文件缓存，用来加快压缩速度。启用后js文件名不变并且内容不变就会读取缓存文件，不重新压缩
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true,
            //     uglifyOptions: {
            //         output: {
            //             // 最紧凑的输出
            //             beautify: true,
            //             // 删除所有的注释
            //             comments: false
            //         },
            //         compress: {
            //             // 在UglifyJs删除没有用到的代码时不输出警告
            //             warnings: true,
            //             // 删除所有的console.log语句
            //             drop_console: true,
            //             // 内嵌定义了但是只用到一次的变量
            //             collapse_vars: true,
            //             // 提取出出现多次但是没有定义成变量去引用的静态值
            //             reduce_vars: true
            //         }
            //     },
            // })
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                common: {
                    test: /node_modules/,
                    name: 'common',
                    chunks: 'initial', // 只打包初始时依赖的第三方
                    priority: 10
                }
            }
        }
    }
})