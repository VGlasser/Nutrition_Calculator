let userList ={};
let foodList ={};

function getUserList(){

  let req1 = new XMLHttpRequest();
  req1.open('GET','/userList',false);
  
  req1.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      userList = JSON.parse(req1.responseText);
    }
    else{
      console.error('Error retrieving list of users', req1.status, req1.statusText);
    }
  };
  req1.send();
};

function getFoodList(){

  let req1 = new XMLHttpRequest();

  req1.open('GET','/foodList',false);
  
  req1.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      foodList = JSON.parse(req1.responseText);
    }
    else{
      console.error('Error retrieving list of foods', req1.status, req1.statusText);
    }
  };
  req1.send();

};


getUserList();

function addFood(){
  
  getUserList();
  getFoodList();

  let name = document.getElementById("Name").value
  let calories =  document.getElementById("Calories").value;
  let carbs =  document.getElementById("Carbs").value;
  let fats =  document.getElementById("Fats").value;
  let protein =  document.getElementById("Protein").value;
  let fibre =  document.getElementById("Fibre").value;
  let water =  document.getElementById("Water").value;
  let vitaminA =  document.getElementById("Vitamin A").value;
  let vitaminB6 =  document.getElementById("Vitamin B6").value;
  let vitaminB12 =  document.getElementById("Vitamin B12").value;
  let vitaminC =  document.getElementById("Vitamin C").value;
  let vitaminD =  document.getElementById("Vitamin D").value;
  let vitaminE =  document.getElementById("Vitamin E").value;
  let vitaminK =  document.getElementById("Vitamin K").value;
  let thiamine =  document.getElementById("Thiamine").value;
  let riboflavin =  document.getElementById("Riboflavin").value;
  let niacin =  document.getElementById("Niacin").value;
  let pantothenicAcid =  document.getElementById("Pantothenic Acid").value;
  let calcium =  document.getElementById("Calcium").value;
  let copper =  document.getElementById("Copper").value;
  let iron =  document.getElementById("Iron").value;
  let magnesium =  document.getElementById("Magnesium").value;
  let manganese =  document.getElementById("Manganese").value;
  let phosphorus =  document.getElementById("Phosphorus").value;
  let potassium =  document.getElementById("Potassium").value;
  let selenium =  document.getElementById("Selenium").value;
  let sodium =  document.getElementById("Sodium").value;
  let zinc =  document.getElementById("Zinc").value;

  if(foodList.hasOwnProperty(name)){
    alert("You already have a food with this name. Please choose a different name")
    return;
  }

  if(name===""|| calories===""|| carbs===""|| fats===""|| protein===""|| fibre===""|| water===""|| vitaminA===""|| vitaminB6===""|| vitaminB12===""|| vitaminC===""||
   vitaminD===""|| vitaminE===""|| vitaminK===""|| thiamine===""|| riboflavin===""|| niacin===""|| pantothenicAcid===""|| calcium===""|| copper===""|| iron===""||
   magnesium===""|| manganese===""|| phosphorus===""|| potassium===""|| selenium===""|| sodium===""|| zinc===""){
		alert("You must fill all fields to add food. Please try again.")
		return;
	}
  
  let newFood = {
    Name:name,
    Calories:calories,
    Carbs:carbs,
    Fats:fats,
    Protein:protein,
    Fibre:fibre,
    Water:water,
    VitaminA:vitaminA,
    VitaminB6:vitaminB6,
    VitaminB12:vitaminB12,
    VitaminC:vitaminC,
    VitaminD:vitaminD,
    VitaminE:vitaminE,
    VitaminK:vitaminK,
    Thiamine:thiamine,
    Riboflavin:riboflavin,
    Niacin:niacin,
    PantothenicAcid:pantothenicAcid,
    Calcium:calcium,
    Copper:copper,
    Iron:iron,
    Magnesium:magnesium,
    Manganese:manganese,
    Phosphorus:phosphorus,
    Potassium:potassium,
    Selenium:selenium,
    Sodium:sodium,
    Zinc:zinc
	};

  postList = {data:newFood};

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
      location.reload();
		}
	}

  req.open("POST", `/food`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(postList));
}