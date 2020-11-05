# Select 选择器

<!-- :::demo select-basic
::: -->

:::demo select-multiple
:::

:::demo select-async
:::

:::demo select-async-with-value
:::

:::demo select-empty-text
:::

## props

### preset

- Type: `string`

用于系统中多次出现的固定的枚举值，可在初始化时定义一次。使用时直接传入该预置值字符串。

### optionList

- Type: `array`|`function`
- Default: `[]`

传入对象数组时，数组每一项需要提供 `labelName` 和 `valueName` 相应的值。

传入函数时，应返回可观察对象数组。在 Form Area 中使用时**必须**传入函数。两种用法见 [demo](#demo-select-async-with-value)

参考配置：

- [配置项 selectLabelName](../config.md#selectlabelname)
- [配置项 selectVabelName](../config.md#selectvaluename)

### labelName

### valueName

### v-model

## events

### change
