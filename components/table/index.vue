<template lang="pug">
  .table-component
    div table

    template(v-if="gameStatus === 'not_ready'")
      div ...loading

    template(v-else-if="gameStatus === 'ready'")
      div
        vButton(@click="startGame") начать

    template(v-else)
      .flex.wrap
        div(v-for="card in cards" :key="card.id" style="margin: 4px;") {{ card.id }}
</template>

<script>
import { mapState } from 'vuex'
import logMessages from '@/constants/logs'
import vButton from '@/components/button'

export default {
  name: 'table-component',
  components: {
    vButton
  },
  computed: {
    ...mapState({
      cards: state => state.table,
      players: state => state.players,
      gameStatus: state => state.game.status
    })
  },
  methods: {
    startGame () {
      this.dealFirstHands()
    },
    dealFirstHands () {
      Object.keys(this.players).forEach(key => {
        for (let j = 0; j < 7; j++) {
          this.dealCard(this.players[key].id)
        }
      })
      this.$store.dispatch('log', logMessages.hands_dealed)
      this.$store.dispatch('updateGameStatus', 'in_progress')
      this.$store.dispatch('nextTurn')
    },
    dealCard (player) {
      this.$store.dispatch('dealCard', player)
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-component {
    //
  }
</style>
