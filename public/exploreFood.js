let currentPage = 0; // Variable to keep track of the current page
const itemsPerPage = 10; // Number of items to display per page
let foodList = []; // Initialize an empty food list array

document.addEventListener('DOMContentLoaded', () => {
    initFoodList(); // Initialize the food list when the DOM is fully loaded

    // Event listener for the "Next" button
    document.getElementById('next-button').addEventListener('click', () => {
        // Check if there are more items to display
        if ((currentPage + 1) * itemsPerPage < Object.keys(foodList).length) {
            currentPage++; // Increment the current page
            displayPage(currentPage); // Display the next page
        }
    });

    // Event listener for the "Prev" button
    document.getElementById('prev-button').addEventListener('click', () => {
        // Check if the current page is not the first page
        if (currentPage > 0) {
            currentPage--; // Decrement the current page
            displayPage(currentPage); // Display the previous page
        }
    });
});

// Function to initialize the food list
function initFoodList() {
    const foodListScript = document.getElementById('foodListData');
    if (foodListScript) {
        foodList = JSON.parse(foodListScript.textContent); // Parse the JSON content
        displayPage(currentPage); // Display the first page initially
    }
}

// Function to display items for the current page
function displayPage(page) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows in the table

    const start = page * itemsPerPage; // Calculate the start index for slicing
    const end = Math.min(start + itemsPerPage, Object.keys(foodList).length); // Calculate the end index for slicing
    const pageItems = Object.entries(foodList).slice(start, end); // Get the items for the current page

    // Iterate over the items for the current page
    pageItems.forEach(entry => {
        const foodDetails = entry[1]; // Get the food details object
        const foodID = entry[0]; // Get the food ID (key)

        // Create a new table row element
        const row = document.createElement('tr');
        // Set the inner HTML of the row with food details and portions
        row.innerHTML = `
            <td>${foodDetails.FoodName}</td>
            <td>
                <table>
                    ${Object.entries(foodDetails.portions).map(([portion, value]) => `
                        <tr>
                            <td>${portion}</td>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </table>
            </td>
        `;
        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
