import { useNavigate } from 'react-router-dom';
import { gameService } from '../services/game.service';
let randomWords = require('random-words');

export function ChooseWord() {
  const word = randomWords({
    exactly: 3,
    wordsPerString: 1,
    formatter: (word, index) => {
      return index === 0
        ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
        : word;
    },
  });
  
  let navigate = useNavigate();

  const setWord = async (word, points) => {
    await gameService.setWord(word, points);
    navigate(`/playing/draw`);
  };

  return (
    <section className="choose-word main-layout">
      <div className="header">Choose one Word</div>
      <div className="words">
        <button onClick={() => setWord(word[0], 1)} className="main-btn">
          <p>Easy: (1 point)</p>
          {word[0]}
        </button>
        <button onClick={() => setWord(word[1], 3)} className="main-btn">
          <p>Medium: (3 points)</p> {word[1]}
        </button>
        <button onClick={() => setWord(word[2], 5)} className="main-btn">
          <p>Hard: (5 points)</p>
          {word[2]}
        </button>
      </div>
    </section>
  );
}
