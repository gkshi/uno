<template lang="pug">
  .user-component
    .user-hand.cards.flex.center(ref="hand")
      card.card(
        v-for="card in user.cards"
        :type="card.type"
        :color="card.color"
        :value="card.value"
        :key="card.id"
        :interactive="isInteractive(card)"
        @click="makeMove(card)")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import card from '@/components/card'

export default {
  name: 'user-component',
  mixins: [mixinDeck],
  components: {
    card
  },
  computed: {
    ...mapState({
      activePlayer: state => state.game.player
    }),
    ...mapGetters({
      user: 'user',
      lastTableCard: 'lastTableCard'
    }),
    isActive () {
      return this.activePlayer === 'user'
    }
  },
  watch: {
    isActive () {
      if (this.isActive) {
        // TODO: проверять, может ли юзер походить
        // и если нет, то выводить кнопку "взять карту" на deck
      }
    }
  },
  methods: {
    cardCanMakeMove (card) {
      let is = false
      if (this.lastTableCard.value && this.lastTableCard.value === card.value) {
        is = true
      }
      if (this.lastTableCard.color === card.color) {
        is = true
      }
      if (this.lastTableCard.type !== 'number' && this.lastTableCard.type === card.type) {
        is = true
      }
      return is
    },
    isInteractive (card) {
      if (!this.isActive) {
        return false
      }
      return this.cardCanMakeMove(card)
    },
    makeMove (card) {
      if (!this.isInteractive(card)) {
        return
      }
      this.$store.dispatch('makeMove', {
        cardId: card.id,
        player: 'user'
      })
    }
  },
  mounted () {
    this.$store.dispatch('setEl', {
      player: 'user',
      el: this.$refs.hand
    })
  },
  updated () {
    this.fitDeck(this.$refs.hand)
  }
}
</script>

<style lang="scss" scoped>
  .user-component {
    width: 100%;
    .user-hand {
      width: 100%;
    }
  }
</style>
