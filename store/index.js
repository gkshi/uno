import game from '@/config/game'
import logs from '@/constants/logs'

const playersMap = new Map([
  ['bot1'],
  ['bot2'],
  ['user'],
  ['bot3']
])

function _getNextUser (player, direction) {
  // TODO: проверять направление
  console.log('direction', direction)
  if (!player) {
    return 'user'
  }
  let hasFound = false
  let needUser = null
  // let previous = null
  let i = 1
  for (let key of playersMap.keys()) {
    if (hasFound && !needUser) {
      needUser = key
    } else if (key === player) {
      hasFound = true
      if (i === playersMap.size) {
        needUser = playersMap.keys().next().value
      }
    }
    i++
  }
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
    color: null, // current game color
    direction: 'clockwise', // clockwise, counterclockwise
    status: 'not_ready', // not_ready, ready, in_progress, finished
    player: null // active player at the moment
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
                type,
                _position: null
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

  dealIntoTable ({ commit, dispatch, state }) {
    const card = state.deck[state.deck.length - 1]
    commit('TABLE_ADD', card)
    commit('DECK_POP')

    // TODO: update game color here
    // TODO: check game direction here
    dispatch('analyzeLastTableCard')
  },

  analyzeLastTableCard ({ state, commit }) {
    const card = state.table[state.table.length - 1]
    commit('GAME_UPDATE', {
      key: 'color',
      value: card.color
    })
    if (card.type === 'reverse') {
      commit('GAME_UPDATE', {
        key: 'direction',
        value: state.game.direction === 'clockwise' ? 'counterclockwise' : 'clockwise'
      })
    }
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
      key: 'player',
      value: _getNextUser(state.game.player, state.game.direction)
    })
  },

  takeCardFromDeck ({ commit, state, getters }, playerId) {
    commit('PLAYER_UPDATE', {
      player: playerId,
      key: 'cards',
      value: [ ...state.players[playerId].cards, getters.lastDeckCard ]
    })
    commit('DECK_POP')
    commit('GAME_UPDATE', {
      key: 'player',
      value: _getNextUser(state.game.player, state.game.direction)
    })
  },

  /**
   * Make move
   * @param payload { cardId, player }
   */
  makeMove ({ commit, dispatch, state }, payload) {
    const card = state.players[payload.player].cards.find(i => i.id === payload.cardId)

    // add card on the table
    commit('CARD_UPDATE', card)
    commit('TABLE_ADD', card)

    // TODO: update game color here
    // TODO: check game direction here
    dispatch('analyzeLastTableCard')

    // update player hand
    commit('PLAYER_UPDATE', {
      player: payload.player,
      key: 'cards',
      value: state.players[payload.player].cards.filter(i => i.id !== payload.cardId)
    })

    // check game status (has won?)
    if (!state.players[payload.player].cards.length) {
      // change game status
      commit('GAME_UPDATE', {
        key: 'status',
        value: 'finished'
      })
    } else {
      // change turn
      commit('GAME_UPDATE', {
        key: 'player',
        value: _getNextUser(state.game.player, state.game.direction)
      })
    }
  }

}

export const mutations = {
  CARD_UPDATE (state, card) {
    card._position = {
      top: `${Math.floor(Math.random() * (30 - 15 + 1)) + 15}%`,
      left: `${Math.floor(Math.random() * (50 - 30 + 1)) + 30}%`,
      angle: `${Math.floor(Math.random() * (60 + 60 + 1)) - 60}deg`
    }
  },
  DECK_POP (state) {
    state.deck.pop()
  },
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
  }
}

export const getters = {
  cardsInDeck: state => {
    return state.deck.length
  },
  player: state => id => {
    return state.players[id]
  },
  user: state => {
    return state.players.user
  },
  lastDeckCard: state => {
    return state.deck[state.deck.length - 1]
  },
  lastTableCard: state => {
    return state.table[state.table.length - 1]
  }
}
