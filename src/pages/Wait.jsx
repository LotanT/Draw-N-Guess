import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import { gamesService } from '../services/fullGame.service';
import {socketService, SOCKET_EVENT_GAME_CHANGE} from '../services/socket.service';

export function Wait() {
  let navigate = useNavigate();

  let user;
  let game;

  useEffect(async () => {
    user = await userService.getLoggedinUser();
    if (!user) user = await userService.setUser();
    game = await gamesService.getGame(user);
    socketService.on(SOCKET_EVENT_GAME_CHANGE, checkIfTwoPlayers);
    user.game = game._id;
    await userService.updatUser(user);
    checkIfTwoPlayers();
    return () => {
      socketService.off(SOCKET_EVENT_GAME_CHANGE, checkIfTwoPlayers);
    };
  }, []);

  const checkIfTwoPlayers = async () => {
    let updateGame = await gamesService.getGameById(game._id);
    if (updateGame.player1 && updateGame.player2) {
      if (updateGame.player1 === user._id) navigate(`/choosing`);
      else navigate(`/playing/guess`);
    }
  };

  const goBack = () => {
    gamesService.removeGame(game._id)
    navigate(`/`);
  };

  return (
    <section className="wait main-layout">
      <div className="header">Waiting for another Player...</div>
      <button onClick={goBack} className="main-btn">
        Go Back
      </button>
    </section>
  );
}
