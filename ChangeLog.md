# Change Log

## [Unreleased]

## 0.3.2

- 修改规则文件为.csshintrc

## 0.3.0
- 加入警告规则
- 部分警告规则无法实现，查看未实现列表[doc](https://github.com/xgfe/xg-csshint/blob/master/doc/doc.md)

## 0.2.0

- 将部分规则的公共部分抽出成可配置文件
- 调整代码，去掉了引用global变量
- 加入index.js，供别人引入使用

## 0.1.2

### Changed

- 初次尝试抽出公共部分作为默认配置项，还不完美待后续补充
- 修改cli.js 使其支持默认配置和用户配置的载入，用户配置的优先级高于默认
