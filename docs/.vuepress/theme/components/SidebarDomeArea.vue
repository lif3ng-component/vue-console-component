<template>
  <div class="demo-area">
    <Badge vertical="middle">Demos</Badge>
    <div class="demo-item" v-for="demo in demoList" :key="demo.hash">
      <router-link :class="{'sidebar-link':true,active:$route.hash ===`#${demo.hash}`}" :to="`${path}#${demo.hash}`">{{ demo.title }}</router-link>
    </div>
  </div>
</template>
<script>
import { renderLink } from "./SidebarLink.vue";

export default {
  inject: ["getDemoList"],
  props: ["path"],
  computed: {
    demoList() {
      return this.getDemoList();
    }
  }
};
</script>
<style lang="stylus" scoped>
.demo-area
  padding-left 2em
  .demo-item
    margin-left: -10px

</style>
