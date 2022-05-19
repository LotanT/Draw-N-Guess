
import { httpService } from './http.service.js';

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
    player1: '',
    player2: '',
    drawing: [],
  };
}

async function getGame(user) {
  const games = await httpService.get('game');
  let game = games.filter((game) => !game.player1 || !game.player2)[0];
  if (!game) {
    game = openNewGame();
    game.player1 = user._id;
    return await httpService.post('game',game);
  } else {
    if (!game.player1){
      game.player1 = user._id;
    } else{
      game.player2 = user._id;
    } 
    game.isGameOn = true;
    return await httpService.put(`game/${game._id}`,game);
  }
}

async function getGameById(id) {
  return await httpService.get(`game/${id}`);
}

async function updateGame(game) {
  return await httpService.put(`game/${game._id}`,game);
}

async function removeGame(id) {
  return await httpService.delete(`game/${id}`);
}
