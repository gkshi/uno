<template lang="pug">
  .player-component.flex(:class="{ inversed }")
    .info
      .photo(:class="{ 'active': isActive }")
        img(:src="data.photo")
      .label.name {{ data.name }}
    .hand
      .cards.flex(ref="hand")
        card.card(
          v-for="card in hand"
          :hidden="false"
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

export default {
  name: 'player-component',
  mixins: [mixinDeck, mixinCards],
  components: {
    card
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
      gameAccumulative: state => state.game.accumulative
    }),
    ...mapGetters({
      lastTableCard: 'lastTableCard'
    }),
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
    activePlayer () {
      if (this.isActive) {
        this.think()
      }
    }
  },
  methods: {
    chooseCard () {
      // TODO: write
      const card = this.activeCards[0]
      console.log(this.data.id, 'choose card', card)
      return card
    },
    think () {
      const timeToThink = process.env.isDev ? '800' : Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000
      this.timeout = setTimeout(() => {
        this.makeMove()
      }, timeToThink)
    },
    makeMove () {
      if (this.activeCards.length) {
        this.$store.dispatch('makeMove', {
          cardId: this.chooseCard().id,
          player: this.data.id
        })
      } else {
        if (this.gameAccumulative) {
          this.$store.dispatch('takeAccumulativeCards', this.data.id)
        } else {
          this.$store.dispatch('takeCardFromDeck', this.data.id)
        }
      }
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
      &.active {
        box-shadow: 0 0 40px 0 #FFFFFF;
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
  }
</style>
