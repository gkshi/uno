<template lang="pug">
  .deck-component.flex.a-end(:class="{ 'no-pointer-events': !isUserActive }")
    .action.flex.a-center(:class="{ 'show': showButton }")
      vButton(@click="takeCard") Взять
    .deck.flex(ref="deck")
      gameCard(
        v-for="card in deck"
        :id="card.id"
        :color="card.color"
        :type="card.type"
        :value="card.value"
        size="small"
        :hidden="true"
        :key="card.id")
    .label(v-if="cardsInDeck") {{ cardsInDeck }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import gameCard from '@/components/card'
import vButton from '@/components/button'

export default {
  name: 'deck-component',
  mixins: [mixinDeck],
  components: {
    gameCard,
    vButton
  },
  computed: {
    ...mapState({
      deck: state => state.deck,
      activePlayer: state => state.game.player,
      gameAccumulative: state => state.game.accumulative
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck',
      player: 'player'
    }),
    isUserActive () {
      return this.activePlayer === 'user'
    },
    showButton () {
      return this.isUserActive && this.player('user').cards.length && this.userActiveCards < 1
    },
    userActiveCards () {
      return this.player('user').activeCards
    }
  },
  methods: {
    takeCard () {
      if (this.gameAccumulative) {
        this.$store.dispatch('takeAccumulativeCards', 'user')
      } else {
        this.$store.dispatch('takeCardFromDeck', 'user')
      }
    }
  },
  updated () {
    this.fitDeck(this.$refs.deck)
  }
}
</script>

<style lang="scss" scoped>
  .deck-component {
    position: relative;
    .deck {
      width: 100%;
      max-width: 240px;
      min-height: 100px;
      margin-right: 10px;
      overflow: hidden;
    }
    .action {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      padding-left: 34px;
      opacity: 0;
      visibility: hidden;
      &.show {
        opacity: 1;
        visibility: visible;
      }
    }
    &:hover {
      .action {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>
