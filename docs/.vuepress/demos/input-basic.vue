<template>
  <div>
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
      ],
    };
  },
};
</script>
