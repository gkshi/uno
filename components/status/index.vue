<template lang="pug">
  .status-component
    // div Направление: {{ game.direction }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'status-component',
  computed: {
    ...mapState({
      game: state => state.game.direction
    })
  }
}
</script>

<style lang="scss" scoped>
  .status-component {
    //
  }
</style>
