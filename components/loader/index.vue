<template lang="pug">
  transition(name="loader")
    .loader-conponent.flex.center(v-if="show")
      logo.logo
</template>

<script>
import logo from '@/components/logo'

export default {
  name: 'loader-conponent',
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
      }, 500)
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
  .loader-conponent {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $color-dark;
    cursor: default;
    user-select: none;
    transition: $transition-loader;
    .logo {
      width: 200px;
      height: 200px;
      transition: $transition-loader;
    }
    &.loader-enter,
    &.loader-leave-active {
      opacity: 0;
      .logo {
        transform: scale(1.1);
        opacity: 0;
      }
    }
  }
</style>
