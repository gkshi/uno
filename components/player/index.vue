<template lang="pug">
  .player-component.flex
    .info
      .photo photo
      .label.name {{ name }}
    .hand
      .cards.flex
        card.card(:hidden="true" size="small" color="blue" value="4")
        card.card(:hidden="true" size="small" color="blue" value="4")
        card.card(:hidden="true" size="small" color="blue" value="4")
      .flex
        .label.count {{ cardsCount }}
</template>

<script>
import card from '@/components/card'

export default {
  name: 'player-component',
  components: {
    card
  },
  props: {
    name: {
      type: String,
      default: 'player'
    }
  },
  data () {
    return {
      cards: []
    }
  },
  computed: {
    cardsCount () {
      return this.cards.length
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
    }
    .label {
      background: $color-light;
      color: $color-dark;
      border-radius: 4px;
      text-align: center;
    }
    .count {
      margin-top: $margin;
    }
    .cards {
      .card {
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
