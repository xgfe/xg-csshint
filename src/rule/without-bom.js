/**
 * Author liuyang46@meituan.com
 * Date 16/1/28
 * [建议] CSS 文件使用无 BOM 的 UTF-8 编码。
 */
"use strict";

var postcss = require('postcss');
var chalk = require("chalk");
var name = "without-bom";
var msg = 'File could not have bom';
var errorLevel;

module.exports = postcss.plugin(name, function (options) {

    return function (css, result) {

        var config = options.config;
        errorLevel = config[name].level;
        if(errorLevel===0) return;
        var fileBuffer = new Buffer(options.fileOriginalContent);
        if (fileBuffer[0].toString(16) == 'ef' && fileBuffer[1].toString(16) == 'bb' && fileBuffer[2].toString(16) == 'bf') {
            result.warn(msg, {
                node: "",
                level: errorLevel,
                line: 1,
                column: 1,
                content: "",
            });
        }

    }
});