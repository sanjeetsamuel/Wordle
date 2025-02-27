import React, { useState } from "react";
import Row from './Row';  
import VirtualKeyboard from './VirtualKeyboard';  // Import the virtual keyboard
import "../index.css";

const Board = () => {
    const [storedGuesses, setGuesses] = useState(
        Array(6).fill().map(() => Array(5).fill(["", ""])) 
    );
    const [activeRow, setActiveRow] = useState(0); 
    const targetWord = ['H', 'E', 'L', 'L', 'O']; 
    const [isGameOver, setIsGameOver] = useState(false); // Track if the game is over
    const [guessedLetters, setGuessedLetters] = useState({}); // Track the status of guessed letters

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

        // Update the guessedLetters state
        const newGuessedLetters = { ...guessedLetters };
        currentGuess.forEach((letter, index) => {
            if (updatedStatus[index]) {
                newGuessedLetters[letter] = updatedStatus[index];
            }
        });
        setGuessedLetters(newGuessedLetters);

        // Check if the current guess is correct
        if (currentGuess.join('') === targetWord.join('')) {
            setIsGameOver(true); // End the game if the word is guessed correctly
        } else if (activeRow === 5) {
            setIsGameOver(true); // Game over after 6 attempts
        } else {
            setActiveRow(activeRow + 1); // Move to the next row if not correct
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
                    isGameOver={isGameOver}  // Pass the game-over flag to Row
                />
            ))}
            <VirtualKeyboard 
                guessedLetters={guessedLetters} // Pass guessed letters state
                onClick={handleInput} 
                isGameOver={isGameOver} 
            /> {/* Add the virtual keyboard */}
        </div>
    );
};

export default Board;
