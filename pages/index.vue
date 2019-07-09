<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          .flex.a-end
            .deck.flex(ref="deck")
              card(
              v-for="card in deck"
              :color="card.color"
              :type="card.type"
              :value="card.value"
              size="small"
              :hidden="true"
              :key="card.id")
            .label(v-if="cardsInDeck") {{ cardsInDeck }}

        .cell.flex.j-center.middle
          player(:data="players.bot1")

        .cell.flex.j-end.right
          div
            a(href="#" @click.prevent="restart") restart

      .row.flex.middle
        .cell.flex.a-center.left
          player(:data="players.bot3")

        .cell.flex.center.middle
          gameTable

        .cell.flex.j-end.a-center.right
          player(:data="players.bot2")

      .row.flex.bottom
        .cell.flex.a-end.left
          // gameLogs
          gameMonitoring

        .cell.flex.a-end.middle
          user

        .cell.flex.a-center.right
          vButton.uno-button(v-if="gameStatus === 'in_progress'" @click="sayUno") uno
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import logMessages from '@/constants/logs'
import card from '@/components/card'
import player from '@/components/player'
import gameTable from '@/components/table'
import user from '@/components/user'
import gameLogs from '@/components/logs'
import gameMonitoring from '@/components/monitoring'
import vButton from '@/components/button'

export default {
  name: 'index-page',
  mixins: [mixinDeck],
  components: {
    card,
    player,
    gameTable,
    user,
    gameLogs,
    gameMonitoring,
    vButton
  },
  computed: {
    ...mapState({
      players: state => state.players,
      gameStatus: state => state.game.status,
      deck: state => state.deck,
      logs: state => state.logs
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck'
    })
  },
  methods: {
    restart () {
      this.$store.dispatch('restart').then(() => {
        this.fitDeck(this.$refs.deck)
      })
    },
    initDeck () {
      this.$store.dispatch('createDeck').then(() => {
        this.fitDeck(this.$refs.deck)
        this.$store.dispatch('updateGameStatus', 'ready')
      })
    },

    sayUno () {
      alert('UNO!')
      this.$store.dispatch('log', logMessages.user_uno)
    }
  },
  mounted () {
    this.initDeck()
  }
}
</script>

<style lang="scss" scoped>
$padding: 3%;
.index {
  height: 100vh;
  min-height: 700px;
  .table {
    height: 100%;
    overflow: hidden;
    .row {
      &.top {
        height: 29%;
        padding-top: $padding;
      }
      &.middle {
        height: 39%;
      }
      &.bottom {
        height: 32%;
        padding-bottom: $padding;
      }
    }
    .cell {
      &.left {
        width: 27%;
        padding-left: $padding;
      }
      &.middle {
        width: 46%;
      }
      &.right {
        width: 27%;
        padding-right: $padding;
      }
    }
  }
  .deck {
    width: 100%;
    max-width: 240px;
    min-height: 100px;
    margin-right: 10px;
    overflow: hidden;
    &.hidden {
      opacity: 0;
    }
  }
  .game {
    & > * {
      margin: 0 5px;
    }
  }
  .uno-button {
    margin-left: 40px;
    &:hover {
      margin-left: 42px;
    }
  }
}
</style>
