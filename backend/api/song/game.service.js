const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    query,
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