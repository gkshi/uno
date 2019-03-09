<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          .flex.a-end
            .deck.flex(ref="hand" :class="deckClass")
              card(
              v-for="card in deck"
              :color="card.color"
              :type="card.type"
              :value="card.value"
              size="small"
              :hidden="true"
              :key="card.id")
            .label {{ cardsInDeck }}
        .cell.flex.j-center.middle
          player(:data="players[0]")
        .cell.flex.j-end.right
          div menu
      .row.flex.middle
        .cell.flex.a-center.left
          player(:data="players[1]")
        .cell.flex.center.middle
          div
            a(href="#" @click.prevent="initDeck") start
        .cell.flex.j-end.a-center.right
          player(:data="players[2]")
      .row.flex.bottom
        .cell.flex.a-end.left
          div logs
        .cell.flex.a-end.middle
          .game.flex
            card(color="black" type="wild_draw_four")
            card(color="black" type="wild")
            card(color="yellow" type="draw_two")
            card(color="red" type="skip")
            card(color="green" type="reverse")
            card(color="blue" value="4")
        .cell.flex.a-center.right
          div uno
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import card from '@/components/card'
import player from '@/components/player'

export default {
  name: 'index-page',
  components: {
    card,
    player
  },
  data () {
    return {
      isDeckHidden: true
    }
  },
  computed: {
    ...mapState({
      players: state => state.players,
      deck: state => state.deck
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck'
    }),
    deckClass () {
      return this.isDeckHidden ? 'hidden' : ''
    }
  },
  methods: {
    initDeck () {
      this.$store.dispatch('createDeck').then(() => {
        this.fitDeck()
      })
    },
    fitDeck () {
      const hand = this.$refs.hand
      const offset = 6
      const margin = 10
      console.log(hand)
      console.log(hand.children, hand.children.length)
      console.log(hand.children[0])
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
    }
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
}
</style>
