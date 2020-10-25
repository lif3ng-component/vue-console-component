# Switch 开关

:::demo switch-basic
:::

:::demo switch-loading-promise
:::

## props

### v-model

- Type: `boolean`
- Default: `false`

### disabled

- Type: `boolean`
- Default: `false`

显示为 disabled 状态，此时无法点击

### loading

- Type: `boolean`
- Default: `false`

显示为 loading 状态，此时呈现 disabled 状态并显示 loading 图标，无法点击。

设置为 `true` 时，`disabled` 属性无效

### togglePromiseFn

- Type: `function`
- Default: `null`

切换状态是运行此函数，参数为将要变成的状态(`true`/`false`)

- 返回值**必须**是一个 promise.
  - `pending` 展示 loading 图标
  - `fulfilled` 成功切换
  - `rejected` 未成功切换。处理异常时，注意**保持 `rejected` 状态**以便 switch 正确呈现

设置后，`disabled` 和 `loading` 属性无效
