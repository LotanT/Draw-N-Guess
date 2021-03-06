const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
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
        const addedGame = await collection.insertOne(game)
        return addedGame
    } catch (err) {
        logger.error('cannot insert game', err)
        throw err
    }
}

async function update(game) {
    try {
        const prevId = game._id
        const id = ObjectId(game._id)
        delete game._id
        const collection = await dbService.getCollection('games')
        await collection.findOneAndUpdate({ _id: id}, { $set: { ...game } })
        game._id = prevId
        return game;
    } catch (err) {
        logger.error(`cannot update game ${game._id}`, err)
        throw err
    }
}

async function remove(gameId) {
    try {
        const collection = await dbService.getCollection('games')
        await collection.deleteOne({ _id: ObjectId(gameId) })
    } catch (err) {
        logger.error(`cannot remove game ${gameId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.player1 || filterBy.player2) {
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