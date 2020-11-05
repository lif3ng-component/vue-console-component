<template>
  <div class="component-preview">
    <h3 class="title" v-if="title" :id="`demo-${src}`">
      <a class="header-anchor" :href="`#demo-${src}`">#</a>
      {{ title }}
      <a @click="previewKey++">refresh</a>
    </h3>
    <div class="preview" :key="previewKey">
      <component :is="src" />
    </div>
    <div class="oper">
      <a @click="getSandbox">在线调试</a>
      <a @click="showCode = !showCode">{{ showCode ? "收起" : "查看" }}代码</a>
    </div>
    <component :is="`${src}-src`" ref="src" v-show="showCode" />
    <div class="oper" v-show="showCode">
      <a @click="getSandbox">在线调试</a>
      <a @click="showCode = !showCode">{{ showCode ? "收起" : "查看" }}代码</a>
    </div>
  </div>
</template>
<script>
import Prism from "prismjs";
import { getSandboxUrl } from "../utils/sandbox";
import getTitle from "./componentTitle";

export default {
  props: ["src"],
  inject: ["addDemo"],
  data() {
    return { srcMounted: false, showCode: false, previewKey: 0 };
  },
  computed: {
    title() {
      return getTitle(this.src);
    },
  },
  watch: {
    title(title, old) {
      console.log({ title, old });
    },
  },
  mounted() {
    this.addDemo({ title: getTitle(this.src), hash: `demo-${this.src}` });
  },
  updated() {
    if (this.srcMounted) return;
    const srcComponent = this.$refs.src;
    if (srcComponent) {
      this.srcMounted = true;
      this.srcContent = srcComponent.$el.textContent;
      this.RenderHighLightCode(this.srcContent);
    }
  },
  methods: {
    splitCode(code) {
      const reHtml = /<template>[\s\S]*<\/template>/;
      const resultHtml = code.match(reHtml);

      const reScript = /<script[\s\S]*<\/script>/;
      const resultScript = code.match(reScript);

      const reStyle = /<style[\s\S]*<\/style>/;
      const resultStyle = code.match(reStyle);
      const result = {
        html: resultHtml && resultHtml[0],
        script: resultScript && resultScript[0],
        style: resultStyle && resultStyle[0],
      };
      return result;
    },
    RenderHighLightCode(code) {
      const { html, script, style } = this.splitCode(code);
      const srcEle = this.$refs.src.$el;

      const templateHTML = Prism.highlight(html, Prism.languages.html);

      const scriptRows = script && script.split("\n");
      // const scriptFirstLineHTML = Prism.highlight(`${scriptRows[0]}\n`,Prism.languages.html)

      // const scriptLastLineHTML = Prism.highlight(scriptRows[scriptRows.length-1],Prism.languages.html)
      const scriptHTML =
        scriptRows &&
        scriptRows
          .map((row, index, rows) => {
            if (index === 0 || index === rows.length - 1) {
              return Prism.highlight(`${row}\n`, Prism.languages.html);
            }
            return Prism.highlight(`${row}\n`, Prism.languages.js);
          })
          .join("");

      const styleRows = style && style.split("\n");
      const styleHTML =
        styleRows &&
        styleRows
          .map((row, index, rows) => {
            if (index === 0 || index === rows.length - 1) {
              return Prism.highlight(`${row}\n`, Prism.languages.html);
            }
            return Prism.highlight(`${row}\n`, Prism.languages.css);
          })
          .join("");
      srcEle.children[0].innerHTML = [
        ...(templateHTML ? [templateHTML] : []),
        ...(scriptHTML ? [scriptHTML] : []),
        ...(styleHTML ? [styleHTML] : []),
      ].join("\n");
    },
    getSandbox() {
      if (this.srcContent) {
        getSandboxUrl(this.srcContent);
      }
    },
  },
};
</script>
<style lang="stylus">
@import '~@/style/vars.styl'

.component-preview
  background: #f3f5f7
  padding: 0.1rem 1.5rem;
  border-color: color-primary;
  border-left-width: 0.5rem;
  border-left-style: solid;
  margin: 1rem 0;
  .title
    font-size 1.2em
    font-weight 500
    margin 20px 0
    margin-top -3.1rem
    padding-top 4.6rem
    .header-anchor
      color color-primary
    a:last-child
      float right
      cursor pointer
      font-size .8em
      color #bbb
      &:hover
        color color-primary

  .oper
    text-align center
    margin 16px 0
    a
      color color-primary
      cursor pointer
      user-select none
      text-decoration none !important
      + a
        margin-left 10px
  .preview
    border-radius: 6px;
    border: 1px solid #ccc;
    background: #fff
    padding: 10px
    margin: 0.85rem 0;
</style>
