<template lang="pug">
  .player-component.flex
    .info
      .photo(:class="{ 'active': isActive }")
        img(:src="data.photo")
      .label.name {{ data.name }}
    .hand
      .cards.flex(ref="hand")
        card.card(
          v-for="card in data.cards"
          :hidden="false"
          size="small"
          :type="card.type"
          :color="card.color"
          :value="card.value"
          :key="card.id")
      .flex(v-if="cardsCount")
        .label.count(v-if="cardsCount > 1") {{ cardsCount }}
        .label.count(v-else) UNO!
</template>

<script>
import { mapState } from 'vuex'
import mixinDeck from '@/mixins/deck'
import card from '@/components/card'

export default {
  name: 'player-component',
  mixins: [mixinDeck],
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
      timeout: null
    }
  },
  computed: {
    ...mapState({
      activePlayer: state => state.game.player
    }),
    cardsCount () {
      return this.data.cards.length
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
      const card = this.data.cards[0]
      console.log('choose card', card)
      return card
    },
    think () {
      const timeToThink = process.env.isDev ? '500' : Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000
      this.timeout = setTimeout(() => {
        this.makeMove()
      }, timeToThink)
    },
    makeMove () {
      console.log('make move', this.data.id)
      this.$store.dispatch('makeMove', {
        cardId: this.chooseCard().id,
        player: this.data.id
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
  }
</style>
