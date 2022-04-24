const gameService = require('./game.service.js');
const logger = require('../../services/logger.service')

module.exports = {
    getGames,
    getGame,
    addGame
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

async function getGame(req, res) {
    try {
        const game = await gameService.getById(req.params.id)
        res.send(game)
    } catch (err) {
        logger.error('Failed to get game', err)
        res.status(500).send({ err: 'Failed to get game' })
    }
}

async function addGame(req, res) {
    try {
      let game = req.body;
      await gameService.add(game)
      res.json(game)
    } catch (err) {
      logger.error('Failed to add game', err)
      res.status(500).send({ err: 'Failed to add game' })
    }
  }