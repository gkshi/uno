export default {
  data () {
    return {
      activeCards: []
    }
  },
  watch: {
    activePlayer () {
      console.log('<<<< new turn', this.gameAccumulative)
    },
    lastTableCard () {
      this._updateActiveCards()
    }
  },
  methods: {
    _updateActiveCards () {
      console.log('------')
      this.activeCards = this.getActiveCards(this.hand)
    },
    _isCardFits (card) {
      console.log('card', card)
      let is = false
      if (this.gameAccumulative) {
        console.log('case 1', this.gameAccumulative)
        if (this.gameColor === card.color || card.type === 'wild_draw_four') {
          is = true
        }
        return
      }
      if (card.color === 'black') {
        console.log('case 2')
        is = true
      }
      // Совпадение по цифре
      if (this.lastTableCard.value && this.lastTableCard.value === card.value) {
        console.log('case 3')
        is = true
      }
      // Совпадение по цвету
      if (this.gameColor === card.color) {
        console.log('case 4')
        is = true
      }
      // Совпадение по типу (reverse, skip)
      if (this.lastTableCard.type !== 'number' && this.lastTableCard.type === card.type) {
        console.log('case 5')
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
