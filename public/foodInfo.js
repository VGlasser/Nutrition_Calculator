document.addEventListener('DOMContentLoaded', () => {
    const urlParameters = new URLSearchParams(window.location.search);
    var id = urlParameters.get('id')||0;

    function displayPage() {

        document.getElementById("Name").textContent = foodList[id].FoodName;

        portions = foodList[id].portions;

        food = (foodList[id]);
        console.log(foodList[id]);


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

        populateNutrientTable()
        
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

//NOT ALL FOODS HAVE ENTRIES FOR EACH NUTRIENT!!
function populateNutrientTable(){
    const macroRow = document.getElementById('Macros');
        if(food[`ENERGY (KILOCALORIES)`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Calories:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue}${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Carbs:</td>
            <td> ${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientValue}${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`FAT (TOTAL LIPIDS)`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Fats:</td>
            <td> ${food[`FAT (TOTAL LIPIDS)`].NutrientValue}${food[`FAT (TOTAL LIPIDS)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`PROTEIN`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Protein:</td>
            <td> ${food[`PROTEIN`].NutrientValue}${food[`PROTEIN`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`FIBRE, TOTAL DIETARY`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Fibre:</td>
            <td> ${food[`FIBRE, TOTAL DIETARY`].NutrientValue}${food[`FIBRE, TOTAL DIETARY`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`MOISTURE`].NutrientValue!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Water:</td>
            <td> ${food[`MOISTURE`].NutrientValue/1000}L</td>
        </tr>
        `
        }


        console.log(food[`ALPHA-TOCOPHEROL`]==undefined);

        const vitaminRow = document.getElementById('Vitamins');
        vitaminRow.innerHTML = 
        `
        <tr>
            <td> Vitamin A:</td>
            <td> ${food[`RETINOL`].NutrientValue}${food[`RETINOL`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Vitamin B6:</td>
            <td> ${food[`VITAMIN B-6`].NutrientValue}${food[`VITAMIN B-6`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Vitamin B12:</td>
            <td> ${food[`VITAMIN B-12`].NutrientValue}${food[`VITAMIN B-12`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> VITAMIN C:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue}${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Vitamin D:</td>
            <td> ${food[`VITAMIN D (D2 + D3)`].NutrientValue}${food[`VITAMIN D (D2 + D3)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Vitamin E:</td>
            <td> ${food[`ALPHA-TOCOPHEROL`].NutrientValue}${food[`ALPHA-TOCOPHEROL`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Vitamin K:</td>
            <td> ${food[`VITAMIN K`].NutrientValue}${food[`VITAMIN K`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Thiamin:</td>
            <td> ${food[`THIAMIN`].NutrientValue}${food[`THIAMIN`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Riboflavin:</td>
            <td> ${food[`RIBOFLAVIN`].NutrientValue}${food[`RIBOFLAVIN`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Niacin:</td>
            <td> ${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientValue}${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Folate:</td>
            <td> ${food[`FOLIC ACID`].NutrientValue+food[`NATURALLY OCCURRING FOLATE`].NutrientValue}${food[`FOLIC ACID`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Pantothenic Acid:</td>
            <td> ${food[`PANTOTHENIC ACID`].NutrientValue}${food[`PANTOTHENIC ACID`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> BIOTIN:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue}${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> CHOLINE:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue}${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>
        `;

        const mineralRow = document.getElementById('Minerals');
        mineralRow.innerHTML = `
        <tr>
            <td> Calcium:</td>
            <td> ${food[`CALCIUM`].NutrientValue}${food[`CALCIUM`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Copper:</td>
            <td> ${food[`COPPER`].NutrientValue}${food[`COPPER`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Iron:</td>
            <td> ${food[`IRON`].NutrientValue}${food[`IRON`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Magnesium:</td>
            <td> ${food[`MAGNESIUM`].NutrientValue}${food[`MAGNESIUM`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> MANGANESE:</td>
            <td> ${food[`VITAMIN D (D2 + D3)`].NutrientValue}${food[`VITAMIN D (D2 + D3)`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Phosphorus:</td>
            <td> ${food[`PHOSPHORUS`].NutrientValue}${food[`PHOSPHORUS`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Potassium:</td>
            <td> ${food[`POTASSIUM`].NutrientValue}${food[`POTASSIUM`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Selenium:</td>
            <td> ${food[`SELENIUM`].NutrientValue}${food[`SELENIUM`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Sodium:</td>
            <td> ${food[`SODIUM`].NutrientValue}${food[`SODIUM`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> SALT:</td>
            <td> ${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientValue}${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientUnit}</td>
        </tr>
        <tr>
            <td> Zinc:</td>
            <td> ${food[`ZINC`].NutrientValue+food[`ZINC`].NutrientValue}${food[`FOLIC ACID`].NutrientUnit}</td>
        </tr>
        <tr>
        `;
}

