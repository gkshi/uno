<template lang="pug">
  .monitoring-component
    div gameStatus: {{ gameStatus }}
    div activePlayer: {{ activePlayer || '-' }}
    div turn: {{ turn }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'monitoring-component',
  computed: {
    ...mapState({
      gameStatus: state => state.game.status,
      activePlayer: state => state.game.player,
      turn: state => state.game.turn
    })
  }
}
</script>

<style lang="scss" scoped>
  .monitoring-component {
    //
  }
</style>
