(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{345:function(n,l,i){"use strict";i.r(l),l.default='<template>\n  <div>\n    <nq-button @click="dialogVisible = true">show dialog</nq-button>\n    <nq-dialog\n      title="dialog 1"\n      v-if="dialogVisible"\n      @submit="handleSubmit"\n      @close="handleClose"\n      >click to show dialog 2<br /><br />\n      <nq-button @click="dialogVisible2 = true">show dialog</nq-button>\n      <nq-dialog\n        title="dialog 2"\n        v-if="dialogVisible2"\n        @close="dialogVisible2 = false"\n        >dialog 2</nq-dialog\n      >\n    </nq-dialog>\n  </div>\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      dialogVisible: false,\n      dialogVisible2: false\n    };\n  },\n  methods: {\n    handleClose() {\n      console.log("handleClose");\n      this.dialogVisible = false;\n    },\n    handleSubmit() {\n      console.log("handleSubmit");\n      this.handleClose();\n    }\n  }\n};\n<\/script>\n'}}]);