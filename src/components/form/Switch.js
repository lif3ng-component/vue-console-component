import Icon from "../Icon";
export default {
  name: "Switch",
  props: {
    value: { default: false },
    disabled: { default: false },
    loading: { default: false },
    togglePromiseFn: { default: null }
  },
  data() {
    return { loadingByPromise: false };
  },
  model: {
    event: "change"
  },
  computed: {
    innerDisabled() {
      return this.disabled || this.innerLoading;
    },
    innerLoading() {
      return this.loadingByPromise || this.loading;
    }
  },
  methods: {
    handleChange({ target }) {
      this.$emit("change", target.checked);
    },
    handleTogglePromise() {
      if (!this.togglePromiseFn || this.loadingByPromise) return;
      this.loadingByPromise = true;
      this.togglePromiseFn(!this.value)
        .then(() => {
          return this.$emit("change", !this.value);
        })
        .finally(() => {
          this.loadingByPromise = false;
        });
    }
  },
  render() {
    return (
      <label
        class={[`${prefix}-switch`, { disabled: this.innerDisabled }]}
        onClick={this.handleTogglePromise}
      >
        <input
          type="checkbox"
          disabled={this.innerDisabled}
          checked={this.value}
          onChange={this.handleChange}
        />
        <div
          class={[
            `${prefix}-switch-wrapper`,
            {
              on: this.value,
              disabled: this.innerDisabled
            }
          ]}
        />
        {this.innerLoading && <Icon type="loading" />}
      </label>
    );
  }
};
