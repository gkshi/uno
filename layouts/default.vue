<template lang="pug">
  div
    loader(:ready="ready")
    nuxt
    .bg
</template>

<script>
import loader from '@/components/loader'

export default {
  components: {
    loader
  },
  data () {
    return {
      ready: false
    }
  },
  mounted () {
    this.ready = true
  }
}
</script>

<style lang="scss" scoped>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('/uno/bg.png') no-repeat center;
    background-size: cover;
  }
</style>
