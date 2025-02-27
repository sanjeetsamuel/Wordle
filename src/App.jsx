import React, { useState, useEffect } from "react";
import Board from "./components/Board";

const App = () => {
  const [targetWord, setTargetWord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch random word when App is mounted
  const getRandomWord = async () => {
    try {
      const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=5`);
      console.log(response)
      const data = await response.text();
      const word = data.toUpperCase().slice(2, -2).split('');
      setTargetWord(word);
      setIsLoading(false);
      console.log(word)
    } catch (error) {
      console.error("Error fetching random word:", error);
    }
  };

  useEffect(() => {
    getRandomWord(); 
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Board targetWord={targetWord} />
      )}
    </div>
  );
};

export default App;
