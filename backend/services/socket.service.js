const gameService = require('..//api/game/game.service')

var gIo = null

function connectSockets(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', () => {
            socket.to(socket.myTopic).emit('game-changed', null)
            gameService.remove(socket.myTopic)
        })
        socket.on('join-game', (game, topic) => {
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
            socket.to(topic).emit('two-player', game)
        })
        socket.on('update-game', (game)=>{
            socket.to(socket.myTopic).emit('game-changed', game)
        })
    })
}

module.exports = {
    connectSockets
}