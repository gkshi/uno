<template lang="pug">
  .user-component
    .user-hand.cards.flex(ref="hand")
      card.card(
        v-for="card in user.cards"
        :type="card.type"
        :color="card.color"
        :value="card.value"
        :key="card.id"
        interactive)
</template>

<script>
import { mapGetters } from 'vuex'
import card from '@/components/card'

export default {
  name: 'user-component',
  components: {
    card
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  mounted () {
    this.$store.dispatch('setEl', {
      player: 'user',
      el: this.$refs.hand
    })
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
