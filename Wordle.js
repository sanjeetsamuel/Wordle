async function get_word() {
    const apiUrl = "https://random-word-api.vercel.app/api?words=1&length=5";

    try {
        const response = await fetch(apiUrl); // Wait for the API response
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        return data[0]; // Return the first word from the response array
    } catch (error) {
        console.error("Error fetching data:", error.message); // Handle errors
    }
}


async function check_word(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl); // Wait for the API response
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            if (errorData.title === "No Definitions Found") {
                return false; // Word is invalid
            } else {
                throw new Error(`Unexpected API response: ${errorData.message}`);
            }
        }

        // If response is OK, the word is valid
        return true;
    } catch (error) {
        console.error("Error checking word:", error.message); // Handle unexpected errors
        return false; // Treat the word as invalid in case of an error
    }
}


async function wordle(word){
    console.log("Real Word:", word); // Use the word
    // Now you can use the variable 'word' as needed

    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (input) => {
        if (input.length != 5){
            console.log('Please enter a 5 letter word');

        } else if (input === word || input === "exits") {
            console.log('U got it!');
            rl.close(); // Exit the prompt
            
        } else {
            console.log(`Nope`);
            
            const check = await check_word(input);
            if (!check) {
                console.log("Invalid word");
            } else {
                for (let i = 0; i < word.length; i++) {
                    if(word.includes(input[i]) && input[i] != word[i])
                        console.log("Letter is in the word: " ,input[i]);
                }
    
                for (let i = 0; i < word.length; i++) {
                    if(input[i] == word[i])
                        console.log("Letter at this position is corect: " ,i);
                }
            }

        }
    });
}

// Main function to save the word as a variable
async function main() {

    console.log("Welcome to Wordle!");
    console.log("Enter a 5 letter word: ");
    const word = await get_word(); // Wait for get_word() to resolve
    wordle(word);
}


main(); // Call the main function


