<template lang="pug">
  .card-component(:class="classList" @mouseenter="enter" @mouseleave="leave")
    .card(:class="cardClass")
      .front
        .content.flex.center
          .top
            span(v-if="smallSign") {{ smallSign }}
            icon.icon(v-else :name="type" size="small")
          .middle
            .sign(v-if="sign") {{ sign }}
            icon.icon(v-else :name="type" :color="color")
          .bottom
            span(v-if="smallSign") {{ smallSign }}
            icon.icon(v-else :name="type" size="small")
      .back
        .content.flex.center
          logo.logo
</template>

<script>
import logo from '@/components/logo'
import icon from '@/components/card/icon'

export default {
  name: 'card-component',
  components: {
    logo,
    icon
  },
  props: {
    color: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'number'
    },
    value: {
      type: String,
      default: null
    },
    hidden: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    interactive: Boolean
  },
  data () {
    return {
      sign: null,
      smallSign: null,
      isHover: false
    }
  },
  computed: {
    classList () {
      let classList = `card-size-${this.size}`
      if (this.hidden) {
        classList += ' hidden'
      }
      if (this.isHover) {
        classList += ' hover'
      }
      return classList
    },
    cardClass () {
      let classList = this.color
      if (this.interactive) {
        classList += ' interactive'
      }
      return classList
    }
  },
  methods: {
    enter () {
      if (this.interactive) {
        this.isHover = true
      }
    },
    leave () {
      if (this.interactive) {
        this.isHover = false
      }
    }
  },
  created () {
    if (this.value) {
      this.sign = this.value
      this.smallSign = this.value
    } else {
      switch (this.type) {
        case 'wild_draw_four':
          this.smallSign = '+4'
          break
        case 'draw_two':
          this.smallSign = '+2'
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-component {
  perspective: 500px;
  user-select: none;
  transition: $transition-card-parent;
  .card {
    position: relative;
    width: 106px;
    height: 160px;
    transition: $transition-card;
    transform-style: preserve-3d;
    color: $color-light;
    &.blue {
      .front .content {
        background: $color-blue;
        color: $color-blue;
      }
    }
    &.red {
      .front .content {
        background: $color-red;
        color: $color-red;
      }
    }
    &.yellow {
      .front .content {
        background: $color-yellow;
        color: $color-yellow;
      }
    }
    &.green {
      .front .content {
        background: $color-green;
        color: $color-green;
      }
    }
    &:not(.black) {
      .front {
        .content {
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            background: url('/card.svg') no-repeat center;
            background-size: cover;
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    &.interactive {
      cursor: pointer;
    }
  }
  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 6px;
    border-radius: 16px;
    transform: rotateY(0deg);
    backface-visibility: hidden;
    background: $color-light;
  }
  .content {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  .front {
    font-family: $font-family-numberic;
    font-size: $font-size-number;
    line-height: $line-height-number;
    .content {
      background: $color-dark;
      & > * {
        z-index: 2;
      }
      &::before {
        content: '';
        z-index: 1;
        transform: rotate(-45deg);
        background: $color-light;
        width: 120px;
        height: 74px;
        position: absolute;
        border-radius: 100px/62px;
      }
      .sign {
        margin-top: 4px;
      }
    }
  }
  .back {
    transform: rotateY(180deg);
    .content {
      background: $color-dark;
    }
  }
  .logo {
    width: 100%;
    transform: scale(1.05);
  }
  .top,
  .bottom {
    position: absolute;
    color: $color-light;
    text-shadow: 1px 1px 0 $color-dark;
  }
  .top {
    top: 10px;
    left: 10px;
  }
  .middle {
    font-size: $font-size-number-large;
    line-height: $line-height-number-large;
  }
  .bottom {
    bottom: 10px;
    right: 10px;
    transform: rotate(180deg);
  }
  &.hidden {
    .card {
      transform: rotateY(180deg);
    }
  }
  &.card-size-small {
    transform: scale(0.62) translate(-30%, -30%);
    width: 66px;
    height: 100px;
  }

  &.hover {
    transform: translate(0, -14px);
    /*z-index: 1;*/
  }
}
</style>
