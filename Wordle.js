
// Initialization function
function get_word () {
    
    const apiUrl = "https://random-word-api.vercel.app/api?words=1&length=5"; // Replace with your API URL

    let word = null
    // Make the API call
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            word = data // Handle the response data
            console.log("API Response:", word);
        })
        .catch(error => {
            console.error("Error fetching data:", error); // Handle errors
        });

    return word
    
}

// Call the initialization function
const word = get_word()
// console.log("API Response:", word);
