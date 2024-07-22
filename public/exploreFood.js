document.addEventListener('DOMContentLoaded', () => {
    var currentPage = 0;
    var itemsPerPage = 15;

    function displayPage(page) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; 
        
        const start = page * itemsPerPage;
        const end = Math.min(start + itemsPerPage, Object.keys(foodList).length);
        const pageItems = Object.entries(foodList).slice(start, end);

        pageItems.forEach(food => {
            const foodDetails = food[1];
            const foodPortions = food[1].portions;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${foodDetails.FoodName}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    displayPage(currentPage);

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

    document.getElementById('SearchBox').addEventListener('input', () => {
        console.log(document.getElementById('SearchBox').value);
        currentPage = 0; // Reset to the first page on new search
        displayPage(currentPage);
    });
});
