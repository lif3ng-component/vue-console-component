# Form Area 表单区域

Form Area 用于组织表单项，内部为 Form 组件，支持完整的 数据绑定 和 表单校验。

采用声明式调用，使用时在 template 中不必编写 Form、FormItem、Input/Select... 层层嵌套，只需声明表单绑定对象（v-model)、表单项（items) 和 校验规则（rules)，即可完成业务编写，便于后续迭代升级。
:::demo formarea-basic
:::

<!-- :::demo formarea-noborder-mutil
::: -->

:::demo formarea-all-item
:::

:::demo formarea-header-extra
:::

## props

### title

- Type: `string`
- Default: `'基本信息'`

头部显示文字

### hideLabel

- Type: `boolean`
- Default: `false`

隐藏 label 区域

### noBorder

- Type: `boolean`
- Default: `false`

隐藏边框。隐藏后背景色自动置为透明，隐藏头部，`title` 不再显示。

### enterSubmit

- Type: `boolean`
- Default: `false`

回车键触发 `form 组件` 提交。提交方法为 [submitFn](#submitfn)

### submitFn

- Type: `function`
- Default: `undefined`

当 `enterSubmit` 为`true`时需要提供此方法。

### items

- Type: `array`
- Default: `[]`

`form 组件` items

#### items item

### rules

- Type: `object`
- Default: `{}`

`form 组件` [rules](form.md#rules)

单条规则除了常规对象写法外，还提供了字符串简写。

简写：

- `"required"` 必填项
- `"email"` 邮箱
- `"mobile"` 手机号

简写方式提供了统一的中文提示，暂未处理 i18n 的场景。

### v-model

- Type: `object`
- Default: `{}`

`form 组件` v-model 双向绑定对象

## slot

### headerExtra

头部右侧内容
