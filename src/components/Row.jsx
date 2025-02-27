import React, { useEffect } from "react";
import Tile from './Tile';
import '../index.css';

const Row = ({ guess, isActive, onInput, onSubmit }) => {
    const handleKeyDown = (event) => {
        if (!isActive) return; 
        const { key } = event;

        console.log(`Key pressed: ${key}`);

        if (key === "Backspace") {
            console.log("Backspace key detected");
            
            const index = guess.findLastIndex(([letter]) => letter !== "");
            if (index !== -1) {  // If there's any filled slot
                console.log("Clearing slot at index:", index);
                onInput("", index); // Clear the last filled slot
            }
        } 
        else if (key.length === 1 && key.match(/[a-zA-Z]/)) {
            const index = guess.findIndex(([letter]) => letter === ""); 
            if (index !== -1) {
                console.log("Typing letter:", key.toUpperCase(), "at index:", index);
                onInput(key.toUpperCase(), index); 
            }
        } 
        else if (key === "Enter") {
            console.log("Enter key detected, submitting guess.");
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
    }, [isActive, guess]);

    return (
        <div className="row">
            {guess.map(([letter, status], index) => (
                <Tile key={index} letter={letter} status={status} />
            ))}
        </div>
    );
};

export default Row;
