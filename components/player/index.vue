<template lang="pug">
  .player-component.flex
    .info
      .photo
        img(:src="data.photo")
      .label.name {{ data.name }}
    .hand
      .cards.flex(:ref="`hand_${id}`")
        card.card(
          v-for="card in data.cards"
          :hidden="true"
          size="small"
          type="card.type"
          color="card.color"
          value="card.value"
          :key="card.id")
      .flex(v-if="cardsCount")
        .label.count(v-if="cardsCount > 1") {{ cardsCount }}
        .label.count(v-else) UNO!
</template>

<script>
import card from '@/components/card'

export default {
  name: 'player-component',
  components: {
    card
  },
  props: {
    id: [Number, String],
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cardsCount () {
      return this.data.cards.length
    }
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
      .card {
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
