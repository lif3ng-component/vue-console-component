<template>
  <div>
    <nq-dropdown-menu :items="items" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: "item1",
          fn: () => console.log("item1"),
        },
        {
          text: "item2",
          fn: () => console.log("item1"),
        },
        {
          split: true,
        },
        {
          text: "group2",
          fn: () => console.log("group 2"),
        },
      ],
    };
  },
};
</script>
