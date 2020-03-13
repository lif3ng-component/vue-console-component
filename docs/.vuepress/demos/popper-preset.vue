<template>
  <div>
    preset: "dropdown" <br />

    <div
      class="ref"
      v-popper="{ placement: 'top', preset:'dropdown' }"
    >
      reference
    </div>

    <d-dropdown-menu :items="items" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: "line 1",
          fn() {
            console.log("line 1");
          }
        },
        {
          text: "line 2",
          fn() {
            console.log("line 2");
          }
        }
      ]
    };
  }
};
</script>
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
