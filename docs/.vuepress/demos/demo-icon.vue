<template>
  <div>
    <div v-for="(type, index) in iconList" :key="index" class="item">
      <d-icon :type="type" />
      <span>{{ type }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconList: [
        "server",
        "key",
        "mail",
        "search",
        "point",
        "arrowdown",
        "arrowup",
        "arrowleft",
        "arrowright",
        "check",
        "idcard",
        "mobile",
        "dashboard",
        "plus",
        "caret-up",
        "caret-down",
        "minus",
        "delete",
        "setting",
        "poweroff",
        "down",
        "up",
        "left",
        "right",
        "copy",
        "user",
        "logout",
        "close"
      ]
    };
  }
};
</script>
<style lang="stylus" scoped>
.item
  display: inline-block
  padding: 20px 0
  box-sizing border-box
  line-height: 30px
  font-size: 16px
  width: 100px
  height: 100px
  outline: 1px solid #ccc;
  text-align: center
  .{prefix}-icons
    font-size: 20px
    display: block
</style>
