<template>
  <div>
    <d-button @click="mockAsyncData">mock data</d-button>
    <d-table :columns="columns" :data="data" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          c1: "abcd abcd abcd abcd abcd abcd abcd abcd abcd",
          c2: "asdf asdf asdf asdf asdf asdf asdf"
        }
      ],
      columns: [
        {
          label: "xx",
          prop: "c1",
          // noWrap: true,
          // tooltip: ({ c1 }) => `--${c1}--`
        },
        {
          label: "xx",
          prop: "c2"
          // tooltip: row => row.c1
          // tooltip: "abc",
        }
      ]
    };
  },
  methods: {
    mockAsyncData() {
      this.data = [
        {
          c1:
            "asdf jkl; asdf asdf asdf jkl; asdf asdf asdf asdf aaa bbb ccc ddd eee fff ggg hhh iii jjj kkk lll mmm nnn 123",
          c2:
            "qqq www eee rrr tt tyy uuu iii oooo pp aa ss d fff gggg hhh jjj kkkk llll ;;;"
        },
        {
          c1:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          c2:'123'
        }
      ];
    }
  }
};
</script>
