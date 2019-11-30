<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <p-pagination :total="88" :current-page.sync="page" />
    <p-container>
      <p-header>a</p-header>
      <p-main>x</p-main>
    </p-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      page: 1
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
