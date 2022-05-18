import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '../cmps/Canvas';
import { gamesService } from '../services/fullGame.service';

import { socketService, SOCKET_EVENT_GAME_CHANGE, SOCKET_EMIT_CHANGE_GMAE } from '../services/socket.service';

import { userService } from '../services/user.service';
import { ShowDrawing } from '../cmps/ShowDrawing';

export function Playing() {
  let navigate = useNavigate();
  const { rule } = useParams();
  const [gameData, setGameData] = useState({});
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    initPlay()
    socketService.on(SOCKET_EVENT_GAME_CHANGE, (game) => {
      isGameOn(game)
      setGameData(game)
    });
    return () => {
      socketService.off(SOCKET_EVENT_GAME_CHANGE)
    }
  }, []);

  const initPlay = async () => {
    let currUser = await userService.getLoggedinUser();
    let currGame = await gamesService.getGameById(currUser.game);
    setUser(currUser);
    setGameData(currGame);
    if (!currGame?.isGameOn) navigate(`/`)
  }

  const updateGame = async (gameToUpdate) => {
    const updatedGame = await gamesService.updateGame(gameToUpdate);
    socketService.emit(SOCKET_EMIT_CHANGE_GMAE, gameToUpdate)
    setGameData(updatedGame);
  };

  const onChange = ({ target }) => {
    setGuess(target.value);
  };

  const tryGuessing = async () => {
    if (!gameData.isSessionOn) return;
    if (gameData.currentWord.toUpperCase() === guess.toUpperCase()) {
      gameData.isSessionOn = false;
      gameData.score += gameData.currentWordPoints;
      gameData.currentWordPoints = 0;
      gameData.drawing = [];
      updateGame(gameData);
      showMsg('Bravo!');
      setTimeout(() => navigate(`/choosing`), 3000);
    } else {
      showMsg('Nope.. Try Again');
    }
  };

  const showMsg = (txt) => {
    setMsg(txt);
    setTimeout(() => setMsg(''), 2500);
  };

  const isGameOn = (game) => {
    if (!game?.isGameOn) navigate(`/`);
    if (!game.isSessionOn) {
      showMsg('Succeed')
      setTimeout(() => {
        navigate(`/choosing`);
        navigate(`/playing/guess`);
      }, 3000)
    }
  };

  const endGame = async () => {
    socketService.emit(SOCKET_EMIT_CHANGE_GMAE, null)
    await gamesService.removeGame(gameData._id);
    navigate(`/`);
  };

  if (!gameData) return <h1>loading...</h1>;
  return (
    <section className="playing main-layout">
      <h1>Game On!</h1>
      <div className="data">
        <div className="poits">Score: {gameData.score}</div>
      </div>
      {rule !== 'guess' && (
        <div className="word">
          Your Word: <div className="the-word"> "{gameData.currentWord}"</div>
        </div>
      )}
      <div>
        {rule !== 'guess' && <div>Draw here:</div>}
        <div className="display">
          {rule !== 'guess' && (
            <Canvas game={gameData} updateGame={updateGame} />
          )}
          {rule === 'guess' && <ShowDrawing drawing={gameData.drawing} />}
        </div>
      </div>
      {rule === 'guess' && (
        <div className="guessing">
          <input
            type="text"
            onChange={onChange}
            value={guess}
            placeholder="Enter Your Guess"
          />
          <button className="guess-btn main-btn" onClick={tryGuessing}>
            Guess
          </button>
        </div>
      )}
      <button className="end-btn" onClick={endGame}>
        End Game
      </button>
      <section className="msg">{msg}</section>
    </section>
  );
}
