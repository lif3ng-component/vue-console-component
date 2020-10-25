<template>
  <div>
    <d-switch :togglePromiseFn="toggle" v-model="v" />
    <p>
      mock 异步请求<input v-model="remoteSuccess" type="checkbox" />{{
        remoteSuccess ? "能" : "不能"
      }}成功
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remoteV: true,
      v: true,
      remoteSuccess: true
    };
  },
  methods: {
    mockSet(v) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.remoteSuccess) {
            this.remoteV = v;
            resolve("success");
          }
          reject(new Error("remote save error"));
        }, 1000);
      });
    },
    mockGet() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.remoteV);
        }, 1000);
      });
    },
    // async 写法
    // async toggle(value) {
    //   try {
    //     await this.mockSet(value);
    //     this.$message("修改成功");
    //   } catch (e) {
    //     this.$message.error(e.message);
    //     throw e;
    //   }
    //   return;
    // },
    // promise 写法
    toggle(value) {
      return this.mockSet(value)
        .then(() => {
          this.$message("修改成功");
        })
        .catch(e => {
          this.$message.error(e.message);
          // 必须保持 rejected 状态，以保证不切换 switch 状态
          throw e;
        });
      // 单字段修改不应该重新请求数据
      // .then(this.mockGet)
      // .then(v => {
      //   console.log(`客户端值:${this.v},响应值:${v}`);
      // });
    }
  }
};
</script>