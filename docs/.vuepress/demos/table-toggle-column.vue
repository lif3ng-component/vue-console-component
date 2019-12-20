<template>
  <div>
    <d-button @click="toggle">toggle</d-button>
  <d-table :columns="columns" :data="data" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      v1:1,
      v2:1,
      data:[{prop1:'aaa',prop2:'bbb'}],
      columns:[
        {
          prop:'prop1',
          label:'label 1',
        },
        {
          show:()=>this.v1===this.v2,
          prop:'prop2',
          label:'label 2'
        }
      ]
    }
  },
  watch:{
    // v1(v){
    //   console.log(v)
    // }
  },
  methods:{
    toggle(){
      console.log('toggle',this.v1 ===1 ? 0 : 1)
      this.v1 = (this.v1 ===1 ? 0 : 1)
    }
  }
}
</script>