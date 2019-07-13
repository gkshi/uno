export default {
  data () {
    return {
      activeCards: []
    }
  },
  watch: {
    lastTableCard () {
      this._updateActiveCards()
    }
  },
  methods: {
    _updateActiveCards () {
      this.activeCards = this.getActiveCards(this.hand)
    },
    getActiveCards (hand) {
      const activeCards = []
      hand.forEach(card => {
        let is = false
        // Совпадение по цифре
        if (this.lastTableCard.value && this.lastTableCard.value === card.value) {
          is = true
        }
        // Совпадение по цвету
        if (this.lastTableCard.color === card.color) {
          is = true
        }
        // Черные карты
        if (card.color === 'black') {
          is = true
        }
        // Совпадение по типу (reverse, skip)
        if (this.lastTableCard.type !== 'number' && this.lastTableCard.type === card.type) {
          is = true
        }
        if (is) {
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
  moutned () {
    this._updateActiveCards()
  }
}
