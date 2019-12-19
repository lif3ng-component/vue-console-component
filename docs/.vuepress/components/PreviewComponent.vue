<template>
  <div class="component-preview">
    <div class="preview">
      <component :is="src" />
    </div>
    <a @click="getSandbox">debug in codesandbox</a>
    <component :is="`${src}-src`" ref="src" />
  </div>
</template>
<script>
import {getSandboxUrl} from '../utils/sandbox'
export default {
  props: ["src"],
  data() {
    return { srcMounted: false,srcContent:'' };
  },
  updated() {
    if (this.srcMounted) return;
    const srcComponent = this.$refs.src;
    if (srcComponent) {
      this.srcMounted = true;
      this.srcContent = srcComponent.$el.textContent;
    }
  },
  methods:{
    getSandbox(){
      if(this.srcContent){
        getSandboxUrl(this.srcContent)
      }
    }
  }
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
	.preview
		border-radius: 6px;
		border: 1px solid #ccc;
		background: #fff
		padding: 10px
		margin: 0.85rem 0;
</style>
