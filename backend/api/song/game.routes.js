const express = require('express')
const router = express.Router()
const {getGames, getGame, addGame, updateGame} = require('./game.controller')

router.get('/', getGames)
router.get('/:id', getGame)
router.post('/', addGame)
router.put('/:id', updateGame)

module.exports = router