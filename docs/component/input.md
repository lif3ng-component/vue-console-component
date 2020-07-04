# Input 输入框

:::demo input-basic
:::

## props

### value(v-model)

- Type: `any`

绑定的值。

### iconBefore

- Type: `string`
- Default: `undefined`

Input 中前面的图标 `type` 值。

### iconAfter

- Type: `string`
- Default: `undefined`

Input 中后面的图标 `type` 值。

### iconAfterCanClick

- Type: `function`
- Default: `undefined`

Input 中后面的图标是否可以点击。传入参数即为绑定的点击事件，此时鼠标悬停会鼠标指针呈现 `pointer` 状态。

### textAppend

- Type: `string`
- Default: `undefined`

Input 后缀文字的显示，如：邮箱 domain，单位。
