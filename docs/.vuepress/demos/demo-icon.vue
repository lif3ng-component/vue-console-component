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
        "mac",
        "earth",
        "check-fill",
        "android",
        "apple",
        "windows",
        "double-left",
        "double-right",
        "time",
        "calendar",
        "left-fill",
        "down-fill",
        "minus-fill",
        "close-fill",
        "up-fill",
        "right-fill",
        "plus-fill",
        "log",
        "app",
        "loading",
        "edit",
        "swap",
        "server",
        "mail",
        "key",
        "search",
        "point",
        "arrowup",
        "arrowdown",
        "arrowright",
        "arrowleft",
        "dashboard",
        "mobile",
        "idcard",
        "check",
        "poweroff",
        "setting",
        "delete",
        "minus",
        "caret-down",
        "caret-up",
        "plus",
        "copy",
        "right",
        "left",
        "up",
        "down",
        "logout",
        "user",
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
    font-size: 22px
    display: block
    transition .5s
  &:hover
    .{prefix}-icons
      transform scale(1.5)
</style>
