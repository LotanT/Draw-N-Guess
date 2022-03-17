import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '../cmps/Canvas';
import { canvasService } from '../services/canvas.service';
import { gameService } from '../services/game.service';

export function Playing() {

  let navigate = useNavigate();
  const { rule } = useParams();
  const [canvasImg, setCanvasImg] = useState('');
  const [gameData, setGameData] = useState({});
  const [guess, setGuess] = useState('');
  const [msg, setMsg] = useState('');

  let intervalGuessId;
  let intervalGuessEndId;
  let intervalDrawId;

  useEffect(() => {
    if (rule === 'guess'){
      intervalGuessId = setInterval(getCanvasImg, 50);
      gameService.setIsGameOn(true);
      intervalGuessEndId = setInterval(isGameOn, 3000);
    } 
    else {
      gameService.setIsSessionOn(true);
      intervalDrawId = setInterval(isSessionOn, 3000);
    }
    getGameData();
    return () => {
      clearInterval(intervalGuessId);
      clearInterval(intervalDrawId);
      clearInterval(intervalGuessEndId);
    };
  }, []);

  const getCanvasImg = async () => {
    const canvasImg = await canvasService.get();
    setCanvasImg(canvasImg);
  };

  const getGameData = async () => {
    const [game] = await gameService.quary();
    setGameData(game);
    return game;
  };

  const onChange = ({ target }) => {
    setGuess(target.value);
  };

  const isSessionOn = async () => {
    const game = await getGameData();
    if (!game.isGameOn) navigate(`/`);
    if (!game.isSessionOn) {
      showMsg('Succeed!');
      clearInterval(intervalDrawId);
      setTimeout(() => navigate(`/wait`), 3000);
    }
  };

  const tryGuessing = async () => {
    const game = await getGameData();
    if (!game.isSessionOn) return;
    if (game.word.toUpperCase() === guess.toUpperCase()) {
      await gameService.setIsSessionOn(false);
      await gameService.setScore();
      showMsg('Bravo!');
      setTimeout(() => navigate(`/wait`), 3000);
    } else {
      showMsg('Nope.. Try Again');
    }
  };

  const showMsg = (txt) => {
    setMsg(txt);
    setTimeout(() => setMsg(''), 2500);
  };

  const isGameOn = async () => {
    const game = await getGameData()
    if(!game.isGameOn) navigate(`/`);
  }

  const endGame = () =>{
    gameService.setIsGameOn(false)
    navigate(`/`)
  }

  return (
    <section className="playing main-layout">
      <h1>Game On!</h1>
      <div className="data">
        <div className="poits">Score: {gameData.score}</div>
      </div>
      {rule !== 'guess' && (
        <div className="word">
          Your Word: <div className="the-word"> "{gameData.word}"</div>
        </div>
      )}
      <div>
        {rule !== 'guess' && <div>Draw here:</div>}
        <div className="display">
          {rule !== 'guess' && <Canvas />}
          {rule === 'guess' && <img src={canvasImg} />}
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
      <button className="end-btn" onClick={endGame}>End Game</button>
      <section className="msg">{msg}</section>
    </section>
  );
}
