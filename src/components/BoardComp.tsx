import React, { useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';
import CellComp from './CellComp';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    curPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComp:React.FC<BoardProps> = ({board, setBoard, curPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    useEffect(() => {
        highlightAvailableCells();
    }, [selectedCell])

    function click (cell: Cell) {
        if (selectedCell
                && selectedCell !== cell
                && selectedCell.figure?.canMove(cell)) 
                    {selectedCell.moveFigure(cell);
                    swapPlayer();
                    setSelectedCell(null);
        } else {
            if(cell.figure?.color === curPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightAvailableCells() {
        board.highlightAvailableCells(selectedCell)
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h2>cur player:{curPlayer?.color}</h2>
            <div
                className='board'
            >
                {board.cells.map((row, index) => 
                    <React.Fragment
                        key={index}
                    >
                        {row.map(cell =>
                            <CellComp
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComp;