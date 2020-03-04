<template>
  <div>
    <d-button @click="show = true">show</d-button>
    <d-full-screen-page
      v-if="show"
      bgSrc="/loginBg.png"
      :show-promise="contentShowPromise"
    >
      <div style="width:100px;height:100px;">
        <a @click="show = false">返回</a>
      </div>
    </d-full-screen-page>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    contentShowPromise() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    }
  }
};
</script>
