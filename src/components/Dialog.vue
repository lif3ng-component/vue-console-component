<template>
  <div :class="{ [`${prefix}-dialog`]: true, isLast: lastDialogEl === $el }">
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
        <div :class="`${prefix}-dialog-footer`" v-if="!hideFooter">
          <slot name="btns" />
          <component
            :is="`${prefix}-button`"
            type="primary"
            @click="$emit('submit', $parent.submitData || $parent.form)"
            >{{ submitBtnText || "确定" }}</component
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
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "Dialog",
  mixins: [formCollectMixin, dialogMixin],

  props: {
    title: {
      type: String,
      default: ""
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    submitBtnText: {
      default: ""
    }
  },
  data() {
    return {
      prefix,
      isLastDialog: false
    };
  },
  mounted() {
    document.body.append(this.$el);
    this.$nextTick(() => {
      if (this.$el === this.$parent.$el) {
        this.$parent.formValidate = this.formValidate;
      }

      const dialogs = document.querySelectorAll(`body>.${prefix}-dialog`);
      if (dialogs[dialogs.length - 1] === this.$el) {
        this.isLastDialog = true;
      }
    });
  },
  destroyed() {
    this.$nextTick(() => {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    });
  }
};
</script>
