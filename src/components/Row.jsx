import React, { useState, useEffect } from "react";
import Tile from './Tile';
import '../index.css';


const Row = ({ guess, targetWord, isActive, onInput, onSubmit }) => {
    const [currentGuess, setCurrentGuess] = useState(guess);
    const handleKeyDown = (event) => {
        if (!isActive) return; 
        const { key } = event;

        if (key === "Backspace") {
            setCurrentGuess((prevGuess) => {
                const newGuess = [...prevGuess];
                const firstEmptyIndex = newGuess.findIndex(([letter]) => letter === "");
                if (firstEmptyIndex !== -1) {
                    newGuess[firstEmptyIndex - 1] = ["", ""]; 
                }
                return newGuess;
            });
        } else if (key.length === 1 && key.match(/[a-zA-Z]/)) {
            const firstEmptyIndex = currentGuess.findIndex(([letter]) => letter === "");
            if (firstEmptyIndex !== -1) {
                onInput(key.toUpperCase(), firstEmptyIndex);
            }
        } else if (key === "Enter") {
            onSubmit(); 
        }
    };

    useEffect(() => {
        if (isActive) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isActive, currentGuess]); 

    return (
        <div className="row">
            {currentGuess.map(([letter], index) => {
                let status = ""; 

                if (!isActive) {  
                    if (letter === targetWord[index]) {
                        status = "correct";  
                    } else if (targetWord.includes(letter)) {
                        status = "present";  
                    } else {
                        status = "absent";   // Letter not in the word
                    }
                }

                return <Tile key={index} letter={letter} status={status} />;
            })}

        </div>
    );
    
};

export default Row;
