import { setInterval } from 'core-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playerService } from '../services/players.service';

export function Wait() {

  let navigate = useNavigate();
  let rule
  let intervalId

  useEffect(() => {
    getRule();
    intervalId = setInterval(checkIfTwoPlayers,500)
    return ()=>{
        clearInterval(intervalId)
    }
  }, []);

  const checkIfTwoPlayers = async () => {
    let player = await playerService.quary();
    player = player[0].guess
    if (player){
        playerService.resetPlayers()
        navigate(`/choosing`);
    } 
  };

  const goBack = () =>{
    playerService.resetPlayers()
    navigate(`/`);
  }

  const getRule = async () => {
    rule = await playerService.getPlayerRule();
    if (rule === 'guess') navigate(`/playing/guess`);
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
