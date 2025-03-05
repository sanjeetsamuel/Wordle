import React, { useState } from "react";
import InputRow from "./InputRow";  // Make sure you've got InputRow component

const WordleBoard = () => {
  const [guesses, setGuesses] = useState([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]); // Store guesses for all rows
  const [completedRows, setCompletedRows] = useState([false, false, false, false, false, false]); // To track if a row is completed
  const [currentRow, setCurrentRow] = useState(0); // Track the current row the player is inputting into
  const targetWord = "TOMIN";  // Set the target word to be guessed (static for now)

  // Handle the guess change (updating letters)
  const handleGuessChange = (newGuess, rowIndex) => {
    const updatedGuesses = [...guesses]; // Copy current guesses
    updatedGuesses[rowIndex] = newGuess; // Update the current row
    setGuesses(updatedGuesses); // Update the guesses state
  };

  // Handle submitting the guess (validate and provide feedback)
  const handleSubmitGuess = (index) => {
    const currentGuess = guesses[index].join(""); // Join letters to form the guess word

    if (isValidWord(currentGuess)) {
      const feedback = getFeedback(currentGuess, targetWord); // Get feedback for the guess
      const updatedGuesses = [...guesses];
      updatedGuesses[index] = feedback;  // Update guesses with feedback
      setGuesses(updatedGuesses);

      const updatedCompletedRows = [...completedRows];
      updatedCompletedRows[index] = true; // Mark this row as completed
      setCompletedRows(updatedCompletedRows);

      if (index < 5) {
        setCurrentRow(index + 1);  // Move to the next row
      } else {
        alert("Game Over!");  // Game over if all rows are used
      }
    } else {
      alert("Invalid word. Please try again.");
    }
  };

  // Function to check if the word is valid (length check here, could be expanded later)
  const isValidWord = (word) => {
    return word.length === 5;  // Only accept 5-letter words
  };

  // Function to get the status of each letter (green, yellow, gray)
  const getTileStatus = (letter, targetWord) => {
    if (targetWord === undefined) return '';  // If no target word, return empty

    if (letter === targetWord[letter]) {
      return 'green';  // Correct letter in the correct position
    } else if (targetWord.includes(letter)) {
      return 'yellow';  // Correct letter, wrong position
    } else {
      return 'gray';  // Letter not in the word
    }
  };

  // Function to get feedback for the entire guess (green, yellow, gray for each letter)
  const getFeedback = (currentGuess, targetWord) => {
    let targetCopy = targetWord.split("");  // Make a copy of the target word
    let feedback = [];  // Array to store the feedback for each letter

    // First pass: Check for correct letters in the correct position
    for (let i = 0; i < currentGuess.length; i++) {
      if (currentGuess[i] === targetWord[i]) {
        feedback.push('green');
        targetCopy[i] = null;  // Remove matched letter from targetCopy
      } else {
        feedback.push(null);  // Placeholder for further checking
      }
    }

    // Second pass: Check for letters in the wrong position but still present
    for (let i = 0; i < currentGuess.length; i++) {
      if (feedback[i] === null && targetCopy.includes(currentGuess[i])) {
        feedback[i] = 'yellow';  // Present but in the wrong position
        targetCopy[targetCopy.indexOf(currentGuess[i])] = null;  // Remove letter from targetCopy
      }
    }

    // Third pass: All remaining letters are incorrect, so they are marked 'gray'
    for (let i = 0; i < feedback.length; i++) {
      if (feedback[i] === null) {
        feedback[i] = 'gray';
      }
    }

    return feedback;
  };

  return (
    <div>
      {guesses.map((guess, index) => (
        <InputRow
          key={index}
          rowIndex={index}
          letters={guess}
          handleGuessChange={handleGuessChange}
          handleSubmitGuess={handleSubmitGuess}
          completed={completedRows[index]}
          getTileStatus={getTileStatus}  // Pass the function down as a prop
          targetWord={targetWord}  // Pass the target word down as a prop
        />
      ))}
    </div>
  );
};

export default WordleBoard;
