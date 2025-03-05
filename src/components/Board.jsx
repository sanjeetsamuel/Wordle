import React, { useState } from "react";
import Row from "./Row";
import VirtualKeyboard from "./VirtualKeyboard";
import "../index.css";

const Board = ({ targetWord }) => {
  const [storedGuesses, setGuesses] = useState(
    Array(6).fill().map(() => Array(5).fill(["", ""]))
  );
  const [activeRow, setActiveRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState({});

  const checkWordValidity = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      return response.ok;
    } catch (error) {
      console.error("Error checking word:", error);
      return false;
    }
  };

  const handleInput = (letter, index) => {
    const newGuesses = [...storedGuesses];
    newGuesses[activeRow][index] = [letter, ""];
    setGuesses(newGuesses);
  };

  const handleSubmit = async () => {
    if (targetWord.length === 0) {
      console.log("Target word is not ready yet.");
      return;
    }

    const currentGuess = storedGuesses[activeRow].map(([letter]) => letter);
    if (currentGuess.some((letter) => letter === "")) return; // Prevent empty guesses

    const word = currentGuess.join('');
    const valid = await checkWordValidity(word);
    if (!valid) return;

    const updatedStatus = currentGuess.map((letter, index) => {
      if (letter === targetWord[index]) return "correct";
      if (targetWord.includes(letter)) return "present";
      return "absent";
    });

    const newGuesses = [...storedGuesses];
    newGuesses[activeRow] = newGuesses[activeRow].map((_, index) => [currentGuess[index], updatedStatus[index]]);
    setGuesses(newGuesses);

    const newGuessedLetters = { ...guessedLetters };
    currentGuess.forEach((letter, index) => {
      if (updatedStatus[index]) {
        newGuessedLetters[letter] = updatedStatus[index];
      }
    });
    setGuessedLetters(newGuessedLetters);

    // Check if the guess matches the target word
    if (currentGuess.join('') === targetWord.join('')) {
      setIsGameOver(true);
    } else if (activeRow === 5) {
      setIsGameOver(true);
    } else {
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
          isGameOver={isGameOver}
        />
      ))}

      <VirtualKeyboard
        guessedLetters={guessedLetters}
        onClick={handleInput}
        isGameOver={isGameOver}
      />
    </div>
  );
};

export default Board;
