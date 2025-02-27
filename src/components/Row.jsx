import React, { useEffect } from "react";
import Tile from './Tile';
import '../index.css';

const Row = ({ guess, isActive, onInput, onSubmit, isGameOver }) => {
    const handleKeyDown = (event) => {
        if (!isActive || isGameOver) return; 

        const { key } = event;
        if (key === "Backspace") {
            const index = guess.findLastIndex(([letter]) => letter !== "");
            if (index !== -1) {
                console.log("Clearing slot at index:", index);
                onInput("", index); 
            }
        } 
        else if (key.length === 1 && key.match(/[a-zA-Z]/)) {
            const index = guess.findIndex(([letter]) => letter === "");
            if (index !== -1) {
                onInput(key.toUpperCase(), index); 
            }
        } 
        else if (key === "Enter") {
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
