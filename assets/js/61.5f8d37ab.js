(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{358:function(n,e,t){"use strict";t.r(e),e.default='<template>\n  <div>\n    preset: "dropdown" <br />\n\n    <div\n      class="ref"\n      v-popper="{ placement: \'top\', preset:\'dropdown\' }"\n    >\n      reference\n    </div>\n\n    <nq-dropdown-menu :items="items" />\n  </div>\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      items: [\n        {\n          text: "line 1",\n          fn() {\n            console.log("line 1");\n          }\n        },\n        {\n          text: "line 2",\n          fn() {\n            console.log("line 2");\n          }\n        }\n      ]\n    };\n  }\n};\n<\/script>\n<style lang="stylus" scoped>\n.ref\n  margin 30px auto\n  width 200px\n  height 100px\n  text-align center\n  background lightblue\n.target\n  background lightgreen\n</style>\n'}}]);