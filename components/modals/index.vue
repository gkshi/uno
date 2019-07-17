<template lang="pug">
  .modals-component
    colorPicker
    gotDeckCard
    finishModal
    // dev only: deal card modal
    dealCardModal
</template>

<script>
import colorPicker from './color-picker'
import gotDeckCard from './got-deck-card'
import finishModal from './finish'
import dealCardModal from './deal-card'

export default {
  name: 'modals-component',
  components: {
    colorPicker,
    gotDeckCard,
    finishModal,
    dealCardModal
  }
}
</script>

<style lang="scss" scoped>
  .modals-component {
    //
  }
</style>
