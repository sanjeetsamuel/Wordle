import React, { useState } from "react";
import Row from './Row';  
import "../index.css";

const Board = () => {
    const [storedGuesses, setGuesses] = useState(
        Array(6).fill().map(() => Array(5).fill(["", ""])) // 6 rows, 5 columns of empty guesses
    );
    const [activeRow, setActiveRow] = useState(0); // Active row to edit
    const targetWord = ['H', 'E', 'L', 'L', 'O']; // Target word

    // Handle letter input in a specific slot
    const handleInput = (letter, index) => {
        const newGuesses = [...storedGuesses];
        newGuesses[activeRow][index] = [letter, ""]; // Update the letter and reset status
        setGuesses(newGuesses);
    };

    // Handle submitting the current guess
    const handleSubmit = () => {
        const currentGuess = storedGuesses[activeRow].map(([letter]) => letter);
        
        // If the guess is incomplete, do nothing
        if (currentGuess.some((letter) => letter === "")) return;

        // Check the guess against the target word and update status
        const updatedStatus = currentGuess.map((letter, index) => {
            if (letter === targetWord[index]) return "correct";  
            if (targetWord.includes(letter)) return "present";  
            return "absent";  
        });

        const newGuesses = [...storedGuesses];
        newGuesses[activeRow] = newGuesses[activeRow].map((_, index) => [currentGuess[index], updatedStatus[index]]);
        setGuesses(newGuesses);

        // Move to the next row or stop if no more rows
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
                    isActive={index === activeRow}  // Ensure this is set to true for the active row
                    onInput={handleInput} 
                    onSubmit={handleSubmit} 
                />
            ))}
        </div>
    );
};

export default Board;
