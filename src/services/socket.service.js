import io from 'socket.io-client'

export const SOCKET_EVENT_GAME_CHANGE = 'game-changed';
export const SOCKET_EMIT_CHANGE_GMAE = 'update-game'
export const SOCKET_EVENT_TWO_PLAYERS = 'two-player';
export const SOCKET_EMIT_JOIN_GAME = 'join-game'
export const SOCKET_EVENT_GET_DRAWING = 'get-drawing';
export const SOCKET_EMIT_DRAWING = 'drawing'

const baseUrl = (process.env.NODE_ENV === 'production')? '' : 'http://localhost:3030'
export const socketService = createSocketService()

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
