<template>
  <d-container>
    <d-header>
      <d-header-container top>
        <template #logo>
          <img src="/logoplaceholder.png" @click="handleLogoClick" />
          <template v-if="state === 0">文字0</template>
          <template v-else>文字1</template>
        </template>
        <a @click="toggleState">toggle state</a>
        <template v-if="state === 0">
          <a v-popper="{ placement: 'bottom-end' }">state 0</a>
          <d-dropdown-menu :items="items" />
        </template>
        <template v-else>
          <a>state 1</a>
        </template>
      </d-header-container>
    </d-header>
  </d-container>
</template>
<script>
export default {
  data() {
    return {
      state: 0,
      items: [{ text: "11", fn: () => {} }]
    };
  },
  methods: {
    toggleState() {
      this.state = this.state ? 0 : 1;
    },
    handleLogoClick() {
      console.log("handle logo click");
    }
  }
};
</script>
