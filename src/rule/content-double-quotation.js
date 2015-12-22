/**
 *  [强制] 文本内容必须用双引号包围。
 *  done 报错加入需要仔细考虑
 */
var postcss = require('postcss');
var name = 'content-double-quotation';
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
                var offsetLen=0;
                var cssString = decl.prop + decl.raws.between;
                for (var i = 0, v; v = values[i++];) {
                    var oldOffsetLen=offsetLen;
                    offsetLen+= v.length;//记录位置，供报错使用 v.length; //记录包含首尾空格值的长度
                    v = v.trim();//以空格判断是否需要加双引号，首尾空格影响判断
                    if (/ /.test(v) || v[0]=="\'") {
                        //有空格的属性，必须加引号
                        if (v[0] !== '"' || v[v.length - 1] !== '"') {
                            var content = cssString+value.substring(0,offsetLen+i-1);
                            var raws = (decl.raws.before.replace(/\n/,"") + cssString+value.substring(0,oldOffsetLen+i-1)).split(/\n/);

                            var line = raws.length + decl.source.start.line-1;
                            var column = raws[raws.length-1].length+1;
                            result.warn(msg, {node: decl, type: errorType,content:content,line:line,column:column});

                        }
                    }

                }
            } else if (prop == 'content') {
                if (value[0] !== '"' || value[value.length - 1] !== '"') {
                    var cssString = decl.toString();
                    var column = (decl.prop+decl.raws.between).length+decl.source.start.column;
                    result.warn(msg, {node: decl, type: errorType,content:cssString,column:column});
                }
            }
        });
    }
});