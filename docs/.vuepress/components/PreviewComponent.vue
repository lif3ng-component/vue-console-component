<template>
  <div class="component-preview">
    <div class="preview">
    <component :is="src" />
    </div>
    <component :is="`${src}-src`" />
  </div>
</template>
<script>
  export default{
    props:['src'],
    mounted(){
      
    },
  }
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