import React from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell
}

const CellComp:React.FC<CellProps> = ({cell}) => {
    return (
        <div
            className={['cell', cell.color].join(' ')}
        >
            {cell.figure?.logo 
                && 
                <img
                    src={cell.figure.logo}
                />
            }
        </div>
    )
}

export default CellComp;