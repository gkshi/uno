<template lang="pug">
  .button-component(@click="$emit('click')")
    slot
</template>

<script>
export default {
  name: 'button-component'
}
</script>

<style lang="scss" scoped>
  .button-component {
    cursor: pointer;
  }
</style>
