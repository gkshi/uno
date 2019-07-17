<template lang="pug">
  .deal-card-modal-component
    vModal(v-if="isDev" id="deal_card" with-bg closing)
      div
        div Deal card
        div
          span to:
          select(ref="deal_to")
            option(value="deck") deck
            option(v-for="player in players" :value="player.id" :key="player.id") {{ player.id }}
        div
          span card type:
          select(ref="deal_type")
            option(value="wild_draw_four") wild_draw_four
            option(value="wild") wild
            option(value="draw_two") draw_two
            option(value="skip") skip
        div
          span card color:
          select(ref="deal_color")
            option(value="red") red
            option(value="green") green
            option(value="yellow") yellow
            option(value="blue") blue
        .flex
          vButton(@click="dealCard") Deal
</template>

<script>
import { mapState } from 'vuex'
import vModal from '@/components/modals/modal'
import vButton from '@/components/button'

export default {
  name: 'deal-card-modal-component',
  components: {
    vModal,
    vButton
  },
  computed: {
    ...mapState({
      players: state => state.players
    }),
    isDev () {
      return process.env.isDev
    }
  },
  methods: {
    dealCard () {
      const card = {
        id: Math.random().toFixed(7).slice(2),
        type: this.$refs.deal_type.value,
        color: this.$refs.deal_type.value === 'wild_draw_four' || this.$refs.deal_type.value === 'wild' ? 'black' : this.$refs.deal_color.value,
        _position: null
      }
      const deck = [ ...this.$store.state.deck ]
      deck.push(card)
      this.$store.commit('DECK_UPDATE', deck)
      if (this.$refs.deal_to.value !== 'deck') {
        this.$store.dispatch('dealCard', this.$refs.deal_to.value)
      }
      this.$store.dispatch('closeModal', 'deal_card')
    }
  }
}
</script>

<style lang="scss" scoped>
  .deal-card-modal-component {
    //
  }
</style>
