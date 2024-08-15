const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static("public"));
app.use(express.json());

app.set('view engine','pug');

var SQLConnection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "student",
     database: "test"
});
   
fs.readdir("./data", function(err, files){
     
     //creates object to access stored data
     let dataObject = {};
     for(let i = 0; i < files.length; i++) {
         let fileName = files[i];
         let data = require("./data/" + fileName);
         dataObject[fileName] = data;
     }     
     console.log(dataObject);

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
		dataObject['userList.json'][key] = value;

          let userListFP = "./data/userList.json";
          let userListData = fs.readFileSync(userListFP, 'utf-8');
          let userListObject = JSON.parse(userListData);
          userListObject[key] = value;


          let updatedJsonData = JSON.stringify(userListObject, null, 2);

          fs.writeFileSync(userListFP, updatedJsonData, 'utf-8');


		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});

     app.post('/food',(req,res)=>{
          let reqObject = req.body;
          let key = reqObject.data.Name;
          let value = reqObject.data;
          delete value["Name"]
		dataObject['foodList.json'][key] = value;

          console.log("Key: ",key);
          console.log("Value: ", value);


          let foodListFP = "./data/foodList.json";
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
          let userAccount = dataObject['userList.json'][reqName];
          userAccount.Username = reqName;
          try{
               res.render('AccountPage.pug',{Title: "AccountPage", userAccount:userAccount, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }
     });

     app.get('/account/:name/exploreFood', (req, res) => {
          let reqName = req.params.name;
          let userAccount = dataObject['userList.json'][reqName];  
          let pageNumber =  parseInt(req.query.page) || 1;
          let searchWord = req.query.search !== 'undefined' ? req.query.search : '';
          userAccount.Username = reqName;

          let itemsPerPage = userAccount.FoodsPerPage || 10;
          let offset = (pageNumber - 1) * itemsPerPage;

          SQLConnection.query(
               `
                    WITH FilteredValues AS (
                         SELECT DISTINCT FoodDescription
                         FROM food_nutrient_data
                         WHERE FoodDescription LIKE ?
                         ORDER BY FoodDescription
                         LIMIT ? OFFSET ?
                    )
                    SELECT *
                    FROM food_nutrient_data
                    WHERE FoodDescription IN (SELECT FoodDescription FROM FilteredValues)
                    ORDER BY FoodDescription;
               `,
               [`%${searchWord}%`,itemsPerPage, offset],
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
                  res.render('exploreFood', { userAccount:userAccount, searchWord:searchWord, pageNumber:pageNumber, title: 'Explore Food', foodList: foodData });
              }
          );
      });
      
      //retrieves the .pug file containing all important information on a specific food and allows users to add to their daily consumption
      app.get('/account/:name/foodInfo', (req, res) => {
          let reqName = req.params.name;
          let userAccount = dataObject['userList.json'][reqName];
          userAccount.Username = reqName;

          SQLConnection.query(
               `
                    WITH FilteredValues AS (
                         SELECT DISTINCT FoodDescription
                         FROM food_nutrient_data
                         ORDER BY FoodDescription
                    )
                    SELECT *
                    FROM food_nutrient_data
                    WHERE FoodDescription IN (SELECT FoodDescription FROM FilteredValues)
                    ORDER BY FoodDescription;
               `,
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
                    res.render('foodInfo.pug', { userAccount:userAccount, title: 'Food Info', foodList: foodData});
               }
          );
     });
      


     //retrieves the .pug file for browsing all user-made recipies on the website
     app.get('/account/:name/addFood', (req,res)=>{
          let reqName = req.params.name;

          let userAccount = dataObject['userList.json'][reqName];
          userAccount.Username = reqName;

          let foodList = dataObject['foodList.json'];
          
          try{
               res.render('addFood.pug',{userAccount:userAccount, foodList:foodList, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }     
     });  


     app.get('/account/:name/customFood',(req,res)=>{
          let reqName = req.params.name;

          let userAccount = dataObject['userList.json'][reqName];
          userAccount.Username = reqName;

          let foodList = dataObject['foodList.json'];
          
          try{
               res.render('customFood.pug',{userAccount:userAccount, foodList:foodList, root: __dirname});
          }
          catch(error){
               console.error('Error rendering template:', error);
               res.status(500).send('Internal Server Error');
          }

     })

     //updates account status on server
     app.post('/account/:name/status',(req,res)=>{
          let reqObject = req.body;
          dataObject['userList.json'][reqObject.Username].Status = reqObject.Status;
		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});


     // retrieves the list of users from the server to be used by the client-side javascript.
     app.get('/userlist',(req,res)=>{
          res.json(dataObject['userList.json']);
     });

     app.get('/foodlist',(req,res)=>{
          res.json(dataObject['foodList.json']);
     });


});

app.listen(3000);
console.log("Server listening at http://localhost:3000");