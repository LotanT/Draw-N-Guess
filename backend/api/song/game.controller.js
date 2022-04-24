const songService = require('./game.service.js');
const logger = require('../../services/logger.service')

module.exports = {
    getGames,
}

async function getGames(req, res) {
    try {
        const games = await gameService.query(req.query)
        res.send(games)
    } catch (err) {
        logger.error('Cannot get games', err)
        res.status(500).send({ err: 'Failed to get games' })
    }
}