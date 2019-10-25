<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          gameDeck
          gameStatus
        .cell.flex.j-center.middle
          gamePlayer(:data="players.bot1")
        .cell.flex.j-end.right
          div
            a(href="#" @click.prevent="restart") Restart
            a.github(href="https://github.com/gkshi/uno" target="_blank") Github
            a.more-projects(href="https://gkshi.github.io/" target="_blank") More projects
            template(v-if="isDev")
              span &nbsp;
              a(href="#" @click.prevent="openModal('deal_card')") Deal card

      .row.flex.middle
        .cell.flex.a-center.left
          gamePlayer(:data="players.bot3")
        .cell.flex.center.middle
          gameTable
        .cell.flex.j-end.a-center.right
          gamePlayer(:data="players.bot2" inversed)

      .row.flex.bottom
        .cell.flex.a-end.left
          gameLogs
          // gameMonitoring
        .cell.flex.a-end.middle
          gameUser
        .cell.flex.a-center.right
          vButton.uno-button(v-if="game.status === 'in_progress'" @click="sayUno") uno

    // eventNotification
    // modals
    gameModals
</template>

<script>
import { mapState } from 'vuex'
import mixinDeck from '@/mixins/deck'
import gameDeck from '@/components/deck'
import gameStatus from '@/components/status'
import logMessages from '@/constants/logs'
import gamePlayer from '@/components/player'
import gameTable from '@/components/table'
import gameUser from '@/components/user'
import gameLogs from '@/components/logs'
import gameMonitoring from '@/components/monitoring'
import vButton from '@/components/button'
import gameModals from '@/components/modals'
import eventNotification from '@/components/notification'

export default {
  name: 'index-page',
  mixins: [mixinDeck],
  components: {
    gameDeck,
    gameStatus,
    gamePlayer,
    gameTable,
    gameUser,
    gameLogs,
    gameMonitoring,
    vButton,
    gameModals,
    eventNotification
  },
  computed: {
    ...mapState({
      players: state => state.players,
      game: state => state.game,
      table: state => state.table
    }),
    isDev () {
      return process.env.isDev
    }
  },
  watch: {
    'game.player' () {
      if (this.table.length > 1) {
        const lastCard = this.table[this.table.length - 1]
        this.$store.dispatch('log', this.$t('turn_finish', {
          player: this.game.player,
          card: lastCard.value || lastCard.type,
          color: lastCard.color
        }))
      }
      if (this.game.player) {
        this.$store.dispatch('log', this.$t('turn_start', { player: this.game.player === 'user' ? this.$t('you') : this.players[this.game.player].name }))
      }
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
  .github,
  .more-projects {
    margin-left: 20px;
    font-weight: $font-weight-bold;
  }
}
</style>
