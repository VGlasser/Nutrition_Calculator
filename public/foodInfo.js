document.addEventListener('DOMContentLoaded', () => {
    const urlParameters = new URLSearchParams(window.location.search);
    var id = urlParameters.get('id')||0;

    function displayPage() {

        document.getElementById("Name").textContent = foodList[id].FoodName;

        portions = foodList[id].portions;

        food = (foodList[id]);
        console.log(foodList[id]);
        console.log(userAccount);



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
        populateNutrientTable()
    }

    displayPage();
});

//add quantity value to info for how many of this portion user has already added
function addToDailyTotal(){
    const selectedPortion = document.querySelector('input[name="portion"]:checked');
    const successMessages = document.getElementById('SuccessMessages');
    
    if (selectedPortion) {
        const portionValue = selectedPortion.value;
        let portionMultiplier = (food.portions[portionValue]);
        const successMessageRow = document.createElement('tr');
        successMessageRow.innerHTML = `
        <td>
            Successfully added ${portionValue} to daily total (WIP)
        </td>`;
        successMessages.appendChild(successMessageRow);

        nutrientList = confirmNutrients(portionMultiplier);
        console.log(id);
        nutrientList.FoodID = `ID ${id} | Portion ${portionValue}`;
        console.log(nutrientList);

        req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(this.readyState==4 && this.status==200){
                window.location = (`http://localhost:3000/account/${username}`);
            }
        }
        req.open("POST", `/foodInfo/add`);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(nutrientList));

    }
    else {
        alert('No portion selected');
    }
}

//
// function removeFromDailyTotal(){
//     const selectedPortion = document.querySelector('input[name="portion"]:checked');
//     const successMessages = document.getElementById('SuccessMessages');
    
//     if (selectedPortion) {
//         // if (the food exists in the user's current foods && that value is >0)
//         const portionValue = selectedPortion.value;
//         const successMessageRow = document.createElement('tr');
//         successMessageRow.innerHTML = `
//         <td>
//             Successfully removed ${portionValue} from daily total (WIP)
//         </td>`;
//         successMessages.appendChild(successMessageRow);

//     //    {
//     //     req = new XMLHttpRequest();
//     //     req.onreadystatechange = function() {
//     //         if(this.readyState==4 && this.status==200){
//     //             window.location = (`http://localhost:3000/account/${username}`);
//     //         }
//     //     }
//     //     req.open("POST", `/foodInfo/remove`);
//     //     req.setRequestHeader("Content-Type", "application/json");
//     //     req.send(JSON.stringify(postList));
//     //     }

//     }
//     else {
//         alert('No portion selected');
//     }
// }


function populateNutrientTable(){
    const macroRow = document.getElementById('Macros');
        if(food[`ENERGY (KILOCALORIES)`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Calories:</td>
            <td> ${food[`ENERGY (KILOCALORIES)`].NutrientValue}${food[`ENERGY (KILOCALORIES)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Carbs:</td>
            <td> ${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientValue}${food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`FAT (TOTAL LIPIDS)`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Fats:</td>
            <td> ${food[`FAT (TOTAL LIPIDS)`].NutrientValue}${food[`FAT (TOTAL LIPIDS)`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`PROTEIN`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Protein:</td>
            <td> ${food[`PROTEIN`].NutrientValue}${food[`PROTEIN`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`FIBRE, TOTAL DIETARY`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Fibre:</td>
            <td> ${food[`FIBRE, TOTAL DIETARY`].NutrientValue}${food[`FIBRE, TOTAL DIETARY`].NutrientUnit}</td>
        </tr>`
        }

        if(food[`MOISTURE`]!=undefined){
            macroRow.innerHTML += `
        <tr>
            <td> Water:</td>
            <td> ${food[`MOISTURE`].NutrientValue/1000}L</td>
        </tr>
        `
        }


        const vitaminRow = document.getElementById('Vitamins');

        if(food[`RETINOL`]!=undefined){
        vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin A:</td>
            <td> ${food[`RETINOL`].NutrientValue}${food[`RETINOL`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[`VITAMIN B-6`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin B6:</td>
            <td> ${food[`VITAMIN B-6`].NutrientValue}${food[`VITAMIN B-6`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[`VITAMIN B-12`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin B12:</td>
            <td> ${food[`VITAMIN B-12`].NutrientValue}${food[`VITAMIN B-12`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[`VITAMIN C`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin C:</td>
            <td> ${food[`VITAMIN C`].NutrientValue}${food[`VITAMIN C`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[[`VITAMIN D (D2 + D3)`]]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin D:</td>
            <td> ${food[`VITAMIN D (D2 + D3)`].NutrientValue}${food[`VITAMIN D (D2 + D3)`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[`ALPHA-TOCOPHEROL`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin E:</td>
            <td> ${food[`ALPHA-TOCOPHEROL`].NutrientValue}${food[`ALPHA-TOCOPHEROL`].NutrientUnit}</td>
        </tr>
        `
        }

        if(food[`VITAMIN K`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Vitamin K:</td>
            <td> ${food[`VITAMIN K`].NutrientValue}${food[`VITAMIN K`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`THIAMIN`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Thiamin:</td>
            <td> ${food[`THIAMIN`].NutrientValue}${food[`THIAMIN`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`RIBOFLAVIN`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Riboflavin:</td>
            <td> ${food[`RIBOFLAVIN`].NutrientValue}${food[`RIBOFLAVIN`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`NIACIN (NICOTINIC ACID) PREFORMED`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Niacin:</td>
            <td> ${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientValue}${food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`FOLIC ACID`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Folate:</td>
            <td> ${food[`FOLIC ACID`].NutrientValue+food[`NATURALLY OCCURRING FOLATE`].NutrientValue}${food[`FOLIC ACID`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`PANTOTHENIC ACID`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Pantothenic Acid:</td>
            <td> ${food[`PANTOTHENIC ACID`].NutrientValue}${food[`PANTOTHENIC ACID`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`BIOTIN`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Biotin:</td>
            <td> ${food[`BIOTIN`].NutrientValue}${food[`BIOTIN`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`CHOLINE, TOTAL`]!=undefined){
            vitaminRow.innerHTML += `
        <tr>
            <td> Choline:</td>
            <td> ${food[`CHOLINE, TOTAL`].NutrientValue}${food[`CHOLINE, TOTAL`].NutrientUnit}</td>
        </tr>
        `
        }


        const mineralRow = document.getElementById('Minerals');

        if(food[`CALCIUM`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Calcium:</td>
            <td> ${food[`CALCIUM`].NutrientValue}${food[`CALCIUM`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`COPPER`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Copper:</td>
            <td> ${food[`COPPER`].NutrientValue}${food[`COPPER`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`IRON`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Iron:</td>
            <td> ${food[`IRON`].NutrientValue}${food[`IRON`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`MAGNESIUM`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Magnesium:</td>
            <td> ${food[`MAGNESIUM`].NutrientValue}${food[`MAGNESIUM`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`MANGANESE`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Manganese:</td>
            <td> ${food[`MANGANESE`].NutrientValue}${food[`MANGANESE`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`PHOSPHORUS`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Phosphorus:</td>
            <td> ${food[`PHOSPHORUS`].NutrientValue}${food[`PHOSPHORUS`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`POTASSIUM`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Potassium:</td>
            <td> ${food[`POTASSIUM`].NutrientValue}${food[`POTASSIUM`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`SELENIUM`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Selenium:</td>
            <td> ${food[`SELENIUM`].NutrientValue}${food[`SELENIUM`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`SODIUM`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Sodium:</td>
            <td> ${food[`SODIUM`].NutrientValue}${food[`SODIUM`].NutrientUnit}</td>
        </tr>
        `
        }
        if(food[`ZINC`]!=undefined){
            mineralRow.innerHTML += `
        <tr>
            <td> Zinc:</td>
            <td> ${food[`ZINC`].NutrientValue+food[`ZINC`].NutrientValue}${food[`FOLIC ACID`].NutrientUnit}</td>
        </tr>
        `
        }
}

function confirmNutrients(portionMultiplier){
    let tempNutrientList = {Username:userAccount.Username};

    if(food[`ENERGY (KILOCALORIES)`]!=undefined){
        tempNutrientList.CurrCalories = food[`ENERGY (KILOCALORIES)`].NutrientValue * portionMultiplier;
    }

    if(food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`]!=undefined){
        tempNutrientList.CurrCarbs = food[`CARBOHYDRATE, TOTAL (BY DIFFERENCE)`].NutrientValue * portionMultiplier;
    }

    if(food[`FAT (TOTAL LIPIDS)`]!=undefined){
        tempNutrientList.CurrFats = food[`FAT (TOTAL LIPIDS)`].NutrientValue * portionMultiplier;
    }

    if(food[`PROTEIN`]!=undefined){
        tempNutrientList.CurrProtein = food[`PROTEIN`].NutrientValue * portionMultiplier;
    }

    if(food[`FIBRE, TOTAL DIETARY`]!=undefined){
        tempNutrientList.CurrFibre = food[`FIBRE, TOTAL DIETARY`].NutrientValue * portionMultiplier;
    }

    if(food[`MOISTURE`]!=undefined){
        tempNutrientList.CurrWater = food[`MOISTURE`].NutrientValue * portionMultiplier;
    }

    if(food[`RETINOL`]!=undefined){
        tempNutrientList.CurrVitaminA = food[`RETINOL`].NutrientValue * portionMultiplier;
    }

    if(food[`VITAMIN B-6`]!=undefined){
        tempNutrientList.CurrVitaminB6 = food[`VITAMIN B-6`].NutrientValue * portionMultiplier;
    }

    if(food[`VITAMIN B-12`]!=undefined){
        tempNutrientList.CurrVitaminB12 = food[`VITAMIN B-12`].NutrientValue * portionMultiplier;
    }

    if(food[`VITAMIN C`]!=undefined){
        tempNutrientList.CurrVitaminC = food[`VITAMIN C`].NutrientValue * portionMultiplier;
    }

    if(food[`VITAMIN D (D2 + D3)`]!=undefined){
        tempNutrientList.CurrVitaminD = food[`VITAMIN D (D2 + D3)`].NutrientValue * portionMultiplier;
    }

    if(food[`ALPHA-TOCOPHEROL`]!=undefined){
        tempNutrientList.CurrVitaminE = food[`ALPHA-TOCOPHEROL`].NutrientValue * portionMultiplier;
    }

    if(food[`VITAMIN K`]!=undefined){
        tempNutrientList.CurrVitaminK = food[`VITAMIN K`].NutrientValue * portionMultiplier;
    }

    if(food[`THIAMIN`]!=undefined){
        tempNutrientList.CurrThiamine = food[`THIAMIN`].NutrientValue * portionMultiplier;
    }

    if(food[`RIBOFLAVIN`]!=undefined){
        tempNutrientList.CurrRiboflavin = food[`RIBOFLAVIN`].NutrientValue * portionMultiplier;
    }

    if(food[`NIACIN (NICOTINIC ACID) PREFORMED`]!=undefined){
        tempNutrientList.CurrNiacin = food[`NIACIN (NICOTINIC ACID) PREFORMED`].NutrientValue * portionMultiplier;
    }

    if(food[`FOLIC ACID`]!=undefined){
        tempNutrientList.CurrFolate = food[`FOLIC ACID`].NutrientValue * portionMultiplier;
    }
    
    if(food[`PANTOTHENIC ACID`]!=undefined){
        tempNutrientList.CurrPantothenicAcid = food[`PANTOTHENIC ACID`].NutrientValue * portionMultiplier;
    }

    if(food[`BIOTIN`]!=undefined){
        tempNutrientList.CurrCholine = food[`BIOTIN`].NutrientValue * portionMultiplier;
    }

    if(food[`CHOLINE, TOTAL`]!=undefined){
        tempNutrientList.CurrCholine = food[`CHOLINE, TOTAL`].NutrientValue * portionMultiplier;
    }

    if(food[`CALCIUM`]!=undefined){
        tempNutrientList.CurrCalcium = food[`CALCIUM`].NutrientValue * portionMultiplier;
    }

    if(food[`COPPER`]!=undefined){
        tempNutrientList.CurrCopper = food[`COPPER`].NutrientValue * portionMultiplier;
    }

    if(food[`IRON`]!=undefined){
        tempNutrientList.CurrIron = food[`IRON`].NutrientValue * portionMultiplier;
    }

    if(food[`MAGNESIUM`]!=undefined){
        tempNutrientList.CurrMagnesium = food[`MAGNESIUM`].NutrientValue * portionMultiplier;
    }

    if(food[`MANGANESE`]!=undefined){
        tempNutrientList.CurrManganese = food[`MANGANESE`].NutrientValue * portionMultiplier;
    }

    if(food[`PHOSPHORUS`]!=undefined){
        tempNutrientList.CurrPhosphorus = food[`PHOSPHORUS`].NutrientValue * portionMultiplier;
    }

    if(food[`POTASSIUM`]!=undefined){
        tempNutrientList.CurrPotassium = food[`POTASSIUM`].NutrientValue * portionMultiplier;
    }

    if(food[`SELENIUM`]!=undefined){
        tempNutrientList.CurrSelenium = food[`SELENIUM`].NutrientValue * portionMultiplier;
    }

    if(food[`SODIUM`]!=undefined){
        tempNutrientList.CurrSodium = food[`SODIUM`].NutrientValue * portionMultiplier;
    }

    if(food[`ZINC`]!=undefined){
        tempNutrientList.CurrZinc = food[`ZINC`].NutrientValue * portionMultiplier;
    }
   
    return tempNutrientList;
}