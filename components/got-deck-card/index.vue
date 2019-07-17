<template lang="pug">
  .got-deck-card-component
    vModal(id="got_deck_card")
      .card.flex.center
        vCard(
          v-if="lastGotCard"
          :id="lastGotCard.id"
          :color="lastGotCard.color"
          :type="lastGotCard.type"
          :value="lastGotCard.value")
      .buttons.flex.center
        vButton(@click="play") Play
        vButton(@click="keep") Keep
</template>

<script>
import { mapState } from 'vuex'
import vModal from '@/components/modal'
import vCard from '@/components/card'
import vButton from '@/components/button'

export default {
  name: 'got-deck-card-component',
  components: {
    vModal,
    vCard,
    vButton
  },
  computed: {
    ...mapState({
      user: state => state.players.user
    }),
    lastGotCard () {
      return this.user._lastCard
    }
  },
  methods: {
    play () {
      this.$store.dispatch('makeMove', {
        cardId: this.lastGotCard.id,
        player: 'user'
      })
      this.$store.dispatch('closeModal', 'got_deck_card')
    },
    keep () {
      this.$store.dispatch('closeModal', 'got_deck_card')
      this.$store.dispatch('nextTurn')
    }
  }
}
</script>

<style lang="scss" scoped>
  .got-deck-card-component {
    .buttons {
      margin-top: 20px;
    }
  }
</style>
