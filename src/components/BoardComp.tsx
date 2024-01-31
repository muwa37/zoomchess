import React, { useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComp from './CellComp';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
}

const BoardComp:React.FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    
    useEffect(() => {
        highlightAvailableCells();
    }, [selectedCell])

    function click (cell: Cell) {
        if (selectedCell
                && selectedCell !== cell
                && selectedCell.figure?.canMove(cell)) 
                    {selectedCell.moveFigure(cell);
                    setSelectedCell(null);
        } else {
            setSelectedCell(cell);
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
    )
}

export default BoardComp;