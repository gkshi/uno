<template lang="pug">
  .user-component
    .user-hand.cards.flex.center(ref="hand")
      card.card(
        v-for="card in user.cards"
        :type="card.type"
        :color="card.color"
        :value="card.value"
        :key="card.id"
        :interactive="activePlayer === 'user'"
        @click="makeMove(card.id)")
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
      user: 'user'
    })
  },
  methods: {
    makeMove (cardId) {
      if (this.activePlayer !== 'user') {
        return
      }
      this.$store.dispatch('makeMove', {
        cardId,
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
