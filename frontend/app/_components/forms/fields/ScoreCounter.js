import React, { useState, useEffect  } from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

export default function ScoreCounter({ onScoreChange, label, reset }) {
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (reset) {
            setScore(0);
        }
    }, [reset]);

    return (
        <div className="mt-4">
            <h4 className="block text-sm font-medium leading-6 text-gray-900">{label}</h4>
            <div className="flex flex-row justify-center gap-4 w-full mt-2">
                <button onClick={() => {
                    if (onScoreChange) {
                        onScoreChange(score + 1);
                    }
                    setScore(score +1);
                }} type="button">
                    <PlusCircleIcon className=" h-8 w-8 text-green-800"/>
                </button>
                <span className=" w-20 text-6xl text-center">{score}</span>
            
                <button onClick={() => {
                    if(score > 0){
                        if (onScoreChange) {
                            onScoreChange(score - 1);
                        }
                        setScore( score -1)
                    }
                }} type="button">
                    <MinusCircleIcon className=" h-8 w-8 text-red-800"/>
                </button>
            </div>
        </div>
    );
}
