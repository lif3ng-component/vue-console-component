<template>
  <div :class="`${prefix}-form-area ${noBoard ? 'no-board' : ''}`">
    <div :class="`${prefix}-form-area-header`" v-if="!noBoard">
      {{ title || "基本信息" }}
    </div>
    <div :class="`${prefix}-form-area-body`">
      <slot />
      <component
        :is="`${prefix}-form`"
        v-model="value"
        :rules="innerRules"
        v-on="$listeners"
      >
        <component
          v-for="(item, index) in formatItems"
          :key="index"
          :is="`${prefix}-form-item`"
          :prop="item.prop"
          :label="item.label"
        >
          <component
            v-if="item.type === 'input'"
            :is="`${prefix}-input`"
            v-model="value[item.prop]"
          />
          <component
            v-else-if="item.type === 'copyInput'"
            :is="`${prefix}-input`"
            readonly
            v-model="value[item.prop]"
          >
            <component
              :is="`${prefix}-button`"
              icon="copy"
              class="copy-btn"
              slot="append"
              @click.native="handleCopy"
            />
          </component>
          <span v-else-if="item.type === 'text'">
            <template v-if="item.filter">{{
              useFilter(value[item.prop], item.filter)
            }}</template>
            <template v-else-if="item.template">{{
              renderTpl(value, item.template)
            }}</template>
            <slot v-else-if="item.slot" :name="item.prop" :data="value"
              >slot name: {{ item.prop }}</slot
            >
            <template v-else>{{ value[item.prop] }}</template>
          </span>
          <slot v-else-if="item.slot" :name="item.prop" :data="value"
            >slot name: {{ item.prop }}</slot
          >
          <!-- <span v-else-if="item.filter">{{useFilter(value[item.prop],item.filter)}}</span>
          <span v-else-if="item.type==='text' && !item.filter">{{value[item.prop]}}</span> -->
          <!-- <component :is="`${prefix}-input`" />  -->
          <span v-else
            ><span style="color:red;">todo</span> type:{{ item.type }}
            <br />value:{{ value[item.prop] }}</span
          >
        </component>
      </component>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";

export default {
  name: "FormArea",
  props: {
    noBoard: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: ""
    },
    value: Object
  },
  data() {
    const propLabelMap = {};
    const ruleWrapper = (rules, prop) => {
      const ruleMap = {
        required: {
          required: true,
          message: `请输入${propLabelMap[prop]}`
        },
        email: {
          pattern: /^.+@.+\..+/,
          message: "请输入合法邮箱"
        },
        mobile: {
          pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
          message: "请输入合法手机号"
        }
      };
      return rules.map(rule => {
        if (typeof rule === "string") {
          return ruleMap[rule];
        }
        const { required, message } = rule;
        if (message) {
          return rule;
        }
        return {
          ...rules,
          ...(required ? ruleMap.required : {})
        };
      });
    };
    this.items.forEach(({ label, prop }) => {
      if (prop && label) {
        propLabelMap[prop] = label;
      }
    });

    const innerRules = {};
    Object.keys(this.rules).forEach(prop => {
      innerRules[prop] = ruleWrapper(this.rules[prop], prop);
    });

    return {
      clipboard: null,
      innerRules
    };
  },
  mounted() {
    this.clipboard = new Clipboard(this.$el.querySelectorAll(".copy-btn"), {
      target(btn) {
        return btn.previousSibling;
      }
    });
    this.clipboard.on("success", e => {
      e.clearSelection();
      if (this.$message) {
        this.$message("已复制到剪切板");
      }
    });
    // this.clipboard.on("error", e => {
    // });
  },
  destroyed() {
    this.clipboard.destroy();
  },
  computed: {
    formatItems() {
      return this.items.map(item => {
        const { type } = item;
        return {
          ...item,
          ...(type ? {} : { type: this.$default.formarea.type })
        };
      });
    }
  },
  methods: {
    useFilter(origin, filter) {
      const [filtername, ...args] =
        typeof filter === "string" ? [filter] : filter;
      const fn = this.$options.filters[filtername];
      return fn(origin, ...args);
    },
    handleCopy(e) {
      if (e.target.tagName !== "BUTTON") {
        e.target.parentElement.click();
      } else {
        // const input = e.target.previousSibling;
      }
    },
    renderTpl(value, tpl) {
      // console.log({value,tpl})
      return tpl.replace(/\{\{([\w.]+?)\}\}/g, (_, propStr) => {
        if (propStr.indexOf(".") === -1) {
          return typeof value[propStr] === "undefined" ? "" : value[propStr];
        }
        const propsArr = propStr.split(".");
        let innerValue = value;
        while (propsArr.length && innerValue) {
          const prop = propsArr.shift();
          innerValue = innerValue[prop];
        }
        return innerValue || "";
      });
    }
  }
  // render() {
  //   return (
  //     <div class={`${prefix}-form-area`}>
  //       <div class={`${prefix}-form-area-header`}>
  //         基本信息
  //       </div>
  //       <div class={`${prefix}-form-area-body`}>
  //         <component is={`${prefix}-form`} v-model={this.value} >
  //         </component>
  //       </div>
  //     </div>
  //   );
  // },
};
</script>
