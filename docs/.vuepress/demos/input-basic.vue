<template>
  <div>
    <d-input style="width:100px" />
    <d-input style="width:100px" textAppend="M" />
    <d-input placeholder="placeholder text" />
    <d-input iconBefore="mail" />
    <d-input iconAfter="search" />
    <d-input textAppend="@qq.com" />
    <d-form-area :items="items" v-model="form" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      items: [
        {
          label: "email",
          prop: "email",
          type: "input",
          props: { textAppend: "@qq.com" },
        },
        {
          label: "distance",
          prop: "distance",
          type: "input",
          props: { textAppend: "km" },
          attrs: {
            type: "number",
          },
        },
      ],
    };
  },
  watch: {
    "form.distance": {
      immediate: true,
      handler(number) {
        console.log(typeof number, number);
      },
    },
  },
};
</script>
