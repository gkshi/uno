<template lang="pug">
  .page.index
    .table
      .row.flex.top
        .cell.left
          div card stack
        .cell.flex.j-center.middle
          player(name="player 3")
        .cell.flex.j-end.right
          div menu
      .row.flex.middle
        .cell.flex.a-center.left
          player(name="player 2")
        .cell.flex.center.middle
          div game table
        .cell.flex.j-end.a-center.right
          player(name="player 4")
      .row.flex.bottom
        .cell.flex.a-end.left
          div logs
        .cell.flex.a-end.middle
          .cards.flex
            card(color="black" type="wild_draw_four")
            card(color="black" type="wild")
            card(color="yellow" type="draw_two")
            card(color="red" type="skip")
            card(color="green" type="reverse")
            card(color="blue" value="4")
        .cell.flex.a-center.right
          div uno
</template>

<script>
import card from '@/components/card'
import player from '@/components/player'

export default {
  name: 'index-page',
  components: {
    card,
    player
  }
}
</script>

<style lang="scss" scoped>
$padding: 3%;
.index {
  height: 100vh;
  .table {
    height: 100%;
    .row {
      &.top {
        height: 29%;
        padding-top: $padding;
      }
      &.middle {
        height: 39%;
      }
      &.bottom {
        height: 32%;
        padding-bottom: $padding;
      }
    }
    .cell {
      &.left {
        width: 27%;
        padding-left: $padding;
      }
      &.middle {
        width: 46%;
      }
      &.right {
        width: 27%;
        padding-right: $padding;
      }
    }
  }
  .cards {
    & > * {
      margin: 0 5px;
    }
  }
}
</style>
