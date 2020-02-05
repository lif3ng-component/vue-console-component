<template>
  <div>
    <d-switch v-model="v" />
    <p>{{v}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      v: true
    };
  }
};
</script>
