<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          .flex.a-end
            .deck.flex(ref="deck" :class="deckClass")
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
          div menu
      .row.flex.middle
        .cell.flex.a-center.left
          player(:data="players.bot3")
        .cell.flex.center.middle
          div
            a(href="#" @click.prevent="initDeck") start
            span &nbsp;
            a(href="#" @click.prevent="dealFirstHands") deal cards
        .cell.flex.j-end.a-center.right
          player(:data="players.bot2")
      .row.flex.bottom
        .cell.flex.a-end.left
          logs
        .cell.flex.a-end.middle
          .user-hand.cards.flex(ref="hand")
            card.card(
              v-for="card in user.cards"
              :type="card.type"
              :color="card.color"
              :value="card.value"
              :key="card.id")
        .cell.flex.a-center.right
          div uno
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import logMessages from '@/constants/logs'
import card from '@/components/card'
import player from '@/components/player'
import logs from '@/components/logs'

export default {
  name: 'index-page',
  components: {
    card,
    player,
    logs
  },
  data () {
    return {
      isDeckHidden: true
    }
  },
  computed: {
    ...mapState({
      players: state => state.players,
      deck: state => state.deck,
      logs: state => state.logs
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck',
      user: 'user'
    }),
    deckClass () {
      return this.isDeckHidden ? 'hidden' : ''
    }
  },
  methods: {
    initDeck () {
      this.$store.dispatch('createDeck').then(() => {
        this.fitDeck(this.$refs.deck)
      })
    },
    fitDeck (hand) {
      if (!hand) {
        return
      }
      const offset = 6
      const margin = 10
      const handWidth = hand.offsetWidth
      const cardWidth = hand.children[0].offsetWidth

      if (getComputedStyle(hand).getPropertyValue('position') !== 'absolute') {
        hand.style.position = 'relative'
      }

      if ((cardWidth * hand.children.length) + (margin * hand.children.length - 1) < handWidth) {
        hand.style.minHeight = ''
        for (let i = 0; i < hand.children.length; i++) {
          hand.children[i].style.position = ''
        }
        return
      }

      hand.style.minHeight = `${hand.children[0].offsetHeight}px`
      let step = (handWidth - cardWidth) / (hand.children.length - 1)
      for (let i = 0; i < hand.children.length; i++) {
        let card = hand.children[i]
        card.style.position = 'absolute'
        if (step < offset) {
          if ((offset * i) >= (handWidth - card.offsetWidth)) {
            card.style.left = `${handWidth - card.offsetWidth}px`
          } else {
            card.style.left = `${offset * i}px`
          }
        } else {
          card.style.left = `${step * i}px`
        }
      }
      setTimeout(() => {
        this.isDeckHidden = false
      }, 10)
    },
    dealFirstHands () {
      Object.keys(this.players).forEach(key => {
        return new Promise((resolve, reject) => {
          for (let j = 0; j < 7; j++) {
            this.dealCard(this.players[key].id)
          }
          resolve()
        }).then(() => {
          setTimeout(() => {
            this.fitDeck(this.players[key].el)
          }, 100)
        })
      })
      this.fitDeck(this.$refs.deck)
      this.$store.dispatch('log', logMessages.handsDealed)
    },
    dealCard (player) {
      this.$store.dispatch('dealCard', player)
    }
  },
  mounted () {
    this.$store.dispatch('setEl', {
      player: 'user',
      el: this.$refs.hand
    }).then(() => {
      this.initDeck()
    })
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
    &.hidden {
      opacity: 0;
    }
  }
  .game {
    & > * {
      margin: 0 5px;
    }
  }
  .user-hand {
    width: 100%;
  }
}
</style>
