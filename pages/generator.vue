<template lang="pug">
  .gen
    div
      nuxt-link(to="/") back
      | &nbsp;
      a(href="#" @click.prevent="createDeck") create
      | &nbsp;
      a(href="#" @click.prevent="shuffleDeck") shuffle
    .cards.flex
      card(
        v-for="card in stack"
        :color="card.color"
        :type="card.type"
        :value="card.value"
        size="small"
        :key="card.id")
</template>

<script>
import cards from '@/config/cards'
import card from '@/components/card'

export default {
  name: 'gen',
  components: {
    card
  },
  data () {
    return {
      stack: [],
      total: 0
    }
  },
  methods: {
    shuffleDeck () {
      let array = JSON.parse(JSON.stringify(this.stack))
      let currentIndex = array.length
      let temporaryValue
      let randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      this.stack = array
    },
    createDeck () {
      let generated = []
      Object.keys(cards).forEach(color => {
        console.log(color, cards[color])
        Object.keys(cards[color]).forEach(type => {
          if (type === 'number') {
            for (let i = 0; i <= 9; i++) {
              let number = cards[color][type][i] || cards[color][type].default
              for (let j = 1; j <= number; j++) {
                let card = {
                  id: this.total,
                  color,
                  type,
                  value: i.toString()
                }
                generated.push(card)
                this.total++
              }
            }
          } else {
            let number = cards[color][type]
            for (let i = 1; i <= number; i++) {
              let card = {
                id: this.total,
                color,
                type
              }
              generated.push(card)
              this.total++
            }
          }
        })
      })
      // this.stack = this.shuffle(generated)
      this.stack = generated
    }
  }
  // mounted () {
  //   this.createDeck()
  //   this.shuffleDeck()
  // }
}
</script>

<style lang="scss" scoped>
  .gen {
    padding: 40px;
    .cards {
      margin-top: 40px;
      flex-wrap: wrap;
    }
  }
</style>
