<template lang="pug">
  .player-component.flex
    .info
      .photo photo
      .label.name {{ data.name }}
    .hand
      .game.flex
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
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      game: []
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
    }
    .count {
      margin-top: $margin;
    }
    .game {
      .card {
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
