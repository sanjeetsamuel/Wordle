import React from "react";
import Tile from "./Tile";  // Tile component to display each letter

const InputRow = ({ letters, rowIndex, handleGuessChange, handleSubmitGuess, completed, getTileStatus, targetWord }) => {

  // Handle change in each letter input
  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase(); // Convert to uppercase
    if (/^[A-Z]$/.test(value) || value === "") {  // Only allow letters (or empty string)
      const updatedLetters = [...letters];
      updatedLetters[index] = value;
      handleGuessChange(updatedLetters, rowIndex);  // Pass the updated letters back to the parent
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {letters.map((letter, index) => (
        <Tile
          key={index}
          letter={letter}
          status={completed ? getTileStatus(letter, targetWord) : ""}  // Use the prop to determine status
        />
      ))}
      {!completed && (
        <button onClick={() => handleSubmitGuess(rowIndex)}>Submit</button>  // Submit button to submit the guess
      )}
    </div>
  );
};

export default InputRow;
