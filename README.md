# xg-csslint

支持规范:[xgfe-css规范](https://github.com/xgfe/codeguide/blob/master/css.md)中的[强制]部分,[建议]部分稍后添加

## 使用方法



在项目目录下创建一个xg-csshint.json,`files`指定需要检测的文件,`ignore`指定忽略内容.具体设置可以参照[glob语法](https://github.com/isaacs/node-glob)

```
{
  "files":["css/**/*.css"],
  "ignore":"css/**/*.test.css"
}
```

安装程序
```
npm install -g xg-csshint
xg-csshint
```

## 参数
- -v||-version  打印当前版本
- -p 手动指定config文件
- -f 指定需要检测的css路径 注意-f中的路径会覆盖config中的路径

## 引入使用方法  

```
var fs = require("fs");
var csshint = require("xg-csshint");
var config = {};
var cssParse=csshint(config);

fs.readFile('./disallow-import.css',function(err,res){
    var css=res.toString();
    cssParse(css);
    ...
})
```
[规则参考](https://github.com/xgfe/xg-csshint/blob/master/src/config.js)
返回一个messages数组

```
[{
 text, //报错信息
 line, //错误行
 column, //错误列
 level, //错误等级，1 error 2 warning
 content, //css错误片段
 plugin //规则名称
}]
```
## ChangeLog
[changelog](https://github.com/xgfe/xg-csshint/blob/master/ChangeLog.md)