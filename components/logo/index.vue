<template lang="pug">
  .logo-component
</template>

<script>
export default {
  name: 'logo-component'
}
</script>

<style lang="scss" scoped>
  .logo-component {
    width: 100px;
    height: 100px;
    user-select: none;
    background: url('/logo.svg') no-repeat center;
    background-size: contain;
  }
</style>
