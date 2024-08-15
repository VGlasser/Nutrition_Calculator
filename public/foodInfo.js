document.addEventListener('DOMContentLoaded', () => {
    const urlParameters = new URLSearchParams(window.location.search);
    var id = urlParameters.get('id')||0;
    console.log(foodList[id].FoodName);



    function displayPage() {

        document.getElementById("Name").textContent = foodList[id].FoodName;


        console.log("success")
        // const pageItems = Object.entries(foodList);
        // const tableBody = document.querySelector('#data-table tbody');
        // tableBody.innerHTML = ''; 

        // pageItems.forEach(food => {
        //     const foodDetails = food[1];
        //     const foodID = food[0];
        //     const row = document.createElement('tr');
        //     row.innerHTML = `
        //         <td><a href="/account/${userAccount.Username}/foodInfo/?id=${foodID}">${foodDetails.FoodName}</a></td>
        //     `;
        //     tableBody.appendChild(row);
        // });
    }

    displayPage();
});


