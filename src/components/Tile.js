import React from "react";
import './Tile.css'

/**
 * Supposed to represent a single letter inside a row
 */

const Tile = ({letter, status}) => {
    return (
        <div className={`tile ${status}`}>
            {letter}
        </div>
    );
}

export default Tile;