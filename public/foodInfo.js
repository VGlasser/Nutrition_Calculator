document.addEventListener('DOMContentLoaded', () => {
    const urlParameters = new URLSearchParams(window.location.search);
    var id = urlParameters.get('id')||0;

    function displayPage() {

        document.getElementById("Name").textContent = foodList[id].FoodName;

        portions = foodList[id].portions;

        food = (foodList[id]);
        console.log(foodList[id][`CALCIUM`].NutrientValue+foodList[id][`CALCIUM`].NutrientUnit);


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


        const caloriesRow = document.getElementById('Macros');
        caloriesRow.innerHTML = `
        <tr>
            <td> Calories:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue} ${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Carbs:</td>
            <td> ${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientValue} ${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Fats:</td>
            <td> ${food[`FAT (TOTAL LIPIDS)`].NutrientValue} ${food[`FAT (TOTAL LIPIDS)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Protein:</td>
            <td> ${food[`PROTEIN`].NutrientValue} ${food[`PROTEIN`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Fibre:</td>
            <td> ${food[`FIBRE, TOTAL DIETARY`].NutrientValue} ${food[`FIBRE, TOTAL DIETARY`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Water:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue} ${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>
        `;
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


