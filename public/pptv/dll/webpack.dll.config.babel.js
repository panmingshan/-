/**
 * ...
 * @author minliang1112@foxmail.com
 */

'use strict';

import os from 'os';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import uglifys from '../uglify.json';
import {
    getDir,
    dll,
    define,
    uglify,
    banner
} from '../webpack.config.base';

let content = '';
let main = '';
let dir = '../../lib/zepto/1.2.0';
let zepto_js = './dll/zepto.js';
let readFile = (src) => {
    fs.readdirSync(src).forEach((file)=>{
        let _path = [src, file].join('/');
        let info = fs.statSync(_path);
        if (info.isDirectory()) {
            readFile(_path);
        } else {
            if (_path.includes('zepto.js')) {
                main = fs.readFileSync(_path).toString();
            } else {
                content += '\n\n//     This is ths plugin ******************** '+ file + ' ********************\n' + fs.readFileSync(_path).toString();
            }
        }
    });
}

let vendors = ["vue","vue-resource","vue-router","vuex",getDir(zepto_js)];

let config = {
    entry: {
        mgvendor: vendors
    },
    output: {
        path: getDir('./dist'),
        filename: '[name].js',
        library: '[name]'
    },
    module: {
        rules: []
    },
    plugins: [
        dll(),
        banner()
    ]
}

if (uglifys.isES5) {
    config.module.rules.push({
        test: /.js$/,
        enforce: 'post', // post-loader处理
        use: 'es3ify-loader'
    })
}

export default () => {
    readFile(dir);
    let umd = [
        '(function(global, factory) {',
        '    if(typeof module === "object" && module.exports){',
        '      module.exports = factory(global);',
        '    } else if (typeof define === "function" && define.amd) {',
        '      define(function() { return factory(global) });',
        '    } else factory(global);',
        '}(typeof window !== "undefined" ? window : this, function(window) {',
                main + '\n' + content,
        '    return Zepto',
        '}))'
    ].join('\r\n');
    fs.writeFileSync(zepto_js, umd);
    //
    if (process.env.NODE_ENV == 'production') {
        config = merge(config, {
            plugins: [
                define(),
                uglify(),
                config.plugins.pop()
            ]
        })
    }
    return config;
}