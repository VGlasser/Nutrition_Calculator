document.addEventListener('DOMContentLoaded', () => {
    
    const urlParameters = new URLSearchParams(window.location.search);

    // var currentPage = 0;
    var currentPage = urlParameters.get('page')||0;
     var itemsPerPage = userAccount.FoodsPerPage;

    if (urlParameters.get('search') == 'undefined'||urlParameters.get('page') == 'undefined'){
        const updatedURL = `${window.location.pathname}?search=&page=1`;
        location.replace(updatedURL);
    }
    

    function displayPage() {
        
        const pageItems = Object.entries(foodList);
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; 

        pageItems.forEach(food => {
            const foodDetails = food[1];
            const foodID = food[0];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="/account/food/?id=${foodID}">${foodDetails.FoodName}</a></td>
            `;
            tableBody.appendChild(row);
        });
    }

    displayPage();

    document.getElementById('next-button').addEventListener('click', () => {
        currentPage++;
        urlParameters.set('page', currentPage);
        const updatedURL = `${window.location.pathname}?${urlParameters.toString()}`
        console.log('success');
        console.log(currentPage);
        location.replace(updatedURL);
    });

    document.getElementById('prev-button').addEventListener('click', () => {
        if(currentPage>1){
            currentPage--;}
        urlParameters.set('page', currentPage);
        const updatedURL = `${window.location.pathname}?${urlParameters.toString()}`
        console.log('success');
        console.log(currentPage);
        location.replace(updatedURL);
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
        currentPage = 0;
        const updatedURL = `${window.location.pathname}?search=${encodeURIComponent(searchInput)}&page=${currentPage}`;
        location.replace(updatedURL);
        displayPage();
    }
});


