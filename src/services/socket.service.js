import io from 'socket.io-client'

export const SOCKET_EMIT_USER_WATCH = 'room';
export const SOCKET_EVENT_USER_UPDATED = 'user-left';
export const SOCKET_EVENT_REVIEW_ADDED = '-added';
export const SOCKET_EVENT_REVIEW_ABOUT_YOU = 'review-about-you';


export const SOCKET_EVENT_GAME_CHANGE = 'game-change';


const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
// export const socketService = createSocketService()
export const socketService = createDummySocketService()

window.socketService = socketService

// var socketIsReady = false;
// socketService.setup()


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
    emit(eventName, data) {
      socket.emit(eventName, data)
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


// Basic Tests
function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)


socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
  console.log('Review about me!', review);
})
