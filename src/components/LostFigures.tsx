import React from 'react'
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures:React.FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div 
            className='lost'
        >
            <h2>{title}</h2>
            {figures.map(figure => 
                <div 
                    key={figure.id}
                >
                    {figure.logo 
                        && <img
                            src={figure.logo}
                            alt={figure.name}
                        />
                    }
                </div>    
            )}
        </div>
    )
}

export default LostFigures;