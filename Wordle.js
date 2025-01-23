async function get_word() {
    const apiUrl = "https://random-word-api.vercel.app/api?words=1&length=5"; // API URL

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

// Main function to save the word as a variable
async function main() {
    const word = await get_word(); // Wait for get_word() to resolve
    console.log("Random Word:", word); // Use the word
    // Now you can use the variable 'word' as needed
    
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', (input) => {
        if (input === word) {
            console.log('U got it!');
            rl.close(); // Exit the prompt
        } if (condition) {
            
        } else {
            console.log(`Nope`);
            for (let i = 0; i < word.length; i++) {
                if(input[i] == word[i])
                    console.log("Letter at this position is corect: " ,i);
            }
        }
    });
}

main(); // Call the main function


