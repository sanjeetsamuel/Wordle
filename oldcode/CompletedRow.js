import React from "react";
import Tile from "./Tile";

/**
 * Supposed to represent single row on the board
 */

const CompletedRow = ({letters}) => {
    return (
        <div>
            {letters.map((l, index) => (
                <Tile index={index} letter={l}/>
            ))}
        </div>
    );
}

export default CompletedRow;