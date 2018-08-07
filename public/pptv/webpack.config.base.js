/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import pkg from './package.json';
import uglifys from './uglify.json';
import UglifyJsParallelPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import HappyPack from 'happypack';

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const manifest = './dll/manifest.json';

let uglifyObj = {
    sourceMap: false,
    cache: true,
    parallel: os.cpus().length * 2
}
Object.assign(uglifyObj, uglifys.ug);

export function getDir(dir) {
    return path.resolve(__dirname, dir)
}

export function banner() {
    return new webpack.BannerPlugin({
        banner: ['/**',
            '\n * ...',
            '\n * @author ' + pkg.author,
            '\n * ' + new Date(),
            '\n */',
            '\n'
        ].join(''),
        raw: true,
        entryOnly: true
    })
}

export function uglify() {
    return new UglifyJsParallelPlugin(uglifyObj)
}

export function define() {
    return new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
}

export function dll() {
    return new webpack.DllPlugin({
        path: getDir(manifest),
        name: '[name]',
        context: __dirname
    })
}

function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool
    })
}

let basecfg = {
    devtool: process.env.NODE_ENV == 'production' ? false : "source-map",
    output: {
        path: getDir('./dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.less', '.css', '.json', '.jsx', '.vue', '.ts'],
        alias: {
            'zepto': getDir('./dll/zepto.js'),
            'store': getDir('./src/js/store'),
            'utils': getDir('./src/js/utils'),
            'views': getDir('./src/js/views'),
            'component': getDir('./src/js/component'),
            '@': getDir('./src')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'happypack/loader?id=happybabel',
            exclude: /node_modules/
        }, {
            test: /\.(jpg|png|gif)$/,
            use: "url-loader?limit=8192&publicPath=../dist&name=assets/[name].[ext]"
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style-[name].css",
            allChunks: true
        }),
        createHappyPlugin('happybabel', ['cache-loader', 'babel-loader']),
        banner()
    ]
}

if (uglifys.vue) {
    basecfg.module.rules = basecfg.module.rules.concat([{
        test: /\.vue$/,
        use: "vue-loader",
        exclude: /node_modules/
    }, {
        test:/\.(css|less)$/,
        use:[process.env.NODE_ENV == 'production'?MiniCssExtractPlugin.loader:'vue-style-loader', 'css-loader', 'less-loader']
    }])
    basecfg.plugins.unshift(new VueLoaderPlugin());
} else {
    basecfg.module.rules.push({
        test:/\.(css|less)$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    })
}

export function base() {
    if (fs.existsSync(manifest)) {
        basecfg.plugins.unshift(new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(manifest)
        }));
    }
    return basecfg;
}