<template>
  <div>
    <nq-dropdown-menu :items="items" width="300px">
      <template #custom>通过 slot 注入的自定义内容</template>
    </nq-dropdown-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { slot: "custom" },
        { slot: "custom", slim: true },
        {
          icon: "edit",
          text: "item1",
          fn: () => console.log("item1")
        },
        {
          text: "item2",
          fn: () => console.log("item1")
        },
        {
          split: true
        },
        {
          text: "group2",
          fn: () => console.log("group 2")
        }
      ]
    };
  }
};
</script>
