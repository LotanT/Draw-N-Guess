const express = require('express')
const router = express.Router()
const {getGames, getGame, addGame} = require('./game.controller')

router.get('/', getGames)
router.get('/:id', getGame)
router.post('/', addGame)

module.exports = router