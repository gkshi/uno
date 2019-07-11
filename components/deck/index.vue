<template lang="pug">
  .deck-component.flex.a-end
    .action.flex.a-center
      vButton(@click="takeCard") Взять карту
    .deck.flex(ref="deck")
      gameCard(
        v-for="card in deck"
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
      deck: state => state.deck
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck'
    })
  },
  methods: {
    takeCard () {
      this.$store.dispatch('takeCardFromDeck', 'user')
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
      &.hidden {
        opacity: 0;
      }
    }
    .action {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      padding-left: 20px;
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      .action {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>
