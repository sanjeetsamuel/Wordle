import React, { useState } from "react";
import Row from './Row';  
import "../index.css"

const Board = () => {
    const [storedGuesses, setGuesses] = useState(
        Array(6).fill().map(() => Array(5).fill(["", ""])) 
    );
    const [activeRow, setActiveRow] = useState(0); 
    const targetWord = ['H', 'E', 'L', 'L', 'O']; 

    const handleInput = (letter, index) => {
        const newGuesses = [...storedGuesses];
        newGuesses[activeRow][index] = [letter, ""]; 
        setGuesses(newGuesses); 
    };

    const handleSubmit = () => {
        const currentGuess = storedGuesses[activeRow].map(([letter]) => letter);
        
        if (currentGuess.some((letter) => letter === "")) return;

        const updatedStatus = currentGuess.map((letter, index) => {
            if (letter === targetWord[index]) return "correct";  
            if (targetWord.includes(letter)) return "present";  
            return "absent";  
        });

        const newGuesses = [...storedGuesses];
        newGuesses[activeRow] = newGuesses[activeRow].map((_, index) => [currentGuess[index], updatedStatus[index]]);
        setGuesses(newGuesses); 

        if (activeRow < 5) {
            setActiveRow(activeRow + 1); 
        }
    };

    return (
        <div>
            {storedGuesses.map((guess, index) => (
                <Row 
                    key={index} 
                    guess={guess} 
                    targetWord={targetWord} 
                    isActive={index === activeRow} 
                    onInput={handleInput} 
                    onSubmit={handleSubmit} 
                />
            ))}
        </div>
    );
};

export default Board;
