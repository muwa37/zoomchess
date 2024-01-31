import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComp from './components/BoardComp';
import TimerComp from './components/TimerComp';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [curPlayer, setCurPlayer] = useState<Player | null>(null);
  
  useEffect(() => {
    restart()
    setCurPlayer(whitePlayer);
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    setCurPlayer(curPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <TimerComp
        restart={restart}
        curPlayer={curPlayer}
      />
      <BoardComp 
        board={board}
        setBoard={setBoard}
        curPlayer={curPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title='black loses:'
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title='white loses:'
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
