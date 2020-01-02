<template>
  <div>
    <d-button @click="visible = true">show</d-button>
    <d-login-page
      v-if="visible" 
      logoSrc="/logoplaceholder.png" 
      logoText="logo text"
      bgSrc="/loginBg.png">
      <d-form-area no-border hide-label :items="formItems" v-model="form" />
      <d-container reverse>
        <a>忘记密码</a>
      </d-container>
      <d-button block type="primary">登录</d-button>
      <d-container>
        <a @click="visible = false">返回文档</a>
      </d-container>
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
            iconBefore:'mail'
          }
        },
        {
          prop:'password',
          type:'input',
          props:{
            iconBefore:'key'
          },
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
