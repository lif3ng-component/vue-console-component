<template>
  <div :class="`${prefix}-dialog`">
    <div :class="`${prefix}-dialog-mask`" />
    <div :class="`${prefix}-dialog-scroll-wrapper`">
      <div :class="`${prefix}-dialog-container`">
        <component
          :is="`${prefix}-icon`"
          type="close"
          @click.native="$emit('close')"
        />
        <div :class="`${prefix}-dialog-header`">
          {{ title }}
        </div>
        <div :class="`${prefix}-dialog-body`">
          <slot />
        </div>
        <div :class="`${prefix}-dialog-footer`">
          <slot name="btns" />
          <component
            :is="`${prefix}-button`"
            type="primary"
            @click="$emit('submit', $parent.submitData || $parent.form)"
            >确定</component
          >
          <component :is="`${prefix}-button`" @click="$emit('close')"
            >取消</component
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formCollectMixin } from "@/mixins/formMixins";

export default {
  name: "Dialog",
  mixins: [formCollectMixin],

  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      prefix
    };
  },
  mounted() {
    document.body.append(this.$el);
    console.log(this.$parent);
    this.$nextTick(() => {
      if (this.$el === this.$parent.$el) {
        this.$parent.formValidate = this.formValidate;
      }
    });
  }
};
</script>
