# 警告完工列表
- √ 2.1 CSS 文件使用无 BOM 的 UTF-8 编码
- x(跳过) 2.4 对于超长的样式，在样式值的 空格 处或 , 后换行，
- x(跳过) 2.5  一些典型的class场景命名应包含公共有意义的前缀，如 g-(全局), m-(模块), ui-(ui组件), j
- √ 3.1 如无必要，不得为 id、class 选择器添加类型选择器进行限定
- √ 3.1 尽量不使用id选择器定义样式
- √ 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。
- √ 尽量少用 * 选择器
- x(跳过)在可以使用缩写的情况下，尽量使用属性缩写
- x(跳过) 使用 border / margin / padding 等缩写时，应注意隐含值对实际数值的影响，确实需要设置多个方向的值时才使用缩写。
- x(跳过) 同一 rule set 下的属性在书写时，应按功能进行分组，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性
- x(跳过) 当元素需要撑起高度以包含内部的浮动元素时，通过对伪类设置 clear 或触发 BFC 的方式进行 clearfix。尽量不使用增加空标签的方式
- √ 尽量不使用 !important 声明。
- x(跳过) 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 !important 定义样式
- x 当需要强制指定样式且不允许任何场景覆盖时，通过标签内联和 !important 定义样式。
- x 将 z-index 进行分层，对文档流外绝对定位元素的视觉层级关系进行管理
- x 在可控环境下，期望显示在最上层的元素，z-index 指定为 9999
- x 在第三方环境下，期望显示在最上层的元素，通过标签内联和 !important，将 z-index 指定为 2147483647
- √ 颜色值在同一个项目中不要又有大写又有小写
- √ 需要在 Windows 平台显示的中文内容，不要使用除 normal 外的 font-style。其他平台也应慎用
- √ line-height 在定义文本段落时，应使用数值
- x 尽可能在浏览器能高效实现的属性上添加过渡和动画。
- x 尽可能给出在高分辨率设备 (Retina) 下效果更佳的样式
- x 需要添加 hack 时应尽可能考虑是否可以采用其他方式解决
- x 尽量使用简单的 属性 hack
- x 注释标准