<template lang="pug">
  transition
    .modal-component.flex.center(v-if="show" :class="{ 'bg': withBg }" @click.self="close")
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
    },
    withBg: Boolean,
    closing: Boolean
  },
  computed: {
    ...mapState({
      modal: state => state.modal
    }),
    show () {
      return this.id === this.modal
    }
  },
  methods: {
    close () {
      if (this.closing) {
        this.$store.dispatch('closeModal', this.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-component {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    background: rgba($color-dark, .5);
    transition: $transition-default;
    dialog {
      border: none;
      background: transparent;
      padding: 0;
      transition: $transition-default;
    }
    &.bg {
      dialog {
        background: $color-light;
        padding: 20px;
      }
    }

    &.v-enter {
      opacity: 0;
      dialog {
        opacity: 0;
        transform: scale(.8);
      }
    }
    &.v-leave-active {
      opacity: 0;
    }
  }
</style>
