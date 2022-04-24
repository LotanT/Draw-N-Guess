const express = require('express')
const router = express.Router()
const {getGames, getGame, addGame, updateGame, deleteGame} = require('./game.controller')

router.get('/', getGames)
router.get('/:id', getGame)
router.post('/', addGame)
router.put('/:id', updateGame)
router.delete('/:id', deleteGame)

module.exports = router