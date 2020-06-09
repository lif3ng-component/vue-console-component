<template>
  <div>
    <d-form-area title="空表单(add)" :items="items1" v-model="form1" />
    <d-form-area
      title="有回填数据的表单(edit)"
      :items="items2"
      v-model="form2"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      items1: [
        {
          label: "start",
          prop: "start",
          type: "datepicker",
          props: { initValue: "now" },
        },
        { label: "end", prop: "end", type: "datepicker", props: {} },
      ],
      // 与 items1 相同，由于需要独立修改 item props 复制一份
      items2: [
        {
          label: "start",
          prop: "start",
          type: "datepicker",
          props: { initValue: "now" },
        },
        { label: "end", prop: "end", type: "datepicker", props: {} },
      ],
      form1: {},
      form2: {}, //{ start: 1591610278108,end:1591672290910 },
    };
  },
  watch: {
    "form1.start"(time) {
      this.items1.find(({ prop }) => prop === "end").props.min = time;
    },
    "form1.end"(time) {
      this.items1.find(({ prop }) => prop === "start").props.max = time;
    },
    "form2.start"(time) {
      this.items2.find(({ prop }) => prop === "end").props.min = time;
    },
    "form2.end"(time) {
      this.items2.find(({ prop }) => prop === "start").props.max = time;
    },
  },
  mounted() {
    setTimeout(() => {
      this.form2 = { start: 1591610278108, end: 1591672290910 };
    }, 1000);
  },
};
</script>
