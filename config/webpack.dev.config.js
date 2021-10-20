const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const Copy = require('copy-webpack-plugin')
// const AutoDllPlugin = require('autodll-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PORT = 8888
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 将打包后的资源注入到html文件内
        new HtmlWebpackPlugin({
            // inject: true, // will inject the main bundle to index.html
            template: resolve('../public/index.html'),
            // mapConfig:'http://192.168.0.1/map_config.js',
            // 这里列出要加入html中的js文件
            dlls: [
                './dll/vendor.dll.js',
                './dll/redux.dll.js',
            ],
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/`,
        }),
        // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 3015 }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: resolve('../src'),
        historyApiFallback: false,
        hot: false,
        host: '0.0.0.0',
        port: PORT,
        proxy: {
            '/api': {
                target: 'http://121.40.250.131:9091',
                pathRewrite: {
                    '/api':''
                }
            }
        }
    },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
