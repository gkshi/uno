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
    gameModals
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
import gameModals from '@/components/modals'

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
    gameModals
  },
  computed: {
    ...mapState({
      players: state => state.players,
      gameStatus: state => state.game.status,
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
