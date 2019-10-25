<template lang="pug">
  .color-picker-component
    vModal(id="color_picker")
      .colors.flex.center
        .color.red(@click="makeMove('red')")
        .color.green(@click="makeMove('green')")
        .color.blue(@click="makeMove('blue')")
        .color.yellow(@click="makeMove('yellow')")
</template>

<script>
import { mapState } from 'vuex'
import vModal from '@/components/modals/modal'

export default {
  name: 'color-picker-component',
  components: {
    vModal
  },
  computed: {
    ...mapState({
      colorPickerCard: state => state._colorPickerCard,
      activePlayer: state => state.game.player
    })
  },
  methods: {
    makeMove (color) {
      this.$store.dispatch('makeMove', {
        cardId: this.colorPickerCard,
        player: this.activePlayer,
        color
      })
      this.$store.dispatch('closeModal', 'color_picker')
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-picker-component {
    .colors {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: $color-light;
      overflow: hidden;
      flex-wrap: wrap;
      border: 14px solid $color-light;
    }
    .color {
      position: relative;
      width: 50%;
      height: 50%;
      cursor: pointer;
      &.red {
        background: $color-red;
      }
      &.green {
        background: $color-green;
      }
      &.yellow {
        background: $color-yellow;
      }
      &.blue {
        background: $color-blue;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('/uno/color-picker.svg') no-repeat;
        background-position: inherit;
        background-size: auto 270px;
      }
      &:nth-child(1) {
        background-position: top left;
      }
      &:nth-child(2) {
        background-position: top right;
        &:before {
          top: 10px;
          left: 5px;
          background-size: auto 266px;
          transform: rotate(5deg);
        }
      }
      &:nth-child(3) {
        background-position: bottom left;
      }
      &:nth-child(4) {
        background-position: bottom right;
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 50px;
        height: 40px;
        transform: translate(-50%, -50%) scale(0);
        // transform: translate(-50%, -50%);
        transition: $transition-default;
        background: url('/uno/check.svg') no-repeat;
      }
      &:hover {
        &:after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
</style>
