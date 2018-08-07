/**
 * ...
 * @author minliang1112@foxmail.com
 */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { base, define, uglify, banner } from './webpack.config.base';
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

let entryObj = {}, htmlArr = [], baseObj = base();
let getEntry = (dir) => {
    fs.readdirSync(dir).map((item) => {
        let _name = path.basename(item, path.extname(item));
        htmlArr.push(new HtmlWebpackPlugin({
            template: './src/template/template.js',
            filename: '../page/' + _name + '.html',
            chunks: [_name],//引入当前单页库
            root: 'app',
            common: ['../dist/mgvendor.js', '../dist/global.js'], //引入公共库
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        }));
        entryObj[_name] = dir + item;
    });
    entryObj['global'] = ['../../lib/rem.js'];
    baseObj.plugins = baseObj.plugins.concat(htmlArr);
}

getEntry(
    "./src/js/views/"
);

let config = merge(base(), {
    entry: entryObj
});
export default () => {
    if (process.env.NODE_ENV == 'production') {
        config = merge(config, {
            plugins: [
                define(),
                uglify(),
                new OptimizeCSSAssetsPlugin({}),
                config.plugins.pop()
            ]
        })
    }
    return config;
}