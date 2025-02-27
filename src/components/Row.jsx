import React, { useEffect } from "react";
import Tile from './Tile';
import '../index.css';

const Row = ({ guess, isActive, onInput, onSubmit, isGameOver }) => {
    const handleKeyDown = (event) => {
        if (!isActive || isGameOver) return; // Stop input if the game is over

        const { key } = event;

        console.log(`Key pressed: ${key}`); // Log key for debugging

        // Handle Backspace key
        if (key === "Backspace") {
            console.log("Backspace key detected");
            const index = guess.findLastIndex(([letter]) => letter !== "");
            if (index !== -1) {
                console.log("Clearing slot at index:", index);
                onInput("", index); // Clear the last filled slot
            }
        } 
        // Handle letter input (A-Z)
        else if (key.length === 1 && key.match(/[a-zA-Z]/)) {
            const index = guess.findIndex(([letter]) => letter === ""); // Find first empty slot
            if (index !== -1) {
                console.log("Typing letter:", key.toUpperCase(), "at index:", index);
                onInput(key.toUpperCase(), index); // Input the letter in the first available slot
            }
        } 
        // Handle Enter key (Submit guess)
        else if (key === "Enter") {
            console.log("Enter key detected, submitting guess.");
            onSubmit(); // Submit the guess
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
