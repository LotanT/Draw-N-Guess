import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';
import { gamesService } from '../services/fullGame.service';
import {socketService, SOCKET_EMIT_JOIN_GAME, SOCKET_EVENT_TWO_PLAYERS} from '../services/socket.service';

export function Wait() {
  let navigate = useNavigate();

  let user;
  let game;

  useEffect(() => {
    init()
    return () => {
      socketService.off(SOCKET_EVENT_TWO_PLAYERS)
    }
  }, []);

  const init = async () => {
    user = await userService.getLoggedinUser();
    if (!user) user = await userService.setUser();
    game = await gamesService.getGame(user);
    user.game = game._id;
    socketService.emit(SOCKET_EMIT_JOIN_GAME, game, game._id);
    socketService.on(SOCKET_EVENT_TWO_PLAYERS, game =>{
      checkIfTwoPlayers(game)
    })
    await userService.updatUser(user);
    checkIfTwoPlayers(game);
  }

  const checkIfTwoPlayers = (updateGame) => {
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
