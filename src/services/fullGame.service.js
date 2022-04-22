'use strict';

import { DbService } from './db-service.js';
import { socketService, SOCKET_EVENT_GAME_CHANGE } from './socket.service';

const KEY = 'D&G';

export const gamesService = {
  getGame,
  getGameById,
  updateGame,
  removeGame,
};

function openNewGame() {
  return {
    isGameOn: false,
    isSessionOn: false,
    currentWord: null,
    currentWordPoints: 0,
    score: 0,
    player1: null,
    player2: null,
    drawing: [],
  };
}

async function getGame(user) {
  const games = await DbService.query(KEY);
  let game = games.filter((game) => !game.player1 || !game.player2)[0];
  if (!game) {
    game = openNewGame();
    game.player1 = user._id;
    return await DbService.post(KEY, game);
  } else {
    if (!game.player1) game.player1 = user._id;
    else game.player2 = user._id;
    game.isGameOn = true;
    return await DbService.put(KEY, game);
  }
}

async function getGameById(id) {
  return await DbService.get(KEY, id);
}

async function updateGame(game) {
  return await DbService.put(KEY, game);
}

async function removeGame(id) {
  return await DbService.delete(KEY, id);
}

(async () => {
  window.addEventListener('storage', async () => {
    console.log('Storage updated');
    socketService.emit(SOCKET_EVENT_GAME_CHANGE);
  });
})();
