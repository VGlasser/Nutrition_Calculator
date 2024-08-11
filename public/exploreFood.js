document.addEventListener('DOMContentLoaded', () => {
    var currentPage = 0;
    var itemsPerPage = userAccount.FoodsPerPage;

    //ensures that neither parameter is undefined
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('search') == 'undefined'||urlParams.get('page') == 'undefined'){
        const updatedURL = `${window.location.pathname}?search=&page=0`;
        location.replace(updatedURL);
    }
    

    function displayPage(page) {
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; 
        
        const start = page * itemsPerPage;
        const end = Math.min(start + itemsPerPage, Object.keys(foodList).length);
        const pageItems = Object.entries(foodList).slice(start, end);

        pageItems.forEach(food => {
            const foodDetails = food[1];
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

    document.getElementById('SearchBox').addEventListener('keydown', (event) => {
        if (event.key === 'Enter'){
            filterSearch();
        }
    });

    document.getElementById('EnterButton').addEventListener('click', () => {
        filterSearch();
    });

    function filterSearch(){
        const searchInput = document.getElementById('SearchBox').value
        console.log(searchInput);
        const updatedURL = `${window.location.pathname}?search=${encodeURIComponent(searchInput)}&page=${currentPage}`;
        location.replace(updatedURL);
        console.log(updatedURL)
        currentPage = 0; // Reset to the first page on new search
        displayPage(currentPage);
    }
});


