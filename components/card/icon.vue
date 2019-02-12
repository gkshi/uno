<template lang="pug">
  .icon-component(:class="classList")
    iconReverse(v-if="name === 'reverse' && size !== 'small'")
    iconReverseShadow(v-if="name === 'reverse' && size === 'small'")
    iconSkip(v-if="name === 'skip' && size !== 'small'")
    iconSkipShadow(v-if="name === 'skip' && size === 'small'")
    iconDrawTwo(v-if="name === 'draw_two'")
    iconDrawFour(v-if="name === 'wild_draw_four'")
    iconWild(v-if="name === 'wild'")
</template>

<script>
import iconReverse from '@/components/icons/reverse'
import iconReverseShadow from '@/components/icons/reverse_shadow'
import iconSkip from '@/components/icons/skip'
import iconSkipShadow from '@/components/icons/skip_shadow'
import iconDrawTwo from '@/components/icons/draw_two'
import iconDrawFour from '@/components/icons/draw_four'
import iconWild from '@/components/icons/wild'

export default {
  name: 'icon-component',
  components: {
    iconReverse,
    iconReverseShadow,
    iconSkip,
    iconSkipShadow,
    iconDrawTwo,
    iconDrawFour,
    iconWild
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: 'light'
    }
  },
  computed: {
    classList () {
      return `${this.color} ${this.size} ${this.name}`
    }
  }
}
</script>

<style lang="scss">
  .icon-component {
    &.light {
      svg .fill {
        fill: $color-light;
      }
    }
    &.blue {
      svg .fill {
        fill: $color-blue;
      }
    }
    &.red {
      svg .fill {
        fill: $color-red;
      }
    }
    &.yellow {
      svg .fill {
        fill: $color-yellow;
      }
    }
    &.green {
      svg .fill {
        fill: $color-green;
      }
    }
    svg {
      display: block;
      width: 40px;
      height: 40px;
    }
    &.small {
      svg {
        width: 18px;
        height: 18px;
      }
    }
    &.draw_two {
      svg {
        width: 56px;
        height: 56px;
      }
    }
    &.wild_draw_four {
      svg {
        width: 64px;
        height: 64px;
      }
    }
    &.wild:not(.small) {
      svg {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
