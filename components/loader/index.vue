<template lang="pug">
  transition(name="loader")
    .loader-component.flex.center(v-if="show")
      transition(name="logo")
        logo.logo(v-if="showLogo")
</template>

<script>
import logo from '@/components/logo'

export default {
  name: 'loader-component',
  components: {
    logo
  },
  props: {
    ready: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      // default: 3000
      default: 2000
    }
  },
  data () {
    return {
      showLogo: false,
      readyToHide: false
    }
  },
  computed: {
    show () {
      return !this.readyToHide || !this.ready
    }
  },
  watch: {
    showLogo () {
      setTimeout(() => {
        this.readyToHide = !this.showLogo
      }, 1000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.showLogo = true
    }, 200)
    setTimeout(() => {
      this.showLogo = false
    }, this.min)
  }
}
</script>

<style lang="scss" scoped>
  .loader-component {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: $color-dark;
    cursor: default;
    user-select: none;
    transition: $transition-loader;

    .logo {
      width: 200px;
      height: 200px;
      transition: $transition-logo;

      &.logo-enter {
      opacity: 0;
      transform: scale(.94)
      }
      &.logo-leave-active {
        opacity: 0;
        transform: scale(1.08)
      }
    }

    &.loader-enter,
    &.loader-leave-active {
      opacity: 0;
    }
  }
</style>
