import io from 'socket.io-client'

export const SOCKET_EVENT_GAME_CHANGE = 'game-change';
export const SOCKET_EVENT_TWO_PLAYERS = 'two-player';
export const SOCKET_EMIT_JOIN_GAME = 'join-game'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : 'http://localhost:3030'
export const socketService = createSocketService()
// export const socketService = createDummySocketService()

// window.socketService = socketService

// var socketIsReady = false;
socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    setup() { 
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb=null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data, topic = null) {
      socket.emit(eventName, data, topic)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}

// eslint-disable-next-line
function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    listenersMap,
    setup() {
      listenersMap = {}
    },
    terminate() {
      this.setup()
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      if (!listenersMap[eventName]) return
      if (!cb) delete listenersMap[eventName]
      else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return
      listenersMap[eventName].forEach(listener => {
        listener(data)
      })
    }
  }
  window.listenersMap = listenersMap;
  return socketService
}