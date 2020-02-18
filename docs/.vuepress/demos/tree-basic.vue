<template>
  <div>
    <p>selected id: {{ selectedId }}</p>
    <p>selected node data: {{ selectedNode }}</p>
    <d-button @click="refreshSelectedChildren">刷新选中节点子节点</d-button>
    <d-button @click="refreshSelectedSibling">刷新选中节点兄弟节点</d-button>
    <d-tree
      ref="tree"
      :selectedInit="2"
      :root="root"
      :loadFn="loadFn"
      @selected="handleSelected"
      @selected-data="handleSelectData"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      root: { id: 2, name: "xx", children: [{ id: "xxx", name: "xxx" }] },
      selectedId: "",
      selectedNode: {}
    };
  },
  methods: {
    loadFn(id) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (id.length > 10) {
            resolve([]);
          }
          resolve([
            { id: `${id}-1`, name: `${id}-1` },
            { id: `${id}-2`, name: `${id}-2` }
          ]);
        }, 1000);
      });
    },
    handleSelected(id) {
      this.selectedId = id;
    },
    handleSelectData(data) {
      this.selectedNode = data;
    },
    refreshSelectedChildren() {
      const tree = this.$refs.tree;
      tree.refreshSelectedChildren();
    },
    refreshSelectedSibling() {
      this.$refs.tree.refreshSelectedSibling();
    }
  }
};
</script>
