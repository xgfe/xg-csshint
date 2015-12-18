/**
 *  [强制] font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。
 */

var postcss = require('postcss');
var name = 'unifying-font-family-case-sensitive';
var msg = '`font-family` case insensitive, but in the same project, the same` Family Name` case must be unified.';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    global.fontFamilyPart=global.fontFamilyPart||{};
    return function (css, result) {
        css.walkDecls(function(decl){
            if(decl.prop==='font-family'){
                var parts = postcss.list.comma(decl.value);
                for(var i= 0,part;part=parts[i++];){
                    var lowerCasePart=part.toLowerCase();

                    if(global.fontFamilyPart[lowerCasePart]){
                        //如果已经存在同样的font-family 检测是否字符串相等
                        if(global.fontFamilyPart[lowerCasePart]!==part){
                            result.warn(msg,{node:decl,type:errorType});
                        }
                    }else{
                        global.fontFamilyPart[lowerCasePart]=part;
                    }
                }
            }
        })
    }
});
