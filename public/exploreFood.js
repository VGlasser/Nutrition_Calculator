let currentPage = 0;
const itemsPerPage = 10;
let foodList = {};

// Function to fetch and initialize the food list
function initFoodList() {
    fetch('/foodData')
        .then(response => response.json())
        .then(data => {
            foodList = data;
            displayPage(currentPage); // Display the first page initially
        })
        .catch(error => console.error('Error fetching food data:', error));
}

// Display the current page
function displayPage(page) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    const start = page * itemsPerPage;
    const end = Math.min(start + itemsPerPage, Object.keys(foodList).length);
    const pageItems = Object.entries(foodList).slice(start, end);

    pageItems.forEach(entry => {
        const foodDetails = entry[1];
        const foodID = entry[0];

        const row = document.createElement('tr');
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
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initFoodList(); // Initialize the food list

    document.getElementById('next-button').addEventListener('click', () => {
        if ((currentPage + 1) * itemsPerPage < Object.keys(foodList).length) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage);
        }
    });
});
