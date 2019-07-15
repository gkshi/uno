import game from '@/config/game'
import logs from '@/constants/logs'

const playersMap = new Map([
  ['bot1'],
  ['bot2'],
  ['user'],
  ['bot3']
])

function _getNextUser (player, direction) {
  const randomIndex = Math.floor(Math.random() * playersMap.size) + 1
  let previousPlayer = null
  let needPlayer = null
  let hasFound = false
  let i = 1
  for (let key of playersMap.keys()) {
    // get first random player
    if (!player && i === randomIndex) {
      // TODO: user's turn at first
      needPlayer = 'user' // key
      break
    }
    if (hasFound) {
      needPlayer = key
      break
    }
    // clockwise direction search
    if (key === player && direction === 'clockwise') {
      hasFound = true
    }
    if (key === player && direction === 'counterclockwise') {
      needPlayer = previousPlayer
      // get the last one player
      if (!previousPlayer) {
        let j = 1
        for (let key of playersMap.keys()) {
          if (j === playersMap.size) {
            needPlayer = key
            break
          }
          j++
        }
      }
      break
    }
    if (i >= playersMap.size) {
      needPlayer = playersMap.keys().next().value
      break
    }
    previousPlayer = key
    i++
  }
  return needPlayer
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
    accumulative: null, // null or sum of "plus" cards
    status: 'not_ready', // not_ready, ready, in_progress, finished
    player: null // active player at the moment
  },
  deck: [],
  table: [],
  logs: [],
  modal: null,
  _colorPickerCard: null
})

export const actions = {

  restart ({ commit, dispatch }) {
    dispatch('updateGameStatus', 'not_ready')
    commit('LOG_CLEAR')
    commit('RESTART')
    return dispatch('createDeck')
  },

  createDeck ({ commit, dispatch }) {
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

  dealIntoTable ({ commit, state }) {
    let i = 1
    let card = state.deck[state.deck.length - i]
    // excluding black cards as first table card
    while (card.color === 'black') {
      i++
      card = state.deck[state.deck.length - i]
    }

    commit('TABLE_ADD', card)
    commit('DECK_POP')
    commit('GAME_UPDATE', {
      key: 'color',
      value: card.color
    })
  },

  analyzeLastTableCard ({ state, commit }, color) {
    const card = state.table[state.table.length - 1]
    commit('GAME_UPDATE', {
      key: 'color',
      value: color || card.color
    })
    if (card.type === 'reverse') {
      commit('GAME_UPDATE', {
        key: 'direction',
        value: state.game.direction === 'clockwise' ? 'counterclockwise' : 'clockwise'
      })
    }
    if (card.type === 'wild_draw_four' || card.type === 'draw_two') {
      let count = state.game.accumulative ? state.game.accumulative : 0
      count += card.type === 'wild_draw_four' ? 4 : 2
      commit('GAME_UPDATE', {
        key: 'accumulative',
        value: count
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

  _takeCardFromDeck ({ commit, state, getters }, playerId) {
    commit('PLAYER_UPDATE', {
      player: playerId,
      key: 'cards',
      value: [ ...state.players[playerId].cards, getters.lastDeckCard ]
    })
    commit('DECK_POP')
  },

  takeCardFromDeck ({ dispatch, commit, state }, playerId) {
    // TODO: сделать проверку на черные карты.
    // Давать юзеру ходить любой картой в первый ход
    dispatch('_takeCardFromDeck', playerId)
    commit('GAME_UPDATE', {
      key: 'player',
      value: _getNextUser(state.game.player, state.game.direction)
    })
  },

  takeAccumulativeCards ({ commit, dispatch, state }, playerId) {
    for (let i = 0; i < state.game.accumulative; i++) {
      dispatch('_takeCardFromDeck', playerId)
    }
    commit('GAME_UPDATE', {
      key: 'accumulative',
      value: null
    })
    commit('GAME_UPDATE', {
      key: 'player',
      value: _getNextUser(state.game.player, state.game.direction)
    })
  },

  /**
   * Make move
   * @param payload { cardId, player, color }
   */
  _makeMove ({ commit, dispatch, state }, payload) {
    const card = state.players[payload.player].cards.find(i => i.id === payload.cardId)

    // remove temporary color picker card
    commit('COLORPICKER_CARD_UPDATE', null)

    // add card on the table
    commit('CARD_UPDATE', card)
    commit('TABLE_ADD', card)

    // TODO: update game color here
    // TODO: check game direction here
    dispatch('analyzeLastTableCard', payload.color)

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
      dispatch('openModal', 'finish')
    } else {
      // change turn
      let nextUser = _getNextUser(state.game.player, state.game.direction)
      if (card.type === 'skip') {
        nextUser = _getNextUser(state.game.player, state.game.direction)
      }
      commit('GAME_UPDATE', {
        key: 'player',
        value: nextUser
      })
    }
  },

  makeMove ({ commit, dispatch, state }, payload) {
    const card = state.players[payload.player].cards.find(i => i.id === payload.cardId)
    if (card.color === 'black' && !payload.color) {
      dispatch('openModal', 'color_picker')
      commit('COLORPICKER_CARD_UPDATE', card.id)
    } else {
      dispatch('_makeMove', payload)
    }
  },

  openModal ({ commit }, modalId) {
    commit('MODAL_UPDATE', modalId)
  },
  closeModal ({ commit }) {
    commit('MODAL_UPDATE', null)
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
    state.game.direction = 'clockwise'
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

  MODAL_UPDATE (state, id) {
    state.modal = id
  },

  COLORPICKER_CARD_UPDATE (state, card) {
    state._colorPickerCard = card
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
