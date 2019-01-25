const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const base = require('./webpack.config.base');

const {
    devServer,
    title,
    p
} = require('./config');

module.exports = merge(base, {
    mode: 'development',
    devtool: '#source-map',
    entry: [
        "react-hot-loader/patch",
        // webpack-dev-server/client只需要再node启动webpack-dev-server才需要添加
        // "webpack-dev-server/client?http://127.0.0.1:8080",
        // 在 HMR 更新失败之后，自己刷新页面
        "webpack/hot/only-dev-server",
        path.resolve(p.ENTRY, 'index.jsx')
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: 'common/[name].[hash].js',
        path: p.OUTPUT,
        publicPath: '/'
    },
    devServer: {
        port: devServer.port,
        host: devServer.host,
        hot: true,
        // 默认inilne为true：一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
        // inline: true,
        overlay: { //显示错误信息
            errors: true
        },

        // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title,
            filename: 'index.html',
            template: `${p.ENTRY}/index.html`,
            inject: true
        }),

        new webpack.HotModuleReplacementPlugin()
    ]
})