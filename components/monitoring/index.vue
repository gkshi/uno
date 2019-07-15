<template lang="pug">
  .monitoring-component
    div color: {{ color || 'null' }}
    div direction: {{ direction }}
    div accumulative: {{ accumulative || 'null' }}
    div gameStatus: {{ gameStatus }}
    div activePlayer: {{ activePlayer || '-' }}
    div colorPickerCard: {{ colorPickerCard || 'null' }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'monitoring-component',
  computed: {
    ...mapState({
      color: state => state.game.color,
      direction: state => state.game.direction,
      accumulative: state => state.game.accumulative,
      gameStatus: state => state.game.status,
      activePlayer: state => state.game.player,
      colorPickerCard: state => state._colorPickerCard
    })
  }
}
</script>

<style lang="scss" scoped>
  .monitoring-component {
    //
  }
</style>
