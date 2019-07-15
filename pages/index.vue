<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          gameDeck
        .cell.flex.j-center.middle
          gamePlayer(:data="players.bot1")
        .cell.flex.j-end.right
          div
            a(href="#" @click.prevent="restart") restart
            template(v-if="isDev")
              span &nbsp;
              a(href="#" @click.prevent="openModal('deal_card')") deal card

      .row.flex.middle
        .cell.flex.a-center.left
          gamePlayer(:data="players.bot3")
        .cell.flex.center.middle
          gameTable
        .cell.flex.j-end.a-center.right
          gamePlayer(:data="players.bot2" inversed)

      .row.flex.bottom
        .cell.flex.a-end.left
          // gameLogs
          gameMonitoring
        .cell.flex.a-end.middle
          gameUser
        .cell.flex.a-center.right
          vButton.uno-button(v-if="gameStatus === 'in_progress'" @click="sayUno") uno

    // modals
    colorPicker

    vModal(id="finish")
      .flex.column.center
        div Game ended.
        div The winner is {{ activePlayer }}.
        div
          a(href="#" @click.prevent="restart") Restart

    // dev only: deal card modal
    vModal(v-if="isDev" id="deal_card" with-bg)
      div
        div Deal card
        div
          span to:
          select(ref="deal_to")
            option(v-for="player in players" :value="player.id" :key="player.id") {{ player.id }}
        div
          span card type:
          select(ref="deal_type")
            option(value="wild_draw_four") wild_draw_four
            option(value="wild") wild
            option(value="draw_two") draw_two
        div
          span card color:
          select(ref="deal_color")
            option(value="red") red
            option(value="green") green
            option(value="yellow") yellow
            option(value="blue") blue
        div
          vButton(@click="dealCard") Deal
</template>

<script>
import { mapState } from 'vuex'
import mixinDeck from '@/mixins/deck'
import gameDeck from '@/components/deck'
import logMessages from '@/constants/logs'
import gamePlayer from '@/components/player'
import gameTable from '@/components/table'
import gameUser from '@/components/user'
import gameLogs from '@/components/logs'
import gameMonitoring from '@/components/monitoring'
import vButton from '@/components/button'
import colorPicker from '@/components/color-picker'
import vModal from '@/components/modal'

export default {
  name: 'index-page',
  mixins: [mixinDeck],
  components: {
    gameDeck,
    gamePlayer,
    gameTable,
    gameUser,
    gameLogs,
    gameMonitoring,
    vButton,
    colorPicker,
    vModal
  },
  computed: {
    ...mapState({
      players: state => state.players,
      gameStatus: state => state.game.status,
      activePlayer: state => state.game.player,
      logs: state => state.logs
    }),
    isDev () {
      return process.env.isDev
    }
  },
  methods: {
    init () {
      this.$store.dispatch('createDeck').then(() => {
        this.$store.dispatch('updateGameStatus', 'ready')
      })
    },
    restart () {
      this.$store.dispatch('restart')
    },
    sayUno () {
      alert('UNO!')
      this.$store.dispatch('log', logMessages.user_uno)
    },
    // dev only
    dealCard () {
      const card = {
        id: Math.random().toFixed(7).slice(2),
        type: this.$refs.deal_type.value,
        color: this.$refs.deal_type.value === 'wild_draw_four' || this.$refs.deal_type.value === 'wild' ? 'black' : this.$refs.deal_color.value,
        _position: null
      }
      const deck = [ ...this.$store.state.deck ]
      deck.push(card)
      this.$store.commit('DECK_UPDATE', deck)
      this.$store.dispatch('dealCard', this.$refs.deal_to.value)
      this.$store.dispatch('closeModal', 'deal_card')
    },
    openModal (id) {
      this.$store.dispatch('openModal', id)
    }
  },
  mounted () {
    this.init()
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
