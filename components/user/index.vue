<template lang="pug">
  .user-component
    .user-hand.cards.flex.center(ref="hand")
      card.card(
        v-for="card in user.cards"
        :type="card.type"
        :color="card.color"
        :value="card.value"
        :key="card.id"
        :interactive="isCardActive(card, activeCards)"
        @click="makeMove(card)")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import mixinCards from '@/mixins/cards'
import card from '@/components/card'

export default {
  name: 'user-component',
  mixins: [mixinDeck, mixinCards],
  components: {
    card
  },
  computed: {
    ...mapState({
      activePlayer: state => state.game.player,
      gameColor: state => state.game.color,
      gameAccumulative: state => state.game.accumulative
    }),
    ...mapGetters({
      user: 'user',
      lastTableCard: 'lastTableCard'
    }),
    hand () {
      return this.user.cards
    },
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
    },
    activeCards () {
      console.log('------')
      console.log('user activeCards', this.activeCards)
    }
  },
  methods: {
    makeMove (card) {
      if (!this.isCardActive(card, this.activeCards)) {
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
