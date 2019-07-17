export default {
  data () {
    return {
      activeCards: []
    }
  },
  watch: {
    hand () {
      if (this.isActive) {
        this._updateActiveCards()
      }
    },
    isActive () {
      if (this.isActive) {
        this._updateActiveCards()
      }
    },
    lastTableCard () {
      this._updateActiveCards()
    },
    activeCards () {
      this.$store.dispatch('updateUserActiveCard', this.activeCards.length)
    }
  },
  methods: {
    _updateActiveCards () {
      this.activeCards = this.getActiveCards(this.hand)
    },
    _isCardFits (card) {
      let is = false
      if (this.gameAccumulative) {
        // +2 on +2
        if (this.lastTableCard.type === 'draw_two' && this.lastTableCard.type === card.type) {
          is = true
        }
        // +2 on +4
        if (this.lastTableCard.type === 'wild_draw_four' && card.type === 'draw_two' && this.gameColor === card.color) {
          is = true
        }
        // +4 on anything
        if (card.type === 'wild_draw_four') {
          is = true
        }
        return is
      }
      if (card.color === 'black') {
        is = true
      }
      // Совпадение по цифре
      if (this.lastTableCard.value && this.lastTableCard.value === card.value) {
        is = true
      }
      // Совпадение по цвету
      if (this.gameColor === card.color) {
        is = true
      }
      // Совпадение по типу (reverse, skip)
      if (this.lastTableCard.type !== 'number' && this.lastTableCard.type === card.type) {
        is = true
      }
      return is
    },
    getActiveCards (hand) {
      const activeCards = []
      hand.forEach(card => {
        if (this._isCardFits(card)) {
          activeCards.push(card)
        }
      })
      return activeCards
    },
    isCardActive (card, activeCards) {
      let is = false
      activeCards.forEach(i => {
        if (i.id === card.id) {
          is = true
        }
      })
      return is
    }
  },
  mounted () {
    this._updateActiveCards()
  }
}
