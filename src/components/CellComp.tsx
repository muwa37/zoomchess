import React from 'react';
import { Cell } from '../models/Cell';

interface CellPorps {
    cell: Cell
}

const CellComp:React.FC<CellPorps> = ({cell}) => {
    return (
        <div
            className={['cell', cell.color].join(' ')}
        >
            {cell.figure}
        </div>
    )
}

export default CellComp;