export default {
  name: "Input",
  // todo v-model
  // model:{
  //   prop:'value',
  //   event:'input'
  // },
  props: ["value"],
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
  methods: {
    handleInput(e) {
      // v-model
      this.$emit("input", e.target.value);
      this.emitChange && this.emitChange();
    },
    handleBlur() {
      this.emitBlur && this.emitBlur();
    }
  },
  render() {
    return (
      <div class={`${prefix}-input`}>
        <input
          attrs={this.$attrs}
          spellcheck="false"
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          value={this.value}
          class={`${prefix}-input-inner`}
        ></input>
        {this.$slots.append}
      </div>
    );
  }
};
