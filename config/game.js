// card example
// const card = {
//   color: 'black',
//   type: 'wild_draw_four',
//   value: null
// }

// total 108

const game = {
  black: {
    wild: 4,
    wild_draw_four: 4
  },
  red: {
    number: {
      '0': 1,
      default: 2
    },
    skip: 2,
    reverse: 2,
    draw_two: 2
  },
  yellow: {
    number: {
      '0': 1,
      default: 2
    },
    skip: 2,
    reverse: 2,
    draw_two: 2
  },
  green: {
    number: {
      '0': 1,
      default: 2
    },
    skip: 2,
    reverse: 2,
    draw_two: 2
  },
  blue: {
    number: {
      '0': 1,
      default: 2
    },
    skip: 2,
    reverse: 2,
    draw_two: 2
  }
}

const config = {
  cards: game
}

export default config
