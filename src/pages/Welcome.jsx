import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gameService } from '../services/game.service';

export function Welcome() {
  
  useEffect(() => {
    gameService.reset();
  }, []);

  return (
    <section className="welcome main-layout">
      <div className="header">Welcome to Draw and Guess</div>
      <Link to="/wait" className="main-btn play">
        Start to Play!
      </Link>
    </section>
  );
}
