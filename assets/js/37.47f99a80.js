(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{405:function(e,t,n){"use strict";n.r(t);n(12);var d={data:function(){return{root:{id:2,name:"xx",children:[{id:"xxx",name:"xxx"}]},selectedId:"",selectedNode:{}}},methods:{loadFn:function(e){return new Promise((function(t){setTimeout((function(){e.length>10&&t([]),t([{id:"".concat(e,"-1"),name:"".concat(e,"-1")},{id:"".concat(e,"-2"),name:"".concat(e,"-2")}])}),1e3)}))},handleSelected:function(e){this.selectedId=e},handleSelectData:function(e){this.selectedNode=e},refreshSelectedChildren:function(){this.$refs.tree.refreshSelectedChildren()},refreshSelectedSibling:function(){this.$refs.tree.refreshSelectedSibling()},expandRootNode:function(){this.$refs.tree.expandRootNode()}}},o=n(2),c=Object(o.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("p",[e._v("selected id: "+e._s(e.selectedId))]),e._v(" "),n("p",[e._v("selected node data: "+e._s(e.selectedNode))]),e._v(" "),n("nq-button",{on:{click:e.refreshSelectedChildren}},[e._v("刷新选中节点子节点")]),e._v(" "),n("nq-button",{on:{click:e.refreshSelectedSibling}},[e._v("刷新选中节点兄弟节点")]),e._v(" "),n("nq-button",{on:{click:e.expandRootNode}},[e._v("展开根节点")]),e._v(" "),n("nq-tree",{ref:"tree",attrs:{selectedInit:2,root:e.root,loadFn:e.loadFn},on:{selected:e.handleSelected,select:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"nq-data",void 0,t.key,void 0)?null:e.handleSelectData(t)}}})],1)}),[],!1,null,null,null);t.default=c.exports}}]);