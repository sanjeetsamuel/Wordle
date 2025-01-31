import React from "react";
import WordleRow from "./WordleRow";
/**
 * Takes in an input
 */

const WordleBoard = () => {

    const sampleWord = "TOMIN";

    return (
        <div>
            <WordleRow letters = {sampleWord.split("")}/>
        </div>
    );
}

export default WordleBoard;