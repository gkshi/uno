<template lang="pug">
  .modal-component.flex.center(v-if="show")
    dialog(:open="show")
      slot
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'modal-component',
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(7).slice(2)
    }
  },
  computed: {
    ...mapState({
      modal: state => state.modal
    }),
    show () {
      return this.id === this.modal
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-component {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color-dark, .5);
    dialog {
      border: none;
      background: transparent;
      padding: 0;
    }
  }
</style>
