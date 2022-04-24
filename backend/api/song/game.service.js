const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add
}

async function query(filterBy = {}) {
    console.log(filterBy);
    const criteria = _buildCriteria(filterBy)
    console.log(criteria);
    try {
        const collection = await dbService.getCollection('games')
        let games = await collection.find(criteria).toArray()
        return games
    } catch (err) {
        logger.error('cannot find games', err)
        throw err
    }
}

async function getById(gameId) {
    try {
        const collection = await dbService.getCollection('games')
        const game = await collection.findOne({ _id: ObjectId(gameId) })
        return game
    } catch (err) {
        logger.error(`while finding game ${gameId}`, err)
        throw err
    }
}

async function add(game) {
    try {
        const collection = await dbService.getCollection('games')
        const addedSong = await collection.insertOne(game)
        return addedSong
    } catch (err) {
        logger.error('cannot insert game', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy !== {}) {
        criteria.$or = [
            {
                player1: filterBy.player1
            },
            {
                player2: filterBy.player2
            }
        ]
    }
    return criteria
}