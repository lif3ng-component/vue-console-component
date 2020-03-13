<template>
  <div>
    <div
      class="ref"
      v-popper="{ placement: 'bottom-end', trigger: 'mouseenter focus' }"
    >
      reference
    </div>
    <div class="target">target</div>
  </div>
</template>

<style lang="stylus" scoped>
.ref
  margin 30px auto
  width 200px
  height 100px
  text-align center
  background lightblue
.target
  background lightgreen
</style>
