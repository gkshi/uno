<template lang="pug">
  .deck-component.flex.a-end
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import card from '@/components/card'

export default {
  name: 'deck-component',
  mixins: [mixinDeck],
  components: {
    card
  },
  computed: {
    ...mapState({
      deck: state => state.deck
    }),
    ...mapGetters({
      cardsInDeck: 'cardsInDeck'
    })
  },
  updated () {
    this.fitDeck(this.$refs.deck)
  }
}
</script>

<style lang="scss" scoped>
  .deck-component {
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
  }
</style>
