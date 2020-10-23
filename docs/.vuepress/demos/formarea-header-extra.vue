<template>
  <div>
    <d-form-area>
      <template #headerExtra>
        <a v-popper="{ trigger: 'mouseenter focus', placement: 'bottom-end' }">
          more
        </a>
        <d-dropdown-menu :items="menuItems" />
      </template>
    </d-form-area>
    <d-form-area>
      <template #headerExtra>
        <d-switch v-model="show" />
      </template>
    </d-form-area>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      menuItems: [
        {
          icon: "edit",
          text: "item1",
          fn: () => console.log("item1"),
        },
      ],
    };
  },
};
</script>
