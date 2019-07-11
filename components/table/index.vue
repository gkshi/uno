<template lang="pug">
  .table-component.flex.center
    template(v-if="gameStatus === 'not_ready'")
      div ...loading

    template(v-else-if="gameStatus === 'ready'")
      div
        vButton(color="blue" @click="startGame") Играть

    template(v-else)
      .flex.wrap
        vCard(
          v-for="card in cards"
          :color="card.color"
          :type="card.type"
          :value="card.value"
          :style="cardStyle(card._position)"
          :key="card.id") {{ card.id }}
</template>

<script>
import { mapState } from 'vuex'
import logMessages from '@/constants/logs'
import vButton from '@/components/button'
import vCard from '@/components/card'

export default {
  name: 'table-component',
  components: {
    vButton,
    vCard
  },
  computed: {
    ...mapState({
      cards: state => state.table,
      players: state => state.players,
      gameStatus: state => state.game.status
    })
  },
  methods: {
    cardStyle (position = {}) {
      return `position: absolute; top: ${position.top}; left: ${position.left}; transform: rotate(${position.angle});`
    },
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
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
