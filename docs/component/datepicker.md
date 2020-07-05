# Datepicker 日期时间选择器

:::demo datepicker-basic
:::

:::demo datepicker-in-form
:::

## props

### value(v-model)

- Type: `number`

绑定时间的时间戳。

### initValue

- Type: `string` | `number`

初始时间，可传入字符串 `"now"`，挂载后会自动 emit 当前时间（时间戳具体值和 `type` 相关）。

### type

- Type: `string`
- Default: `"sec"`

时间选择的粒度，可选值为：`"year"`,`"month"`,`"date"`,`"sec"`.

### boundary

- Type: `string`

可选值为 `"start"`, `"end"`. 决定 emit 时间戳的具体位置。

目前仅对 `type="date"` 生效，此时设置成 `"end"`, 时间部分为 `23:59:59:999`.

### max

- Type: `string` | `number`

可选时间的最大值，可设置为 `"now"` 或具体时间戳数值。

### min

- Type: `string` | `number`

可选时间的最小值，可设置为 `"now"` 或具体时间戳数值。
