<template>
  <d-form-area
    title="全部 item 类型"
    :items="items"
    v-model="form"
    :rules="rules"
  >
    <template #link="{data:{link}}">
      <a :href="link" target="_blank">{{ link }}</a>
      <a :href="link" target="_blank">{{ link }}</a>
    </template>
  </d-form-area>
</template>
<script>
export default {
  data() {
    return {
      rules: {},
      form: { link: "http://baidu.com" },
      items: [
        {
          type: "input",
          prop: "input",
          label: "input",
          attrs: { placeholder: "type input" }
        },
        {
          type: "input",
          prop: "input",
          label: "disabled input",
          attrs: { placeholder: "disabled input", disabled: true }
        },

        { type: "text", prop: "input", label: "input value" },
        {
          type: "select",
          prop: "select",
          label: "select",
          attrs: { placeholder: "type select" },
          optionList: [
            { id: 1, name: "111" },
            { id: 2, name: "2222" }
          ]
        },
        {
          type: "select",
          prop: "select",
          label: "disabled select",
          attrs: { placeholder: "disabled select", disabled: true },
          optionList: [
            { id: 1, name: "111" },
            { id: 2, name: "2222" }
          ]
        },
        {
          type: "text",
          prop: "select",
          label: "select value"
        },
        {
          type: "select",
          prop: "select2",
          label: "multiple select",
          multiple: true,
          optionList: [
            { id: 1, name: "111" },
            { id: 2, name: "2222" }
          ]
        },
        {
          type: "select",
          prop: "select2",
          label: "disabled multiple select",
          multiple: true,
          optionList: [
            { id: 1, name: "111" },
            { id: 2, name: "2222" }
          ],
          attrs: { disabled: true }
        },
        {
          type: "text",
          prop: "select2",
          label: "multiple value"
        },
        {
          type: "switch",
          prop: "switchValue",
          label: "switch"
        },
        {
          type: "text",
          prop: "switchValue",
          label: "switch value"
        },
        {
          type: "text",
          prop: "tpl",
          label: "template",
          template: "input--{{input}} select--{{select}} select2--{{select2}}"
        },
        {
          type: "datepicker",
          prop: "month",
          label: "month",
          props: {
            min: "now",
            initValue: "now",
            type: "month"
          }
        },
        {
          type: "text",
          prop: "month",
          label: "value",
          filter: "datetime"
        },
        {
          type: "datepicker",
          prop: "time2",
          label: "time",
          props: {
            type: "sec"
          }
        },
        {
          type: "text",
          prop: "time2",
          label: "value",
          filter: "datetime"
        },
        { type: "text", prop: "link", label: "link", slot: true }
      ]
    };
  }
};
</script>
