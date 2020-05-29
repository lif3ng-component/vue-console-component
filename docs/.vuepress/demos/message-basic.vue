<template>
  <div>
    <d-button type="primary" @click="$message('success msg')">show success message</d-button>
    <d-button type="error" @click="$message.error('error msg')">show error message</d-button>
  </div>
</template>