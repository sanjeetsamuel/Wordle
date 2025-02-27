import React from "react";
import "../index.css";

const VirtualKeyboard = ({ guessedLetters, isGameOver }) => {
  // Define the rows of letters as they appear on a QWERTY keyboard
  const keyboardLayout = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];

  // Function to get the status of each letter based on the guessed letters
  const getKeyStatus = (letter) => {
    console.log(`Key: ${letter}, Status: ${guessedLetters[letter]}`);
    switch (guessedLetters[letter]) {
      case "correct":
        return "correct";
      case "present":
        return "present";
      case "absent":
        return "absent";
      default:
        return ""; // Return empty string if no status is assigned yet
    }
  };
  
  

  return (
        <div className="keyboard-container">
        {keyboardLayout.map(row => (
            <div className="keyboard-row">
            {row.map(letter => (
                <button
                key={letter}
                className={`key ${getKeyStatus(letter)}`}
                disabled={isGameOver}
                >
                {letter}
                </button>
            ))}
            </div>
        ))}
        </div>
  );
};

export default VirtualKeyboard;
