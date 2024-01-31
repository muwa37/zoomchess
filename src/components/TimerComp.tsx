import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerCompProps {
    curPlayer: Player | null;
    restart: () => void;
}

const TimerComp:React.FC<TimerCompProps> = ({curPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer();
    }, [curPlayer])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current)
        }
        const cb = curPlayer?.color === Colors.WHITE 
            ? decrementWhite
            : decrementBlack;
        timer.current = setInterval(cb, 1000)
    }

    function decrementBlack() {
        setBlackTime(prev => prev - 1)
    }
    function decrementWhite() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = ():void => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return(
        <div>
            <div>
                <button
                    onClick={handleRestart}
                >
                    restart
                </button>
            </div>
            <h2>
                black time - {blackTime}
            </h2>
            <h2>
                black time - {whiteTime}
            </h2>
        </div>
    )
}

export default TimerComp;