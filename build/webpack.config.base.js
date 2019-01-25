const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const {
    p
} = require('./config');
const {
    ENTRY,
} = p;

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.css',
            '.sass',
            '.json'
        ],
        alias: {
            '@page': path.resolve(ENTRY, 'pages'),
            '@component': path.resolve(ENTRY, 'components')
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                // 排除 node_modules 目录下的文件
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
};