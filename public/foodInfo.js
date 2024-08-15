document.addEventListener('DOMContentLoaded', () => {
    const urlParameters = new URLSearchParams(window.location.search);
    var id = urlParameters.get('id')||0;

    function displayPage() {

        document.getElementById("Name").textContent = foodList[id].FoodName;

        portions = foodList[id].portions;

        
        const tableBody = document.getElementById('PortionTable'); 

        for (const portion in portions) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="radio" name="portion" value="${portion}"> ${portion}
                </td>
            `;
            tableBody.appendChild(row);
        }
        const buttonRow = document.createElement('tr');
        buttonRow.innerHTML = `
        <td>
            <button onclick="addToDailyTotal()">Add to my daily total</button>
        </td>`;
        tableBody.appendChild(buttonRow);
    }

    displayPage();
});

function addToDailyTotal(){
    const selectedPortion = document.querySelector('input[name="portion"]:checked');
    const successMessages = document.getElementById('SuccessMessages');
    
    if (selectedPortion) {
        const portionValue = selectedPortion.value;
        const successMessageRow = document.createElement('tr');
        successMessageRow.innerHTML = `
        <td>
            successfully added ${portionValue} to daily total
        </td>`;
        successMessages.appendChild(successMessageRow);
    } else {
        alert('No portion selected');
    }
}


