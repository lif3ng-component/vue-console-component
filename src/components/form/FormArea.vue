<template>
  <div :class="`${prefix}-form-area ${noBorder ? 'no-border' : ''}`">
    <div :class="`${prefix}-form-area-header`" v-show="!noBorder">
      {{ title || "基本信息" }}
    </div>
    <div
      :class="`${prefix}-form-area-body ${$slots.default ? 'use-slot' : ''}`"
    >
      <slot name="top" />
      <component
        ref="form"
        :is="`${prefix}-form`"
        v-model="value"
        :rules="innerRules"
        v-on="$listeners"
        :hide-label="hideLabel"
        :enter-submit="enterSubmit"
        :submit-fn="submitFn"
      >
        <component
          v-for="(item, index) in visibleFormatItems"
          :key="index"
          :is="`${prefix}-form-item`"
          :prop="item.prop"
          :label="item.label"
        >
          <component
            v-if="item.type === 'input'"
            v-bind="item.props || {}"
            :is="`${prefix}-input`"
            :attrs="item.attrs"
            v-model="value[item.prop]"
          />
          <component
            v-else-if="item.type === 'select'"
            :is="`${prefix}-select`"
            :attrs="item.attrs"
            v-model="value[item.prop]"
            :preset="item.preset"
            :optionList="item.optionList"
            :valueName="item.valueName"
            :labelName="item.labelName"
            :multiple="item.multiple"
            :empty-text="
              item.emptyText ||
                `暂无可选择的${getSpacePaddingByFirstLetter(item.label)}${
                  item.label
                }`
            "
          />
          <component
            v-else-if="item.type === 'switch'"
            :is="`${prefix}-switch`"
            v-model="value[item.prop]"
          />
          <component
            v-else-if="item.type === 'datepicker'"
            :is="`${prefix}-date-picker`"
            v-model="value[item.prop]"
            v-bind="item.props || {}"
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
      <slot />
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import renderTpl from "@/utils/renderTpl";
export default {
  name: "FormArea",
  provide() {
    return {
      getVisibleItemProps: () => this.visibleItemProps
    };
  },
  props: {
    hideLabel: {
      type: Boolean,
      default: false
    },
    noBorder: {
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
    value: Object,
    enterSubmit: {
      type: Boolean,
      default: false
    },
    submitFn: {
      type: Function
    }
  },
  data() {
    const propLabelMap = {};
    const propTypeMap = {};
    const ruleWrapper = (rules, prop, type) => {
      const letterPadding = this.getSpacePaddingByFirstLetter(
        propLabelMap[prop]
      );
      const ruleMap = {
        required: {
          required: true,
          message: `请${type === "select" ? "选择" : "输入"}${letterPadding}${
            propLabelMap[prop]
          }`
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
          ...rule,
          ...(required ? ruleMap.required : {})
        };
      });
    };
    this.items.forEach(({ label, prop, type }) => {
      if (prop && label) {
        propLabelMap[prop] = label;
        propTypeMap[prop] = type;
      }
    });

    const innerRules = {};
    Object.keys(this.rules).forEach(prop => {
      innerRules[prop] = ruleWrapper(this.rules[prop], prop, propTypeMap[prop]);
    });

    return {
      clipboard: null,
      innerRules
    };
  },
  mounted() {
    this.validateField = this.$refs.form.validateField;
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
    },
    visibleFormatItems() {
      return this.formatItems.filter(item => {
        const { show, prop, removePropWhenHide } = item;
        if (show && typeof show === "function") {
          if (show()) {
            return true;
          }
          // clear hidden item prop value when **need**
          if (removePropWhenHide) {
            delete this.value[prop];
          }
          return false;
        } else {
          return true;
        }
      });
    },
    visibleItemProps() {
      return this.visibleFormatItems.map(({ prop }) => prop);
    }
  },
  methods: {
    renderTpl,
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
    getSpacePaddingByFirstLetter(str) {
      const isletterFirst = /^[a-zA-Z]/.test(str);
      return isletterFirst ? " " : "";
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
