# Wordle Clone in React - Step-by-Step Guide

## 📌 Overview of the Wordle Clone Structure
The game is broken down into **logical components**, each handling a specific part of the game. Here’s how they work together:

---

## 1️⃣ `App.js` (Main Game Logic)
- This is the **main component** that manages the **game state**.
- It **stores**:
  - The **secret word** (randomly selected at the start).
  - A list of **guesses** (previous words entered by the player).
  - The **current guess** (the word the player is typing).
  - The **game status** (playing, won, or lost).
- It **listens** for keyboard input:
  - Updates the current guess as the player types.
  - Submits a word when Enter is pressed.
  - Deletes a letter when Backspace is pressed.
- It **checks** if the player has won or lost after each guess.
- It **renders** the `WordleBoard` component, passing in all the game data.

---

## 2️⃣ `WordleBoard.js` (The Board)
- This component is responsible for **displaying the game board**.
- It receives:
  - The list of **guesses** (words the player has submitted).
  - The **current guess** (so it appears in the active row).
  - The **secret word** (to help check correctness).
- It **creates a grid of rows**, showing past guesses and empty spaces for remaining attempts.
- It passes each row's data to the `WordleRow` component.

---

## 3️⃣ `WordleRow.js` (A Single Row of Tiles)
- This component **represents a single row** in the game board.
- It receives:
  - The **word** for this row (either a past guess, the current guess, or empty).
  - The **secret word** (to determine if letters are correct or misplaced).
- It **checks** each letter in the word:
  - ✅ **Green** if it’s in the correct position.
  - 🟡 **Yellow** if it’s in the word but in the wrong position.
  - ❌ **Gray** if it’s not in the word at all.
- It renders a series of `Tile` components, passing in the letter and color information.

---

## 4️⃣ `Tile.js` (A Single Letter Box)
- This component **represents a single letter in a row**.
- It receives:
  - The **letter** to display.
  - A flag indicating if the letter is **correct (green)**, **misplaced (yellow)**, or **wrong (gray)**.
- It applies **different colors** based on correctness.
- It ensures all letters are **uppercase** for consistency.

---

## 5️⃣ `wordUtils.js` (Game Logic Utilities)
- This **separates logic from the components**, keeping the code clean.
- It includes:
  - A **list of possible words**.
  - A function to **pick a random word** at the start.
  - A function to **check a guess against the secret word**, returning correctness data.

---

## 🛠 How Everything Connects
1. `App.js` **manages the game** (word selection, input handling, checking win/loss).
2. It sends **game data** to `WordleBoard.js`.
3. `WordleBoard.js` **creates a grid of rows**, passing each row’s data to `WordleRow.js`.
4. `WordleRow.js` **splits the word into individual letters**, sending them to `Tile.js`.
5. `Tile.js` **colors each letter** based on correctness.
6. `wordUtils.js` **handles word logic** (selecting words, checking correctness).  

---

## 🎯 Suggested Order to Build It Yourself
### **Step 1: Build `Tile.js`**  
- Create a simple **box that displays a letter**.  
- Make sure it can change color based on props.  

### **Step 2: Build `WordleRow.js`**  
- Pass a **word** into this component.  
- It should **split the word into letters** and display a `Tile` for each one.  

### **Step 3: Build `WordleBoard.js`**  
- Pass multiple words into this component.  
- It should **create multiple `WordleRow`s** for the previous guesses.  

### **Step 4: Build `App.js`**  
- Store **game state** (secret word, guesses, current guess).  
- Listen for **keyboard input** and update state.  
- Check for **win/loss conditions**.  

### **Step 5: Add `wordUtils.js`**  
- Create a **list of words**.  
- Write functions to **select a word** and **check a guess**.  

---

## 🚀 Next Steps
Once you've built the basic game, consider adding:
- A **restart button** to play again.
- A **virtual keyboard** for mobile support.
- **Animations** to make it smoother.

---

🔥 **Ready to build it? Let me know if you need help along the way!** 🚀

