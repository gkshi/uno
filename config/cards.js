// function random (min, max) {
//   return Math.floor(Math.random() * (max - min) + min)
// }

// card example
// const card = {
//   color: 'black',
//   type: 'wild_draw_four',
//   value: null
// }

// total 108

const cards = {
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

export default cards

// const config = {
//   // card colors
//   colors: [
//     'black',
//     'red',
//     'green',
//     'yellow',
//     'blue'
//   ],
//
//   // card types
//   types: [
//     'number',
//     'skip',
//     'reverse',
//     'draw_two',
//     'wild',
//     'wild_draw_four'
//   ],
//
//   // cards count
//   count: {
//     number: {
//       0: 1,
//       1: 2,
//       2: 2,
//       3: 2,
//       4: 2,
//       5: 2,
//       6: 2,
//       7: 2,
//       8: 2,
//       9: 2
//     },
//     wild: 4,
//     wild_draw_four: 4,
//     total: 108
//   },
//
//   getRandomColor () {
//     return this.colors[random(0, this.colors.length - 1)]
//   }
//
// }
//
// export default config
