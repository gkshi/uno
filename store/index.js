import game from '@/config/game'
import logs from '@/constants/logs'

const playersMap = new Map([
  ['bot1'],
  ['bot2'],
  ['user'],
  ['bot3']
])

function _getNextUser (player) {
  if (!player) {
    return 'user'
  }
  let hasFound = false
  let needUser = null
  playersMap.forEach((val, key) => {
    if (hasFound) {
      needUser = key
      return
    }
    if (key === player) {
      hasFound = true
    }
  })
  return needUser
}

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
    direction: 'clockwise', // clockwise, counterclockwise
    status: 'not_ready', // not_ready, ready, in_progress, finished
    player: null,
    turn: 0
  },
  deck: [],
  table: [],
  logs: []
})

export const actions = {

  restart ({ commit, dispatch }) {
    dispatch('updateGameStatus', 'not_ready')
    commit('RESTART')
    return dispatch('createDeck')
  },

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
                  value: i.toString(),
                  _position: null
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
        text: logs.init_deck
      })
      dispatch('updateGameStatus', 'ready')
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
  },

  updateGameStatus ({ commit }, status) {
    commit('GAME_UPDATE', {
      key: 'status',
      value: status
    })
  },

  nextTurn ({ commit, state }) {
    commit('GAME_UPDATE', {
      key: 'turn',
      value: state.game.turn + 1
    })
    commit('GAME_UPDATE', {
      key: 'player',
      value: _getNextUser(state.game.player)
    })
  },

  makeMove ({ commit, state }, payload) {
    console.log('make Move', payload.cardId, payload.player)

    const card = state.players[payload.player].cards.find(i => i.id === payload.cardId)
    commit('TABLE_ADD', card)

    commit('PLAYER_UPDATE', {
      player: payload.player,
      key: 'cards',
      value: state.players[payload.player].cards.filter(i => i.id !== payload.cardId)
    })
    console.log('state.game.player', state.game.player)
    commit('GAME_UPDATE', {
      key: 'player',
      value: _getNextUser(state.game.player)
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

  RESTART (state) {
    state.deck = []
    state.table = []
    state.game.status = 'not_ready'
    state.game.player = null
    state.game.turn = 0
    Object.keys(state.players).forEach(key => {
      state.players[key].cards = []
    })
  },

  PLAYER_SET_EL (state, payload) {
    state.players[payload.player].el = payload.el
  },

  PLAYER_UPDATE (state, payload) {
    state.players[payload.player][payload.key] = payload.value
  },

  LOG_ADD (state, log) {
    if (state.logs.length > 9) {
      state.logs.splice(0, 1)
    }
    state.logs.push(log)
  },
  LOG_CLEAR (state) {
    state.logs = []
  },

  GAME_UPDATE (state, payload) {
    state.game[payload.key] = payload.value
  },

  TABLE_ADD (state, card) {
    state.table.push(card)
  },
  TABLE_UPDATE (state, table) {
    state.table = table
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
