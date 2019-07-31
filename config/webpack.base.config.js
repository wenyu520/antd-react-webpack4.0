const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
    entry: {
        client: resolve('../src/index.js'),
    },
    output: {
        path: resolve('../dist'),
        filename: '[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js',
        // publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: { },
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: [resolve('../src')],
                // loader: 'babel',
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
            },
            {
                test: /\.(less|scss)$/,
                // exclude: /node_modules/,
                include: [
                    resolve('../src/styles'),
                    resolve('../src/components'),
                    resolve('../node_modules/antd'),
                    resolve('../node_modules/draft-js'),
                ],
                loader: ExtractTextPlugin.extract({fallback: 'style', use: 'happypack/loader?id=happyStyle'}),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style', use: 'happypack/loader?id=antdCss'})
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [resolve('../src/images')],
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:4].[ext]'
                }
            },
        ],
    },
    plugins: [
        // 去除moment的语言包
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel?cacheDirectory=true',
            }],
            //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            id: 'antdCss',
            loaders: [
                {
                    loader:'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true,
                    },
                },
            ],
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyStyle',
            //如何处理  用法和loader 的配置一样
            loaders: [
                'css-loader?sourceMap=true',
                'sass-loader?sourceMap=true',
                'less-loader?sourceMap=true',
                ],
            //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 提取css
        new ExtractTextPlugin('style.[hash:4].css'),
        /* new webpack.optimize.CommonsChunkPlugin({
          name: 'common', // 入口文件名
          filename: 'common.[hash:4].js', // 打包后的文件名
          minChunks: function (module, count) {
            return module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(resolve('../node_modules')) === 0
          }
        }), */
  /*      new webpack.optimization.splitChunks ({
            async: 'async-common',
            minChunks: 3,
        }),*/
        // 关联dll拆分出去的依赖
        new webpack.DllReferencePlugin({
            manifest: require('../src/dll/vendor.manifest.json'),
            context: __dirname,
        }),
        // 关联dll拆分出去的依赖
        new webpack.DllReferencePlugin({
            manifest: require('../src/dll/redux.manifest.json'),
            context: __dirname,
        }),
    ]
}

module.exports = webpackConfigBase
