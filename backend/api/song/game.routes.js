const express = require('express')
const router = express.Router()
const {getGames} = require('./game.controller')

router.get('/', getGames)

module.exports = router