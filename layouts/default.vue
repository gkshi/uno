<template lang="pug">
  div
    loader(:ready="ready")
    nuxt
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
