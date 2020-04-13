<template>
  <d-table :columns="columns" :data="data" />
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          c1: "abcd abcd abcd abcd abcd abcd abcd abcd abcd",
          c2: "asdf asdf asdf asdf asdf asdf asdf",
        },
      ],
      columns: [
        {
          label: "xx",
          prop: "c1",
          noWrap: true,
          tooltip: ({ c1 }) => `--${c1}--`,
        },
        {
          label: "xx",
          prop: "c2",
          // tooltip: row => row.c1
          // tooltip: "abc",
        },
      ],
    };
  },
};
</script>
