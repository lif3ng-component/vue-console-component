<template>
  <d-select v-model="value" :optionList="optionList" />
</template>
<script>
export default {
  data(){
    return {
      value:'',
      optionList:[
        {id:1,name:'label 1'},
      ]
    }
  }
}
</script>