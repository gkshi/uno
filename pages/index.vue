<template lang="pug">
  .page.index
    .cards.flex
      card(color="black" type="wild_draw_four")
      card(color="black" type="wild")
      card(color="blue" value="5")
      card(color="red" type="skip")
      card(color="green" value="9")
      card(color="yellow" type="draw_two")
      card(color="red" type="draw_two")
      card(color="blue" type="number" value="0")
      card(color="green" type="reverse")
</template>

<script>
import card from '@/components/card'

export default {
  name: 'index-page',
  components: {
    card
  }
}
</script>

<style lang="scss" scoped>
.index {
  padding: 60px;
  .cards {
    & > * {
      margin: 0 5px;
    }
  }
}
</style>
