<template lang="pug">
  .monitoring-component
    div direction: {{ direction }}
    div gameStatus: {{ gameStatus }}
    div activePlayer: {{ activePlayer || '-' }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'monitoring-component',
  computed: {
    ...mapState({
      direction: state => state.game.direction,
      gameStatus: state => state.game.status,
      activePlayer: state => state.game.player
    })
  }
}
</script>

<style lang="scss" scoped>
  .monitoring-component {
    //
  }
</style>
