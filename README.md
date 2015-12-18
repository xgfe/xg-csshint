# xg-csslint

支持规范:[xgfe-css规范](https://github.com/xgfe/codeguide/blob/master/css.md)中的强制部分,建议部分稍后添加

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
- -f 指定需要检测的css路径(暂不支持路径)

