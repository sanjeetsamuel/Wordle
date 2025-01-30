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

