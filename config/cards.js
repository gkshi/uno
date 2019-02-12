function random (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// card example
// const card = {
//   color: 'black',
//   type: 'wild_draw_four',
//   value: null
// }

const config = {
  // card colors
  colors: [
    'black',
    'red',
    'green',
    'yellow',
    'blue'
  ],

  // card types
  types: [
    'number',
    'skip',
    'reverse',
    'draw_two',
    'wild',
    'wild_draw_four'
  ],

  // cards count
  count: {
    number: {
      0: 1
    },
    wild: 4,
    wild_draw_four: 4
  },

  getRandomColor () {
    return this.colors[random(0, this.colors.length - 1)]
  }

}

export default config
