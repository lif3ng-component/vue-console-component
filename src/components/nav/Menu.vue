<template>
  <div :class="`${prefix}-menu`">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <div
          :class="
            `${prefix}-menu-item-line ${
              item.hash && !item.items ? 'can-click' : ''
            } ${item.routerName === active ? 'active' : ''}`
          "
          @click="handleClick($event, item)"
        >
          <!-- 缩进 -->
          <span class="intend">{{
            item.nodeIndex
              .split("")
              .filter(x => x == "-")
              .join("")
          }}</span>
          <!-- 组件图标 -->
          <component
            v-if="item.icon"
            :is="`${prefix}-icon`"
            :type="item.icon"
          />
          <!-- todo 其他图标 -->
          <span>{{ item.text }}</span>
          <!-- 展开 收起 -->
          <component
            v-if="item.items && item.items.length > 0"
            :is="`${prefix}-icon`"
            :type="item.expend === true ? 'caret-up' : 'caret-down'"
          />
        </div>
        <component
          :is="`${prefix}-menu`"
          v-if="item.items && item.items.length > 0"
          v-show="item.expend"
          :items.sync="item.items"
          :active="active"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Menu",
  provide() {
    return {
      parentMenu: this
    };
  },
  inject: {
    parentMenu: {
      default: null
    }
  },
  data() {
    return {
      prefix,
      itemsInner: []
    };
  },
  props: {
    items: {
      type: Array
    },
    active: {
      type: String,
      default: ""
    }
  },
  // computed:{
  //   active(){
  //     if(this.$route){
  //       return this.$route.name
  //     }else{
  //       return '/a'
  //     }
  //   }
  // },
  // created(){
  //   console.log('menu created',this.items,this.$el,this.expendFirstLeaf)
  //   return false
  // },
  created() {
    const { items: itemsByProp } = this;
    const items = [...itemsByProp];
    // if (this.parentMenu) {
    //   this.$forceUpdate();
    //   return;
    // }
    this.$parent.getFirstLeafRouterName = this.getFirstLeafRouterName;
    this.$parent.expendFirstLeaf = this.expendFirstLeaf;
    this.$parent.expendByRouterName = this.expendByRouterName;

    // 组件内修改Object类型prop，需要修改
    const addExpendAndPath = (items, hashPrefix, indexArray) => {
      const prefix = hashPrefix || "";
      const indexArr = indexArray ? [...indexArray] : [];

      items.forEach((item, index) => {
        item.nodeIndex = [...indexArr, index].join("-");
        item.fullHash = `${prefix}${item.hash || ""}`;
        if (item.items) {
          if (typeof item.expend === "undefined") {
            item.expend = false;
          }

          addExpendAndPath(item.items, item.fullHash, [...indexArr, index]);
        }
      });
    };
    if (!this.parentMenu) {
      addExpendAndPath(items);
      this.$emit("update:items", items);
    }
  },
  mounted() {},
  watch: {
  },
  methods: {
    handleClick(e, item) {
      // console.log(e,item)
      e.stopPropagation();
      if (item.items) {
        // item.expend = !item.expend;
        const newItem = {
          ...item,
          expend: !item.expend
        };
        const newItems = [...this.items];
        const index = newItems.findIndex(i => i === item);
        newItems.splice(index, 1, newItem);
        this.$emit("update:items", newItems);

        // this.$set(item,'expend',!item.expend)
        // this.$forceUpdate();
      } else if (this.$router && item.fullHash) {
        this.$router.push(item.fullHash);
      }
    },
    expendByIndexList(indexList) {
      let currentNodeItems = [...this.items];
      const valueToEmit = currentNodeItems;
      if (!indexList) return;
      indexList.forEach(index => {
        const currentNode = currentNodeItems[index];
        currentNodeItems.splice(index, 1, {
          ...currentNode,
          expend: true
        });
        currentNodeItems = currentNodeItems[index].items;
      });
      this.$emit("update:items", valueToEmit);
    },
    getFirstLeafRouterName() {
      const indexList = this.getIndexListByFn(
        ({ routerName }) => !!routerName,
        true
      );
      let cursor = this.items;
      indexList.forEach(index => {
        cursor = cursor[index];
        if (cursor.items) {
          cursor = cursor.items;
        }
      });
      return cursor.routerName;
    },
    expendFirstLeaf() {
      const indexList = this.getIndexListByFn(({ routerName }) => !!routerName);
      this.expendByIndexList(indexList);
    },
    expendByRouterName(theRouterName) {
      const indexList = this.getIndexListByFn(
        ({ routerName }) => routerName === theRouterName
      );
      this.expendByIndexList(indexList);
    },
    getIndexListByFn(checkFn, includeLeaf = false) {
      let targetIndexArr = null;
      const scan = (items, indexArr = []) => {
        if (targetIndexArr) return;
        for (let i = 0; i < items.length; i += 1) {
          if (targetIndexArr) break;

          if (checkFn(items[i])) {
            if (includeLeaf) {
              targetIndexArr = [...indexArr, i]; // 带有叶子节点
            } else {
              targetIndexArr = indexArr; // 需要展开的节点
            }
            break;
          }
          if (items[i].items) {
            scan(items[i].items, [...indexArr, i]);
          }
        }
      };
      scan(this.items);

      return targetIndexArr;
    }
  }
};
</script>
