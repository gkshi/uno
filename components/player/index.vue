<template lang="pug">
  .player-component.flex
    .info
      .photo
        img(:src="data.photo")
      .label.name {{ data.name }}
    .hand
      .cards.flex(ref="hand")
        card.card(
          v-for="card in data.cards"
          :hidden="false"
          size="small"
          :type="card.type"
          :color="card.color"
          :value="card.value"
          :key="card.id")
      .flex(v-if="cardsCount")
        .label.count(v-if="cardsCount > 1") {{ cardsCount }}
        .label.count(v-else) UNO!
</template>

<script>
import mixinDeck from '@/mixins/deck'
import card from '@/components/card'

export default {
  name: 'player-component',
  mixins: [mixinDeck],
  components: {
    card
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cardsCount () {
      return this.data.cards.length
    }
  },
  mounted () {
    this.$store.dispatch('setEl', {
      player: this.data.id,
      el: this.$refs.hand
    })
  },
  updated () {
    this.fitDeck(this.$refs.hand)
  }
}
</script>

<style lang="scss" scoped>
  $margin: 10px;
  .player-component {
    .info {
      margin-right: $margin;
    }
    .photo {
      width: 100px;
      height: 100px;
      background: $color-light;
      color: $color-dark;
      margin-bottom: $margin;
      border-radius: 4px;
      border: 4px solid $color-light;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 2px;
      }
    }
    .count {
      margin-top: $margin;
    }
    .cards {
      width: 230px;
      height: 100px;
      overflow: hidden;
      .card {
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
