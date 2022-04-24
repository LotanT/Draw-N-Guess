const express = require('express')
const router = express.Router()
const {getGames, getGame} = require('./game.controller')

router.get('/', getGames)
router.get('/:id', getGame)

module.exports = router