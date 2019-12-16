<template>
  <div :class="`${prefix}-breadcrumb`">
    <div
      :class="`${prefix}-breadcrumb-item`"
      :key="index"
      v-for="(item, index) in items"
    >
      <span :class="{ link: item.routerName }" @click="handleClick(item)">{{
        item.text
      }}</span>
      <component :is="`${prefix}-icon`" type="right" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  props: {
    map: Object
  },
  computed: {
    // routename(){
    //   return this.$route.name
    // },
    items() {
      // const result = []
      // const [instance,oper]=this.$route.name.split('-')
      // console.log({instance,oper})
      // if(!oper){
      //   result.push({text:this.instanceMap[instance]})
      // }else{
      //   result.push({text:this.instanceMap[instance],routename:instance})
      //   result.push({text:this.operMap[oper]})
      // }
      // return result
      return this.map[this.$route.name];
    }
  },
  methods: {
    handleClick({ routerName }) {
      if (routerName) {
        this.$router.push({ name: routerName });
      }
    }
  }
};
</script>
