import game from '@/config/game'
import logs from '@/constants/logs'

export const state = () => ({
  players: {
    bot1: {
      id: 'bot1',
      type: 'bot',
      name: 'Jack',
      photo: '/users/jack.png',
      cards: [],
      el: null
    },
    bot2: {
      id: 'bot2',
      type: 'bot',
      name: 'Sasha',
      photo: '/users/sasha.png',
      cards: [],
      el: null
    },
    user: {
      id: 'user',
      type: 'user',
      cards: [],
      el: null
    },
    bot3: {
      id: 'bot3',
      type: 'bot',
      name: 'Mary',
      photo: '/users/mary.png',
      cards: [],
      el: null
    }
  },
  game: {
    status: 'ready',
    player: null,
    turn: 0
  },
  deck: [],
  logs: []
})

export const actions = {

  createDeck ({ commit, dispatch }) {
    commit('LOG_CLEAR')
    return new Promise((resolve, reject) => {
      let generated = []
      let total = 0
      Object.keys(game.cards).forEach(color => {
        Object.keys(game.cards[color]).forEach(type => {
          if (type === 'number') {
            for (let i = 0; i <= 9; i++) {
              let number = game.cards[color][type][i] || game.cards[color][type].default
              for (let j = 1; j <= number; j++) {
                let card = {
                  id: total,
                  color,
                  type,
                  value: i.toString()
                }
                generated.push(card)
                total++
              }
            }
          } else {
            let number = game.cards[color][type]
            for (let i = 1; i <= number; i++) {
              let card = {
                id: total,
                color,
                type
              }
              generated.push(card)
              total++
            }
          }
        })
      })
      commit('DECK_UPDATE', generated)
      setTimeout(() => {
        resolve()
      }, 0)
    }).then(() => {
      dispatch('shuffleDeck')
    }).then(() => {
      commit('LOG_ADD', {
        id: Math.random().toFixed(6).toString().replace(/\./, ''),
        text: logs.initDeck
      })
    })
  },

  shuffleDeck ({ commit, state }) {
    return new Promise((resolve, reject) => {
      let shuffled = JSON.parse(JSON.stringify(state.deck))
      let currentIndex = shuffled.length
      let temporaryValue
      let randomIndex
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = shuffled[currentIndex]
        shuffled[currentIndex] = shuffled[randomIndex]
        shuffled[randomIndex] = temporaryValue
      }
      commit('DECK_UPDATE', shuffled)
      setTimeout(() => {
        resolve()
      }, 0)
    })
  },

  dealCard ({ commit, getters }, playerId) {
    commit('DEAL', getters.player(playerId))
  },

  setEl ({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      commit('PLAYER_SET_EL', payload)
      setTimeout(() => {
        resolve()
      }, 0)
    })
  },

  log ({ commit }, message) {
    commit('LOG_ADD', {
      id: Math.random().toFixed(6).toString().replace(/\./, ''),
      text: message
    })
  }

}

export const mutations = {
  DECK_UPDATE (state, cards) {
    state.deck = cards
  },
  DEAL (state, player) {
    const card = state.deck[state.deck.length - 1]
    player.cards.push(card)
    state.deck.pop()
  },

  PLAYER_SET_EL (state, payload) {
    state.players[payload.player].el = payload.el
  },

  LOG_ADD (state, log) {
    if (state.logs.length > 9) {
      state.logs.splice(0, 1)
    }
    state.logs.push(log)
  },
  LOG_CLEAR (state) {
    state.logs = []
  }
}

export const getters = {
  cardsInDeck: state => {
    return state.deck.length
  },
  player: state => id => {
    return state.players[id]
    // return state.players.find(player => player.id === id)
  },
  user: (state) => {
    return state.players.user
    // return getters.player('user')
  }
}
