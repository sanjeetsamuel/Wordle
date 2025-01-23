// Initialization function
function get_word () {
    
    const apiUrl = "https://random-word-api.vercel.app/api?words=1&length=5"; // Replace with your API URL

    // Make the API call
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log("API Response:", data); // Handle the response data
        })
        .catch(error => {
            console.error("Error fetching data:", error); // Handle errors
        });

    
}

// Call the initialization function
get_word()

