import Icon from "./Icon";
const Node = {
  name: "TreeNode",
  inject: [
    "canSelect",
    "getSelectedValue",
    "setSelectedValue",
    "setSelectedNode",
    "labelName",
    "valueName",
    "childrenName",
    "loadFn"
  ],
  props: {
    isLeaf: {
      default: false
    },
    open: { default: false },
    nodeData: { default: () => ({}) }
  },
  data() {
    return {
      innerIsLeaf: this.$props.isLeaf,
      innerOpen:
        this.$props.open || !!this.$props.nodeData[this.$props.childrenName],
      loaded: this.nodeData[this.childrenName],
      childrenLoading: false,
      // asyncChildren: [],
      asyncChildren: []
    };
  },
  computed: {
    selectedValue() {
      return this.getSelectedValue();
    },
    selected() {
      return this.nodeData[this.valueName] === this.selectedValue;
    },
    children() {
      return this.nodeData[this.childrenName] || this.asyncChildren;
    }
  },
  mounted() {
    if (this.selectedValue === this.nodeData[this.valueName]) {
      this.setSelectedSelf();
    }
  },
  methods: {
    handleClick() {
      // 选择
      this.setSelectedSelf();
    },
    handleOpen() {
      if (this.childrenLoading) {
        return;
      }
      if (!this.loaded) {
        this.childrenLoading = true;
        if (!this.nodeData[this.childrenName] && this.loadFn) {
          this.refreshChildren();
        }
      } else {
        this.innerOpen = true;
      }
    },
    handleClose() {
      this.innerOpen = false;
    },
    getParentInstance() {
      if (this.$parent.$options.name === this.$options.name) {
        return this.$parent;
      }
      return null;
    },
    refreshChildren() {
      this.loadFn(this.nodeData[this.valueName]).then(data => {
        if (data instanceof Array) {
          this.asyncChildren = [];
          this.$nextTick(() => {
            this.asyncChildren = data;
          });
          this.loaded = true;
          this.childrenLoading = false;
          if (data.length === 0) {
            this.innerIsLeaf = true;
          } else {
            this.innerOpen = true;
          }
        }
      });
    },
    setSelectedSelf() {
      if (this.canSelect) {
        this.setSelectedValue(this.nodeData[this.valueName]);
        this.setSelectedNode(
          {
            [this.valueName]: this.nodeData[this.valueName],
            [this.labelName]: this.nodeData[this.labelName]
          },
          this
        );
      }
    }
  },
  render() {
    return (
      <div class={`${prefix}-tree-node`}>
        <div class={`${prefix}-tree-node-item`}>
          <div
            class={`${prefix}-tree-icon-area`}
            style={{ visibility: this.innerIsLeaf ? "hidden" : "visible" }}
          >
            {this.childrenLoading && <Icon type="loading" />}
            {!this.childrenLoading && !this.innerOpen && (
              <Icon type="plus" onClick={this.handleOpen} />
            )}
            {!this.childrenLoading && this.innerOpen && (
              <Icon type="minus" onClick={this.handleClose} />
            )}
          </div>
          <span
            onClick={this.handleClick}
            class={[`${prefix}-tree-node-name`, { selected: this.selected }]}
          >
            {this.nodeData[this.labelName]}
          </span>
        </div>
        {/* <transition> */}
        <div class={[`${prefix}-tree-node-children`, { show: this.innerOpen }]}>
          {this.children.map(child => (
            <Node nodeData={child} />
          ))}
        </div>
        {/* </transition> */}
      </div>
    );
  }
};

const Tree = {
  name: "Tree",
  props: {
    root: {
      default: () => ({ id: 1, name: "please set prop: [root]" })
    },
    canSelect: {
      // todo multiple
      default: true
    },
    selectedInit: {
      default: ""
    },
    labelName: {
      default: "name"
    },
    valueName: {
      default: "id"
    },
    childrenName: {
      default: "children"
    },
    loadFn: {
      default: null
    }
  },
  provide() {
    return {
      // 基础值
      labelName: this.labelName,
      valueName: this.valueName,
      childrenName: this.childrenName,
      // 选中
      canSelect: this.canSelect,
      getSelectedValue: () => this.selectedValue,
      setSelectedValue: this.setSelectedValue,
      setSelectedNode: this.setSelectedNode,
      // 子节点加载
      loadFn: this.loadFn
    };
  },
  data() {
    return {
      open: false,
      selectedValue: this.$props.selectedInit,
      selectedNodeInstance: null
    };
  },
  computed: {},
  methods: {
    loadChildren() {},
    refreshChildren() {},
    setSelectedValue(value) {
      this.selectedValue = value;
      this.$emit("selected", value);
    },
    setSelectedNode(data, node) {
      this.$emit("selected-data", data);
      this.selectedNodeInstance = node;
    },
    refreshSelectedChildren() {
      if (this.selectedNodeInstance) {
        this.selectedNodeInstance.refreshChildren();
      }
    },
    refreshSelectedSibling() {
      const parentInstance = this.selectedNodeInstance.getParentInstance();
      if (parentInstance) {
        parentInstance.refreshChildren();
      }
    }
  },
  mounted() {
    if (this.$el === this.$parent.$el) {
      for (let methodName in this.$options.methods) {
        this.$parent[methodName] = this[methodName];
      }
    }
  },
  render() {
    return (
      <div class={`${prefix}-tree`}>
        {this.root instanceof Array &&
          this.root.map(item => <Node nodeData={item} />)}
        {!(this.root instanceof Array) && <Node nodeData={this.root} />}
      </div>
    );
  }
};
export default Tree;
