export default {
  methods: {
    fitDeck (hand) {
      if (!hand) {
        return
      }
      this.$nextTick(() => {
        const offset = 6
        const margin = 10
        const handWidth = hand.offsetWidth
        const cardWidth = hand.children.length ? hand.children[0].offsetWidth : 0

        if (getComputedStyle(hand).getPropertyValue('position') !== 'absolute') {
          hand.style.position = 'relative'
        }

        // if fit don't need
        if ((cardWidth * hand.children.length) + (margin * hand.children.length - 1) < handWidth) {
          hand.style.minHeight = ''
          for (let i = 0; i < hand.children.length; i++) {
            hand.children[i].style.position = ''
            hand.children[i].style.left = ''
          }
          return
        }

        hand.style.minHeight = `${hand.children[0].offsetHeight}px`
        let step = (handWidth - cardWidth) / (hand.children.length - 1)
        for (let i = 0; i < hand.children.length; i++) {
          let card = hand.children[i]
          card.style.position = 'absolute'
          if (step < offset) {
            if ((offset * i) >= (handWidth - card.offsetWidth)) {
              card.style.left = `${handWidth - card.offsetWidth}px`
            } else {
              card.style.left = `${offset * i}px`
            }
          } else {
            card.style.left = `${step * i}px`
          }
        }
      })
    }
  }
}
