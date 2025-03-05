import React from "react";
import './Tile.css';  // Assuming you have styles for the tiles

const Tile = ({ letter, status }) => {
  return (
    <div className={`tile ${status}`}>
      {letter}
    </div>
  );
};

export default Tile;
