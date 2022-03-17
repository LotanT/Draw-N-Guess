'use strict';

import { DbService } from './db-service.js';

const KEY = 'game';

export const gameService = {
    quary,
    setWord,
    setScore,
    setIsGameOn,
    setIsSessionOn,
    reset
};

setGame()

async function setGame(){
    let game = await DbService.query(KEY)
    if(game.length === 0){
        game = [{isGameOn: false, isSessionOn: false, word: null, score: 0, wordPoints: 0}]
        DbService.insert(KEY,game)
    }
}

async function quary(){
    return await DbService.query(KEY)
}

async function setWord(word,points) {
    let game = await DbService.query(KEY);
    game[0].word = word;
    game[0].wordPoints = points;
    await DbService.put(KEY,game[0])
}

async function setScore() {
    let game = await DbService.query(KEY);
    game[0].score = game[0].score + game[0].wordPoints;
    await DbService.put(KEY,game[0])
}

async function setIsGameOn(isGameOn) {
    let game = await DbService.query(KEY);
    game[0].isGameOn = isGameOn
    await DbService.put(KEY,game[0])
}

async function setIsSessionOn(isSessionOn) {
    let game = await DbService.query(KEY);
    game[0].isSessionOn = isSessionOn
    await DbService.put(KEY,game[0])
}

async function reset() {
    let players = await DbService.query(KEY);
    players[0].isGameOn = false
    players[0].isSessionOn = false
    players[0].word = null
    players[0].score = 0
    players[0].wordPoints = 0
    await DbService.put(KEY,players[0])
}
