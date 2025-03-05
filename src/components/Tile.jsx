import React from "react";
import '../index.css';

const Tile = ({ letter, status }) => {
    return (
        <div className={`tile ${status}`}>
            {letter ? letter : ""}
        </div>
    );
};

export default Tile;
