(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{353:function(n,e,t){"use strict";t.r(e),e.default='<template>\n  <div>\n    <nq-input style="width:100px" />\n    <nq-input style="width:100px" textAppend="M" />\n    <nq-input placeholder="placeholder text" />\n    <nq-input iconBefore="mail" />\n    <nq-input iconAfter="search" />\n    <nq-input textAppend="@qq.com" />\n    <nq-form-area :items="items" v-model="form" />\n  </div>\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      form: {},\n      items: [\n        {\n          label: "email",\n          prop: "email",\n          type: "input",\n          props: { textAppend: "@qq.com" },\n        },\n        {\n          label: "distance",\n          prop: "distance",\n          type: "input",\n          props: { textAppend: "km" },\n          attrs: {\n            type: "number",\n          },\n        },\n      ],\n    };\n  },\n  watch: {\n    "form.distance": {\n      immediate: true,\n      handler(number) {\n        console.log(typeof number, number);\n      },\n    },\n  },\n};\n<\/script>\n'}}]);