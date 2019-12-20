<template>
  <div>
    <d-button @click="visible = true">show</d-button>
    <d-login-page
      v-if="visible" 
      logoSrc="/logoplaceholder.png" 
      logoText="logo text" 
      bgSrc="/loginBg.png">
      <d-form-area no-border hide-label :items="formItems" v-model="form" />
      <d-button block type="primary">登录</d-button>
      <a @click="visible = false">go back</a>
    </d-login-page>
  </div>
</template>
<script>
export default {
  data(){
    return {
      visible: true,
      form:{},
      formItems: [
        {
          prop:'username',
          placeholder:'用户名',
          props:{

          }
        },
        {
          prop:'password',
          type:'input',
          attrs:{
            type:'password',
            placeholder: '密码'
          }
        }
      ]
    }
  }
}
</script>
