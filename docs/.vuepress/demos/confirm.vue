<template>
  <d-button @click="handleConfirm">open</d-button>
</template>
<script>
export default {
  methods:{
    handleConfirm(){
      this.$confirm('确定删除xxx？')
        .then(()=>{
          console.log('you confirmed')
        })
        .catch(()=>{
          console.log('you canceled')
        })

        
    }
  }
}
</script>