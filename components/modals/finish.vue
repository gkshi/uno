<template lang="pug">
  .finish-modal-component
    vModal(id="finish" with-bg)
      .flex.column.center
        div Game ended.
        div
          span The winner is&nbsp;
          strong {{ activePlayer }}
          span .
        div
          vButton(@click="restart") Restart
</template>

<script>
import { mapState } from 'vuex'
import vModal from '@/components/modals/modal'

export default {
  name: 'finish-modal-component',
  components: {
    vModal
  },
  computed: {
    ...mapState({
      activePlayer: state => state.game.player
    })
  },
  methods: {
    restart () {
      this.$store.dispatch('restart')
    }
  }
}
</script>

<style lang="scss" scoped>
  .finish-modal-component {
    //
  }
</style>
