let userList ={};

(function(){

  let req1 = new XMLHttpRequest();
  req1.open('GET','/userList',false);
  
  req1.onreadystatechange = function(){
    if(this.readyState==4 && this.status==200){
      userList = JSON.parse(req1.responseText);
    }
    else{
      console.error('Error retrieving list of users for loginPage', req1.status, req1.statusText);
    }
  };
  req1.send();

})();


function submit(){
	let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value;
	let sex = document.getElementById("Sex").value;
	let height = document.getElementById("Height").value;
	let weight = document.getElementById("Weight").value;
	let age = document.getElementById("Age").value;
	let activity = document.getElementById("Activity").value;


	if(username===""|| password===""| height==="" || weight===""|| age===""){
		alert("Please make sure that you have provided a username, height, and weight.")
		return;
	}
  else if(isNaN(height) || isNaN(weight) || isNaN(age)){
    alert ("Height and weight must be numbers values")
    return;
  }
  else if(userList.hasOwnProperty(username)){
    alert("Unfortunately, this username is already in use. Please try again.")
    return;
  }

  console.log("Unupdated height: ", height)
  height = toCm(height);
  console.log("Updated height: ",height)

  console.log("Unupdated weight: ", weight)
  weight = toKg(weight);
  console.log("Updated weight: ", weight)

  let bmr

  //Base metabolic rate and daily calories determined using formulas found on omnicalculator at following link: https://www.omnicalculator.com/health/calorie#how-many-calories-should-i-eat-a-day
  if(sex=="male"){
    bmr = (10*(weight)+6.25*(height)-5*(age)+5);
  }
  else{
    bmr = (10*(weight)+6.25*(height)-5*(age)-161);
  }
  console.log("BRM", bmr)

  let dailyCalories;
  if(activity=="Active_1"){
    dailyCalories = bmr*1.2;
  }
  else if(activity=="Active_2"){
    dailyCalories = bmr*1.4;
  }
  else if(activity=="Active_3"){
    dailyCalories = bmr*1.6;
  }
  else if(activity=="Active_4"){
    dailyCalories = bmr*1.75;
  }
  else if(activity=="Active_5"){
    dailyCalories = bmr*2.0;
  }
  else if(activity=="Active_6"){
    dailyCalories = bmr*2.3;
  }
  else{
    dailyCalories = 0;
  }

  let water;
  let vA;
  let vC;
  let vD;
  let vE;
  let vK;
  let thiamine;
  let riboflavin;
  let niacin;
  let vB6;
  let folate;
  let vB12;
  let pantothenicAcid;
  let biotin;
  let choline;

  if(age<0.5){
    water=0.7;
    vA=400
    vC=40
    vD=10
    vE=4
    vK=2
    thiamine=0.2
    riboflavin=0.3
    niacin=2
    vB6=0.1
    folate=65
    vB12=.4
    pantothenicAcid=1.7
    biotin=5
    choline=125
  }
  else if(age<1){
    water=1;
    vA=500
    vC=50
    vD=10
    vE=5
    vK=2.5
    thiamine=0.3
    riboflavin=0.4
    niacin=4
    vB6=0.3
    folate=80
    vB12=0.5
    pantothenicAcid=1.8
    biotin=6
    choline=150
  }
  else if(age<3){
    water=1.2;
    vA=300
    vC=15
    vD=15
    vE=6
    vK=30
    thiamine=0.5
    riboflavin=0.5
    niacin=6
    vB6=0.5
    folate=150
    vB12=0.9
    pantothenicAcid=2
    biotin=8
    choline=200
  }
  else if(age<4){
    water=1.3
    vA=300
    vC=15
    vD=15
    vE=6
    vK=30
    thiamine=0.5
    riboflavin=0.5
    niacin=6
    vB6=0.5
    folate=150
    vB12=0.9
    pantothenicAcid=2
    biotin=8
    choline=200
  }
  else if(age<9){
    water=1.6;
    vA=400
    vC=25
    vD=15
    vE=7
    vK=55
    thiamine=0.6
    riboflavin=0.6
    niacin=8
    vB6=0.6
    folate=200
    vB12=1.2
    pantothenicAcid=3
    biotin=12
    choline=250
  }
  else if(sex=="male"){
    if(age<14){
      water=2.1;
      vA=600
      vC=45
      vD=15
      vE=11
      vK=60
      thiamine=0.9
      riboflavin=0.9
      niacin=12
      vB6=1
      folate=300
      vB12=1.8
      pantothenicAcid=4
      biotin=20
      choline=375
    }
    else if(age<19){
      water=2.5;
      vA=900
      vC=75
      vD=15
      vE=15
      vK=75
      thiamine=1.2
      riboflavin=1.3
      niacin=16
      vB6=1.3
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=25
      choline=550
    }
    else if(age<31){
      water=2.5;
      vA=900
      vC=90
      vD=15
      vE=15
      vK=120
      thiamine=1.2
      riboflavin=1.3
      niacin=16
      vB6=1.3
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=550
    }
    else if(age<51){
      water=2.5;
      vA=900
      vC=90
      vD=15
      vE=15
      vK=120
      thiamine=1.2
      riboflavin=1.3
      niacin=16
      vB6=1.3
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=550
    }
    else if(age<71){
      water=2.5;
      vA=900
      vC=90
      vD=15
      vE=15
      vK=120
      thiamine=1.2
      riboflavin=1.3
      niacin=16
      vB6=1.7
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=550
    }
    else{
      water=2.5;
      vA=900
      vC=90
      vD=20
      vE=15
      vK=120
      thiamine=1.2
      riboflavin=1.3
      niacin=16
      vB6=1.7
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=550
    }
  }

  else if(sex=="female"){
    if(age<14){
      water=1.9;
      vA=600
      vC=45
      vD=15
      vE=11
      vK=60
      thiamine=0.9
      riboflavin=0.9
      niacin=12
      vB6=1
      folate=300
      vB12=1.8
      pantothenicAcid=4
      biotin=20
      choline=375
    }
    else if(age<19){
      water=2.0;
      vA=700
      vC=65
      vD=15
      vE=15
      vK=75
      thiamine=1
      riboflavin=1
      niacin=14
      vB6=1.2
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=25
      choline=400
    }
    else if(age<31){
      water=2.0;
      vA=700
      vC=75
      vD=15
      vE=15
      vK=90
      thiamine=1.1
      riboflavin=1.1
      niacin=14
      vB6=1.3
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=425
    }
    else if(age<51){
      water=2.0;
      vA=700
      vC=75
      vD=15
      vE=15
      vK=90
      thiamine=1.1
      riboflavin=1.1
      niacin=14
      vB6=1.3
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=425
    }
    else if(age<71){
      water=2.0;
      vA=700
      vC=75
      vD=15
      vE=15
      vK=90
      thiamine=1.1
      riboflavin=1.1
      niacin=14
      vB6=1.5
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=425
    }
    else{
      water=2.0;
      vA=700
      vC=75
      vD=20
      vE=15
      vK=90
      thiamine=1.1
      riboflavin=1.1
      niacin=14
      vB6=1.5
      folate=400
      vB12=2.4
      pantothenicAcid=5
      biotin=30
      choline=425
    }
  }
  else{
    water=0.0;
    vA=0
    vC=0
    vD=0
    vE=0
    vK=0
    thiamine=0
    riboflavin=0
    niacin=0
    vB6=0
    folate=0
    vB12=0
    pantothenicAcid=0
    biotin=0
    choline=0
  }


  let newUser = {
    Password:password,
    Calories:Math.round(dailyCalories),
    Carbs:Math.round(dailyCalories*.55/4),
    Fats:Math.round(dailyCalories*.25/4),
    Protein:Math.round(dailyCalories*.20/4),
    Fibre:Math.round(dailyCalories/1000*14),
    Water:water,
    VitaminA:vA,
    VitaminB6:vB6,
    VitaminB12:vB12,
    VitaminC:vC,
    VitaminD:vD,
    VitaminE:vE,
    VitaminK:vK,
    Thiamine:thiamine,
    Riboflavin:riboflavin,
    Niacin:niacin,
    Folate:folate,
    PantothenicAcid:pantothenicAcid,
    Biotin:biotin,
    Choline:choline,
    Calcium:1000,
    Copper:0.9,
    Iron:18,
    Magnesium:320,
    Manganese:1.8,
    Phosphorus:700,
    Potassium:4700,
    Selenium:55,
    Sodium:1500,
    Salt:4100,
    Zinc:8,
    SavedFoods:{},
    FoodsPerPage:10
	};

  postList = {data:[username,newUser]};

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			document.getElementById("Username").value ='';
      document.getElementById("Password").value ='';
			document.getElementById("Height").value ='';
			document.getElementById("Weight").value ='';
      document.getElementById("Age").value ='';
      window.location = (`http://localhost:3000/account/${username}`);
		}
	}
	req.open("POST", `/newAccountPage`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(postList));
}

function toCm(updatedHeight){
  let heightUnits = document.getElementById("HeightUnits").value;
  if(heightUnits=="Metres"){
    updatedHeight*=100;
  }
  else if(heightUnits=="Inches"){
    updatedHeight*=2.54;
  }
  return updatedHeight;
}

function toKg(updatedWeight){
  let weightUnits = document.getElementById("WeightUnits").value;
  if(weightUnits=="Grams"){
    updatedWeight/=1000
  }
  else if(weightUnits=="Pounds"){
    updatedWeight/=2.205;
  }
  return updatedWeight;
}