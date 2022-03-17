'use strict';

import { DbService } from './db-service.js';

const KEY = 'players';

export const playerService = {
    getPlayerRule,
    resetPlayers,
    quary,
};

setPlayer()

async function setPlayer(){
    let players = await DbService.query(KEY)
    if(players.length === 0){
        players = [{draw: null, guess: null}]
        DbService.insert(KEY,players)
    }
}

async function quary(){
    return await DbService.query(KEY)
}

async function getPlayerRule() {
    let players = await DbService.query(KEY);
    if (!players[0].draw) {
        players[0].draw = 'player1'
        await DbService.put(KEY,players[0])
        return 'draw'
    } else if (!players[0].guess) {
        players[0].guess = 'player2'
        await DbService.put(KEY,players[0])
        return 'guess'
    }
    return null
}

async function resetPlayers() {
    let players = await DbService.query(KEY);
    players[0].draw = null
    players[0].guess = null
    await DbService.put(KEY,players[0])
}
