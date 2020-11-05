(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{628:function(e,t,a){"use strict";a.r(t);var v=a(2),r=Object(v.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"form-area-表单区域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#form-area-表单区域"}},[e._v("#")]),e._v(" Form Area 表单区域")]),e._v(" "),a("p",[e._v("Form Area 用于组织表单项，内部为 Form 组件，支持完整的 数据绑定 和 表单校验。")]),e._v(" "),a("p",[e._v("采用声明式调用，使用时在 template 中不必编写 Form、FormItem、Input/Select... 层层嵌套，只需声明表单绑定对象（v-model)、表单项（items) 和 校验规则（rules)，即可完成业务编写，便于后续迭代升级。")]),e._v(" "),a("preview-component",{attrs:{src:"formarea-basic"}}),e._v(" "),a("preview-component",{attrs:{src:"formarea-all-item"}}),e._v(" "),a("preview-component",{attrs:{src:"formarea-header-extra"}}),e._v(" "),a("h2",{attrs:{id:"props"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" props")]),e._v(" "),a("h3",{attrs:{id:"title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#title"}},[e._v("#")]),e._v(" title")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("string")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("'基本信息'")])])]),e._v(" "),a("p",[e._v("头部显示文字")]),e._v(" "),a("h3",{attrs:{id:"hidelabel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hidelabel"}},[e._v("#")]),e._v(" hideLabel")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("boolean")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("false")])])]),e._v(" "),a("p",[e._v("隐藏 label 区域")]),e._v(" "),a("h3",{attrs:{id:"noborder"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#noborder"}},[e._v("#")]),e._v(" noBorder")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("boolean")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("false")])])]),e._v(" "),a("p",[e._v("隐藏边框。隐藏后背景色自动置为透明，隐藏头部，"),a("code",[e._v("title")]),e._v(" 不再显示。")]),e._v(" "),a("h3",{attrs:{id:"entersubmit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entersubmit"}},[e._v("#")]),e._v(" enterSubmit")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("boolean")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("false")])])]),e._v(" "),a("p",[e._v("回车键触发 "),a("code",[e._v("form 组件")]),e._v(" 提交。提交方法为 "),a("a",{attrs:{href:"#submitfn"}},[e._v("submitFn")])]),e._v(" "),a("h3",{attrs:{id:"submitfn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#submitfn"}},[e._v("#")]),e._v(" submitFn")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("function")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("undefined")])])]),e._v(" "),a("p",[e._v("当 "),a("code",[e._v("enterSubmit")]),e._v(" 为"),a("code",[e._v("true")]),e._v("时需要提供此方法。")]),e._v(" "),a("h3",{attrs:{id:"items"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#items"}},[e._v("#")]),e._v(" items")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("array")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("[]")])])]),e._v(" "),a("p",[a("code",[e._v("form 组件")]),e._v(" items")]),e._v(" "),a("h4",{attrs:{id:"items-item"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#items-item"}},[e._v("#")]),e._v(" items item")]),e._v(" "),a("h3",{attrs:{id:"rules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rules"}},[e._v("#")]),e._v(" rules")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("object")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("{}")])])]),e._v(" "),a("p",[a("code",[e._v("form 组件")]),e._v(" "),a("RouterLink",{attrs:{to:"/component/form.html#rules"}},[e._v("rules")])],1),e._v(" "),a("p",[e._v("单条规则除了常规对象写法外，还提供了字符串简写。")]),e._v(" "),a("p",[e._v("简写：")]),e._v(" "),a("ul",[a("li",[a("code",[e._v('"required"')]),e._v(" 必填项")]),e._v(" "),a("li",[a("code",[e._v('"email"')]),e._v(" 邮箱")]),e._v(" "),a("li",[a("code",[e._v('"mobile"')]),e._v(" 手机号")])]),e._v(" "),a("p",[e._v("简写方式提供了统一的中文提示，暂未处理 i18n 的场景。")]),e._v(" "),a("h3",{attrs:{id:"v-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#v-model"}},[e._v("#")]),e._v(" v-model")]),e._v(" "),a("ul",[a("li",[e._v("Type: "),a("code",[e._v("object")])]),e._v(" "),a("li",[e._v("Default: "),a("code",[e._v("{}")])])]),e._v(" "),a("p",[a("code",[e._v("form 组件")]),e._v(" v-model 双向绑定对象")]),e._v(" "),a("h2",{attrs:{id:"slot"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#slot"}},[e._v("#")]),e._v(" slot")]),e._v(" "),a("h3",{attrs:{id:"headerextra"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#headerextra"}},[e._v("#")]),e._v(" headerExtra")]),e._v(" "),a("p",[e._v("头部右侧内容")])],1)}),[],!1,null,null,null);t.default=r.exports}}]);