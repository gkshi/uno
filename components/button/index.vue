<template lang="pug">
  .button-component(@click="$emit('click')" :class="`color-${color}`")
    slot
</template>

<script>
export default {
  name: 'button-component',
  props: {
    color: {
      type: String,
      default: 'red'
    }
  }
}
</script>

<style lang="scss">
  .buttons {
    .button-component {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .button-component {
    cursor: pointer;
    padding: 20px 30px 22px;
    background: $color-red;
    color: $color-light;
    border-radius: 20px;
    text-transform: uppercase;
    font-weight: $font-weight-bold;
    box-shadow: 4px 6px 0 0 darken($color-red, 16%);
    &:hover {
      margin-top: 2px;
      margin-left: 2px;
      background: lighten($color-red, 5%);
      box-shadow: 2px 5px 0 0 darken($color-red, 16%);
    }

    &.color-blue {
      background: $color-blue;
      box-shadow: 4px 6px 0 0 darken($color-blue, 16%);
      &:hover {
        background: lighten($color-blue, 4%);
        box-shadow: 2px 5px 0 0 darken($color-blue, 16%);
      }
    }
  }
</style>
