<template>
  <div>
  <d-form-area no-border :items="items" v-model="form" :rules="rules" />
  <d-form-area no-border :items="items" v-model="form" :rules="rules" />
  </div>
</template>
<script>
export default {
  data(){
    return {
      rules:{
        name:['required'],
        prop2:['required']
      },
      form:{},
      items: [
        {type:'input',prop:'name',label:'姓名',attrs:{placeholder:'please input name',type:'number',min:1,max:10}},
        {type:'select',prop:'prop2',label:'select label',placeholder:'please select',optionList:[{id:1,name:'111'},{id:2,name:'2222'}]}
      ]
    }
  }
}
</script>