<template lang="pug">
  .player-component.flex(:class="{ inversed, 'active': isActive }")
    .info
      iconPointer.pointer
      .photo
        img(:src="data.photo")
      .label.name {{ data.name }}
    .hand
      .cards.flex(ref="hand")
        card.card(
          v-for="card in hand"
          :id="card.id"
          :hidden="true"
          size="small"
          :type="card.type"
          :color="card.color"
          :value="card.value"
          :key="card.id")
      .flex(v-if="cardsCount")
        .label.count(v-if="cardsCount > 1") {{ cardsCount }}
        .label.count.attention(v-else) UNO!
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import mixinDeck from '@/mixins/deck'
import mixinCards from '@/mixins/cards'
import card from '@/components/card'
import iconPointer from '@/components/icons/arrow-pointer'

export default {
  name: 'player-component',
  mixins: [mixinDeck, mixinCards],
  components: {
    card,
    iconPointer
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    inversed: Boolean
  },
  data () {
    return {
      timeout: null
    }
  },
  computed: {
    ...mapState({
      activePlayer: state => state.game.player,
      gameColor: state => state.game.color,
      gameAccumulative: state => state.game.accumulative,
      deckCard: state => state._gotDeckCard
    }),
    ...mapGetters({
      lastTableCard: 'lastTableCard'
    }),
    lastCard () {
      return this.data._lastCard
    },
    hand () {
      return this.data.cards
    },
    cardsCount () {
      return this.hand.length
    },
    isActive () {
      return this.activePlayer === this.data.id
    }
  },
  watch: {
    'data.cards' () {
      if (!this.data.cards.length) {
        clearTimeout(this.timeout)
      }
    },
    activePlayer () {
      if (this.isActive) {
        this.think()
      }
    },
    lastCard () {
      if (this.lastCard) {
        console.log('last card taken')
        if (this._isCardFits(this.lastCard)) {
          this.chooseActionForTakenCard()
        } else {
          console.log('next turn')
          this.$store.dispatch('nextTurn')
        }
      }
    },
    deckCard () {
      console.log('deckCard', this.deckCard)
    }
  },
  methods: {
    chooseCard () {
      // TODO: написать алгоритм выбора карты для хода
      const card = this.activeCards[0]
      return card
    },
    chooseColor () {
      const colors = ['red', 'green', 'blue', 'yellow']
      return colors[Math.floor(Math.random() * 4)]
    },
    think () {
      const timeToThink = process.env.isDev ? 500 : Math.floor(Math.random() * (3000 - 500 + 1)) + 500
      this.timeout = setTimeout(() => {
        this.makeMove()
      }, timeToThink)
    },
    makeMove () {
      if (this.activeCards.length) {
        const card = this.chooseCard()
        const options = {
          cardId: card.id,
          player: this.data.id
        }
        if (card.color === 'black') {
          options.color = this.chooseColor()
        }
        this.$store.dispatch('makeMove', options)
      } else {
        if (this.gameAccumulative) {
          this.$store.dispatch('takeAccumulativeCards', this.data.id)
        } else {
          this.$store.dispatch('takeCardFromDeck', this.data.id)
          // TODO: fix
        }
      }
    },
    chooseActionForTakenCard () {
      console.log('делаем выбор для взятой карты')
      // TODO: сделать выбор между ходом и тем, чтобы оставить карту
      // пока просто ход
      console.log('просто ход')
      this.$nextTick(() => {
        this.$store.dispatch('makeMove', {
          cardId: this.lastCard.id,
          player: this.data.id
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('setEl', {
      player: this.data.id,
      el: this.$refs.hand
    })
  },
  updated () {
    this.fitDeck(this.$refs.hand)
  }
}
</script>

<style lang="scss">
  .player-component {
    .pointer {
      .fill {
        fill: $color-focus;
      }
    }
  }
</style>

<style lang="scss" scoped>
  $margin: 10px;
  .player-component {
    .info {
      position: relative;
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
      transition: $transition-default;
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
      overflow: hidden;
      .card {
        margin-right: 6px;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .label.attention {
      font-size: $font-size-small;
      font-weight: $font-weight-bold;
    }

    .pointer {
      display: none;
      position: absolute;
      top: -10px;
      left: 50%;
      z-index: 10;
      transform: translate(-50%, -100%);
    }

    &.inversed {
      flex-direction: row-reverse;
      .info {
        margin-right: 0;
        margin-left: 10px;
      }
      .hand {
        justify-content: flex-end;
        .flex {
          justify-content: inherit;
        }
      }
    }

    &.active {
      .pointer {
        display: block;
        animation: updown 1s ease infinite;
      }
      .photo {
        border-color: $color-focus;
        // box-shadow: 0 0 40px 0 #FFFFFF;
      }
      .label.name {
        background: $color-focus;
      }
    }

    @keyframes updown {
      from {
        transform: translate(-50%, -100%);
      }
      50% {
        transform: translate(-50%, -140%);
      }
      to {
        transform: translate(-50%, -100%);
      }
    }
  }
</style>
