import Icon from "../Icon";
export default {
  name: "Input",
  // todo v-model
  // model:{
  //   prop:'value',
  //   event:'input'
  // },
  props: ["value", "iconBefore", "iconAfter", "iconAfterCanClick"],
  // inject: ["emitBlur", "emitChange"],
  inject: {
    emitBlur: {
      default: null,
      emitChange: null
    }
  },
  // data(){
  //   return {
  //     value:''
  //   }
  // },
  // methods:{
  //   handleChange(e){
  //     console.log('change',e.target.value)
  //     this.$emit('input',e.target.value)
  //   }
  // },
  mounted() {},
  methods: {
    handleInput(e) {
      // v-model
      this.$emit("input", e.target.value);
      this.emitChange && this.emitChange();
    },
    handleBlur() {
      this.emitBlur && this.emitBlur();
    },
    handleKeyup(e) {
      this.$emit("keyup", e);
    }
  },
  render() {
    return (
      <div class={`${prefix}-input`}>
        {this.iconBefore && (
          <Icon
            class={`${prefix}-input-inner-icon-before`}
            type={this.iconBefore}
          />
        )}
        {this.iconAfter && (
          <Icon
            class={{
              [`${prefix}-input-inner-icon-after`]: true,
              "cursor-pointer": this.iconAfterCanClick
            }}
            type={this.iconAfter}
            onClick={() => this.$emit("icon-after-click")}
          />
        )}
        <input
          attrs={this.$attrs}
          spellcheck="false"
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onKeyup={this.handleKeyup}
          value={this.value}
          class={{
            [`${prefix}-input-inner`]: true,
            "has-after-icon": this.iconAfter,
            "has-before-icon": this.iconBefore
          }}
        ></input>

        {this.$slots.append}
      </div>
    );
  }
};
