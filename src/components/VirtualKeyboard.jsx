import React from "react";
import "../index.css";

const VirtualKeyboard = ({ guessedLetters, isGameOver }) => {
  const keyboardLayout = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    "ZXCVBNM".split(""),
  ];

  const getKeyStatus = (letter) => {
    switch (guessedLetters[letter]) {
      case "correct":
        return "correct";
      case "present":
        return "present";
      case "absent":
        return "absent";
      default:
        return "";
    }
  };
  
  return (
        <div className="keyboard-container">
        {keyboardLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="keyboard-row">
                {row.map((letter) => (
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
