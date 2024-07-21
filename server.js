const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static("public"));
app.use(express.json());

app.set('view engine','pug');

var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "student",
     database: "test"
});
   
 let foodData={};
 
 con.connect(function(err) {
   if (err) throw err;
   con.query(
     
     `SELECT food_names.FoodID, food_names.FoodDescription, nutrient_name.NutrientName, nutrient_amount.nutrientValue, nutrient_name.NutrientUnit, measure_name.MeasureDescription, conversion_factor.ConversionFactorValue
     FROM (nutrient_amount
     JOIN food_names ON food_names.FoodID = nutrient_amount.FoodID)
     JOIN nutrient_name ON nutrient_amount.nutrientID = nutrient_name.nutrientID
     JOIN conversion_factor ON conversion_factor.FoodID = food_names.FoodID
     LEFT JOIN measure_name ON measure_name.MeasureID =  conversion_factor.MeasureID 
     WHERE nutrient_name.NutrientName IN 
     ('FAT (TOTAL LIPIDS)', 'PROTEIN', 'ENERGY (KILOCALORIES)', 'CARBOHYDRATE, TOTAL (BY DIFFERENCE)','FIBRE, TOTAL DIETARY','MOISTURE'
     'RETINOL', 'RETINOL ACTIVITY EQUIVALENTS','VITAMIN B-6','VITAMIN B-12','VITAMIN B12, ADDED','VITAMIN C','VITAMIN D (D2 + D3)','VITAMIN D (INTERNATIONAL UNITS)','VITAMIN D2, ERGOCALCIFEROL','ALPHA-TOCOPHEROL','ALPHA-TOCOPHEROL, ADDED','VITAMIN K','THIAMIN','RIBOFLAVIN','NIACIN (NICOTINIC ACID) PREFORMED','NATURALLY OCCURRING FOLATE','FOLIC ACID','PANTOTHENIC ACID','BIOTIN','CHOLINE, TOTAL',
     'CALCIUM','COPPER','IRON','MAGNESIUM','MANGANESE','PHOSPHORUS','POTASSIUM','SELENIUM','SODIUM','ZINC');`
     
     , function (err, result) {
     if (err) throw err;
     result.forEach(row=>{

       //ID of current food
       FoodID = row.FoodID;

       //name of current food
       FoodName = row.FoodDescription;

       //Serving size
       FoodServingSize = row.MeasureDescription;

       //conversion factor
       NutrientConversionFactor = row.ConversionFactorValue;

       //name of nutrient
       NutrientName = row.NutrientName;

 
       //nutrient information for food
       NutrientData = {
         NutrientValue: row.nutrientValue,
         NutrientUnit: row.NutrientUnit
       };
 
       if([FoodID] in foodData){
          foodData[FoodID].portions[FoodServingSize]=NutrientConversionFactor;
          foodData[FoodID][NutrientName]=NutrientData;
       }
       else{
         foodData[FoodID]={FoodName};
         foodData[FoodID].portions={[FoodServingSize]:NutrientConversionFactor};
         foodData[FoodID][NutrientName]=NutrientData;
       }
     });

 
     fs.writeFile('./data/3_foodData.json', JSON.stringify(foodData, null, 2), function(err) {
       if (err) throw err;
       console.log('Data has been saved to 3_foodData.json');
     });
 
   });
 });
 
 


fs.readdir("./data", function(err, files){
     
     //creates the vendor list
     let dataList = [];
     for(let i=0; i<files.length; i++){
          let data = require("./data/" + files[i]);
          dataList.push(data);
     }

     //Responds with home page data if requested
     app.get("/", (req, res)=> {
          try{
               res.render("loginPage.pug"); 
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }
     });

     // retrieves the .pug page made for the user to register for a new account
     app.get('/newAccountPage', (req,res) =>{
          try{
               res.render ('newAccountPage.pug');
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }
     })

     // takes information from user who wants to register and adds account info to userList database
	//
     //
     app.post('/newAccountPage',(req,res)=>{
          let reqObject = req.body;
          let key = reqObject.data[0];
          let value = reqObject.data[1];
		dataList[1][key] = value;

          let userListFP = "./data/1_userList.json";
          let userListData = fs.readFileSync(userListFP, 'utf-8');
          let userListObject = JSON.parse(userListData);
          userListObject[key] = value;


          let updatedJsonData = JSON.stringify(userListObject, null, 2);

          fs.writeFileSync(userListFP, updatedJsonData, 'utf-8');


		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});

     app.post('/food',(req,res)=>{
          console.log("test")
          console.log(req.body.data)
          let reqObject = req.body;
          let key = reqObject.data.Name;
          let value = reqObject.data;
          delete value["Name"]
		dataList[2][key] = value;

          console.log("Key: ",key);
          console.log("Value: ", value);


          let foodListFP = "./data/2_foodList.json";
          let foodListData = fs.readFileSync(foodListFP, 'utf-8');
          let foodListObject = JSON.parse(foodListData);
          foodListObject[key] = value;

          let updatedJsonData = JSON.stringify(foodListObject, null, 2);

          fs.writeFileSync(foodListFP, updatedJsonData, 'utf-8');


		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});


     //retrieves the .pug file for a user's login page
     app.get('/account/:name', (req,res)=>{
          let reqName = req.params.name;
          let pugSend = dataList[1][reqName];
          pugSend.Username = reqName;
          try{
               res.render('AccountPage.pug',{Title: "AccountPage", userAccount:pugSend, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }
     });

     app.get('/account/:name/exploreFood', (req, res) => {
          let reqName = req.params.name;
          let pugSend = dataList[1][reqName];
          pugSend.Username = reqName;

          con.query(
              `SELECT food_names.FoodID, food_names.FoodDescription, nutrient_name.NutrientName, nutrient_amount.nutrientValue, nutrient_name.NutrientUnit, measure_name.MeasureDescription, conversion_factor.ConversionFactorValue
              FROM (nutrient_amount
              JOIN food_names ON food_names.FoodID = nutrient_amount.FoodID)
              JOIN nutrient_name ON nutrient_amount.nutrientID = nutrient_name.nutrientID
              JOIN conversion_factor ON conversion_factor.FoodID = food_names.FoodID
              LEFT JOIN measure_name ON measure_name.MeasureID = conversion_factor.MeasureID 
              WHERE nutrient_name.NutrientName IN 
              ('FAT (TOTAL LIPIDS)', 'PROTEIN', 'ENERGY (KILOCALORIES)', 'CARBOHYDRATE, TOTAL (BY DIFFERENCE)','FIBRE, TOTAL DIETARY','MOISTURE',
              'RETINOL', 'RETINOL ACTIVITY EQUIVALENTS','VITAMIN B-6','VITAMIN B-12','VITAMIN B12, ADDED','VITAMIN C','VITAMIN D (D2 + D3)','VITAMIN D (INTERNATIONAL UNITS)','VITAMIN D2, ERGOCALCIFEROL','ALPHA-TOCOPHEROL','ALPHA-TOCOPHEROL, ADDED','VITAMIN K','THIAMIN','RIBOFLAVIN','NIACIN (NICOTINIC ACID) PREFORMED','NATURALLY OCCURRING FOLATE','FOLIC ACID','PANTOTHENIC ACID','BIOTIN','CHOLINE, TOTAL',
              'CALCIUM','COPPER','IRON','MAGNESIUM','MANGANESE','PHOSPHORUS','POTASSIUM','SELENIUM','SODIUM','ZINC');`,
              function(err, result) {
                  if (err) throw err;
                  
                  let foodData = {};
                  
                  result.forEach(row => {
                      let FoodID = row.FoodID;
                      let FoodName = row.FoodDescription;
                      let FoodServingSize = row.MeasureDescription;
                      let NutrientConversionFactor = row.ConversionFactorValue;
                      let NutrientName = row.NutrientName;
                      let NutrientData = {
                          NutrientValue: row.nutrientValue,
                          NutrientUnit: row.NutrientUnit
                      };
                    
                      if (foodData[FoodID]) {
                         //if food data does not have any existing portions, add an object for portions
                          if (!foodData[FoodID].portions) {
                              foodData[FoodID].portions = {};
                          }
                          //The FoodServingSize for a portion is the nutrientConversionFactor
                          foodData[FoodID].portions[FoodServingSize] = NutrientConversionFactor;
                          foodData[FoodID][NutrientName] = NutrientData;
                      } else {
                          foodData[FoodID] = { FoodName };
                          foodData[FoodID].portions = { [FoodServingSize]: NutrientConversionFactor };
                          foodData[FoodID][NutrientName] = NutrientData;
                      }
                  });
                  
                  res.render('exploreFood', { userAccount:pugSend, title: 'Explore Food', foodList: foodData });
              }
          );
      });
      
      


     //retrieves the .pug file for browsing all images on the website
     app.get('/account/:name/addFood', (req,res)=>{
          let reqName = req.params.name;

          let pugSendUser = dataList[1][reqName];
          pugSendUser.Username = reqName;

          let pugSendArt = dataList[2];
          
          try{
               res.render('addFood.pug',{userAccount:pugSendUser, foodList:pugSendArt, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }     
     });  


     app.get('/account/:name/customFood',(req,res)=>{
          let reqName = req.params.name;

          let pugSendUser = dataList[1][reqName];
          pugSendUser.Username = reqName;

          let pugSendArt = dataList[2];
          
          try{
               res.render('customFood.pug',{userAccount:pugSendUser, foodList:pugSendArt, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }

     })


     //retrieves the .pug file for browsing all images on the website filtered by category
     app.get('/account/:name/addFood/category/:category', (req,res)=>{
          let reqName = req.params.name;
          let reqCategory = req.params.category;

          let pugSendUser = dataList[1][reqName];
          pugSendUser.Username = reqName;

          let pugSendArt = dataList[0];

          try{
               res.render('addFoodCategory.pug',{Title: "addFoodCategory", userAccount:pugSendUser, artList:pugSendArt, category:reqCategory, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }     
     });  

     //updates account status on server
     app.post('/account/:name/status',(req,res)=>{
          let reqObject = req.body;
          dataList[1][reqObject.Username].Status = reqObject.Status;
		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});


     // retrieves the list of users from the server to be used by the client-side javascript.
     app.get('/userlist',(req,res)=>{
          res.json(dataList[1]);
     });

     app.get('/foodlist',(req,res)=>{
          res.json(dataList[2]);
     });


});

app.listen(3000);
console.log("Server listening at http://localhost:3000");