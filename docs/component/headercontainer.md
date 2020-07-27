# 头部容器 Header Container
用于展示头部 Logo、站点名称、链接、下拉菜单。

:::demo headercontainer
:::

## slot
### logo
`logo` 插槽用于显示 logo 图片和文字。**只能**包含图片和文字，组件会根据插槽内容（vnode array）重新布局。

可通过为 `img` 绑定 `click` 事件为整个 logo 区域绑定 `click` 事件，绑定后鼠标悬停于 logo 区域呈现 `pointer` 状态。
```html
<template #logo>
  <img src="/path/to/logo/img" @click="handleToHome" />
  logo text
</template>
```
### default
匿名插槽用于显示链接及下拉菜单，如：i18n 图标，用户登录状态，登入登出入口。