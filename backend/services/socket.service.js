const logger = require('./logger.service');

var gIo = null

function connectSockets(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('join game', topic => {
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
    })
}



function emitTo({ type, data, label }) {
    if (label) gIo.to(label).emit(type, data)
    else gIo.emit(type, data)
}

module.exports = {
    connectSockets,
    emitTo
}