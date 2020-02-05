# Form 表单

基础表单，内部需要嵌套 form item 子组件，可以用于编写自定义表单项的表单。

缺点是对于基础类型的表单项（如：input、select），重复代码过多。所以对于常规表单，不推荐使用该组件，推荐使用 [Form area](formarea.md) 更简洁的完成业务代码的编写,其中有几个 prop 会透传至该组件。

## props
### hideLabel
- Type: `boolean`
- Default: `false`

隐藏 label 列，用于占满整行的表单项。

### rules
- Type: `object`
- Default: `{}`








