var path = require('path');
module.exports = {
    resolve: { //配置被打包的模块
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    entry: './app/main.js',
    output: {
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.sass$/,
            loader: 'style!sass'
        },
        {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: './[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: './img/[name].[ext]'
            }
        }, {
            test: /index.html/,
            loader: 'file-loader',
            query: {
                name: './index.html'
            }
        }]
    }
}
