/**
 *  [强制] 带私有前缀的属性由长到短排列，按冒号位置对齐，标准属性放在最后。
 */

var postcss = require('postcss');
var name = 'vendor-prefixes-sort';
var msg = 'With private prefix attribute from long to short, according to the colon position alignment';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkRules(function (rule) {
            var prefixesList = getPreList(rule);

            for(var k in prefixesList){
                if(prefixesList.hasOwnProperty(k)){
                    var list=prefixesList[k];
                    //第一步，检查是否由长到短排列
                    if(checkSort(list,result)) return;
                    else if(colonSort(list,result)) return;
                }
            }
        });
    }
});

var prefixesReg = /^(-webkit-|-moz-|-ms-|-o-)([\s\S]*$)/;//获取带前缀的值
/**
 * 获取rule里面带私有前缀的属性，按标准属性分组
 * @param rule
 * @returns {{}}
 */
function getPreList(rule) {
    var list = {};
    rule.walkDecls(function (decl) {
        var match = decl.prop.match(prefixesReg);
        if (match) {
            var prop = match[2].toLocaleLowerCase();
            if(!list[prop]){
                list[prop]=[];
                //重新扫描，放入列表中，主要是怕漏掉标准属性写在前面的情况，影响报错;
                rule.walkDecls(function(decl){
                    if(decl.prop.indexOf(prop)>-1){
                        list[prop].push(decl);
                    }
                });
            }
        }
    });
    return list;
}
/**
 * 检查是否按从长到短排序
 * @param list
 * @param result
 * @returns {boolean}
 */
function checkSort(list,result){
    var len=list[0].prop.length;
    for(var i= 1,l;l=list[i++];){
        var prop= l.prop;
        if(prop.length>len){
            result.warn(msg,{node:l,type:errorType});
            return true;
        }else{
            len=prop.length;
        }
    }

    return false;
}
/**
 * 检查是否根据冒号对齐
 * @param list
 * @param result
 */
function colonSort(list,result){
    var firstColonIndex;
    for(var i= 0,l;l=list[i++];){
        var colonIndex= l.raws.before.length+ l.prop.length;
        if(!firstColonIndex){
            firstColonIndex=colonIndex;
        }else if(firstColonIndex!==colonIndex){
            result.warn(msg,{node:l,type:errorType});
            return true;
        }
    }
    return false;
}