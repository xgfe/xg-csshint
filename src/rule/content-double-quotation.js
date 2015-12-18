/**
 *  [强制] 文本内容必须用双引号包围。
 *  TODO 报错加入需要仔细考虑
 */
var postcss = require('postcss');
var name = 'decl-end-of-semicolon';
var msg = 'Surrounded by text content must be enclosed in double quotation marks';
var errorType = 'error';

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkDecls(function (decl) {
            var prop = decl.prop;
            var value = decl.value.trim();
            var flags = false;
            //只有这几个属性需要双引号包围，每个单独处理
            if (prop == 'font-family') {
                var values = value.split(',');
                for (var i = 0, v; v = values[i++];) {
                    v = v.trim();//以空格判断是否需要加双引号，首尾空格影响判断
                    if (/ /.test(v)) {
                        //有空格的属性，必须加引号
                        if (v[0] !== '"' || v[v.length - 1] !== '"') {
                            flags = true;
                        }
                    }
                }
            } else if (prop == 'content') {
                if (value[0] !== '"' || value[value.length - 1] !== '"') {
                    flags = true;
                }
            } else if (prop == 'quotes') {
                //这里因为没有固定的分隔符，所以逐字检测
                var inner = false;
                for (var i = 0, v; v = value[i++];) {

                    if (!inner) {
                        switch (v) {
                            case '"':
                                inner = true;
                                break;
                            case "'":
                                flags = true;
                                break;
                            case " ":
                                if (!/\s/.test(value[i]) && value[i]!=='"') {
                                    //包含错误的引号
                                    flags = true;
                                }
                                break;
                            default :
                                flags=true;
                        }
                    } else {
                        switch (v) {
                            case '"':
                                //碰到闭合双引号，表示这个属性结束
                                inner = false;
                                break;
                            case '\\':
                                //碰到转义字符，跳过下一个的检测
                                i++;
                                break;
                        }
                    }

                    if (flags) {
                        break;
                    }
                }
            }

            if (flags) {
                result.warn(msg, {node: decl, type: errorType});
            }
        });
    }
});