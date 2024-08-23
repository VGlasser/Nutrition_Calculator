function clearDailyTotal(){
    console.log(userAccount["SavedFoods"]);
    // const selectedPortion = document.querySelector('input[name="portion"]:checked');
    // const successMessages = document.getElementById('SuccessMessages');
    
    // if (selectedPortion) {
    //     const portionValue = selectedPortion.value;
    //     let portionMultiplier = (food.portions[portionValue]);
    //     const successMessageRow = document.createElement('tr');
    //     successMessageRow.innerHTML = `
    //     <td>
    //         Successfully added ${portionValue} to daily total (WIP)
    //     </td>`;
    //     successMessages.appendChild(successMessageRow);

    //     nutrientList = confirmNutrients(portionMultiplier);
    //     console.log(id);
    //     nutrientList.FoodID = `ID ${id} | Portion ${portionValue}`;
    //     console.log(nutrientList);

    //     req = new XMLHttpRequest();
    //     req.onreadystatechange = function() {
    //         if(this.readyState==4 && this.status==200){
    //             window.location = (`http://localhost:3000/account/${username}`);
    //         }
    //     }
    //     req.open("POST", `/foodInfo/add`);
    //     req.setRequestHeader("Content-Type", "application/json");
    //     req.send(JSON.stringify(nutrientList));

    // }
    // else {
    //     alert('No portion selected');
    // }
}
