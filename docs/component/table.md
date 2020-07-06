# Table 表格

表格用于显示列表数据，一行显示不开的内容自动在鼠标悬停 tooltip 中显示，某一列可配置条件显示，提供异步列排序功能，提供插槽可显示操作列或自定义render。

## props

### data
- Type: `Array`
- Default: `[]`

表格数据，数组长的和表格行数一致。

### columns
- Type: `Array`
- Default: `[]`

列描述，每一项包含以下属性：

#### label
- Type: `String`

表头显示内容

#### prop
- Type: `String`

不使用插槽时，代表数据中的字段名。

使用插槽时，插槽名为 `col-[prop]`.

此项必填项，会用作key，不可重复。

#### show
- Type: `function`

函数包裹的可观察对象，例如： `show: () => this.foo !== 'bar'`.

#### align
- Type: `String`
- Default: `'left'|'right'`

控制单元格对齐方式，不设置默认居中显示单元格内容。

#### sort
- Type: `Boolean`
- Default: `false`

该列是否可排序。设置为 `true` 后，表头显示升序降序的只是按钮。

排序为异步排序，目前只在 [分页表格](pagintable.md) 中可用。

#### tooltip
- Type: `function`

传入 tooltip 文本的渲染函数。例如：显示图标，悬停时显示 tooltip 文字。















### emptyText
- Type: `String`
- Default: `'暂无数据'`

没有数据时的显示文字。







:::demo table-column-style
:::

:::demo demo-table
:::

:::demo table-toggle-column
:::