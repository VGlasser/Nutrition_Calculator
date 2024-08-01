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
		dataObject['1_userList.json'][key] = value;

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
		dataObject['2_foodList.json'][key] = value;

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
          let userAccount = dataObject['1_userList.json'][reqName];
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
          let userAccount = dataObject['1_userList.json'][reqName];  
          let pageNumber =  parseInt(req.query.pageNumber) || 1;
          let searchWord = req.query.search !== 'undefined' ? req.query.search : '';
          console.log(req.query);
          userAccount.Username = reqName;

          let itemsPerPage = userAccount.FoodsPerPage || 10;
          let offset = (pageNumber - 1) * itemsPerPage;

          console.log('req.query.search:',req.query.search);
          console.log('Search Word:', searchWord); 
          console.log('Page Number:', pageNumber); 
          console.log('itemsPerPage', itemsPerPage);

          SQLConnection.query(
               //I need to filter items first, then pick 10 or more for the page
               `
               SELECT * 
               FROM food_nutrient_data
               WHERE food_nutrient_data.FoodDescription LIKE ? 
               `,
               [`%${searchWord}%`],
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
      
      


     //retrieves the .pug file for browsing all user-made recipies on the website
     app.get('/account/:name/addFood', (req,res)=>{
          let reqName = req.params.name;

          let userAccount = dataObject['1_userList.json'][reqName];
          userAccount.Username = reqName;

          let foodList = dataObject['2_foodList.json'];
          
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

          let userAccount = dataObject['1_userList.json'][reqName];
          userAccount.Username = reqName;

          let foodList = dataObject['2_foodList.json'];
          
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
          dataObject['1_userList.json'][reqObject.Username].Status = reqObject.Status;
		res.set('Content-Type', 'text/plain')
		res.status(200).send();
	});


     // retrieves the list of users from the server to be used by the client-side javascript.
     app.get('/userlist',(req,res)=>{
          res.json(dataObject['1_userList.json']);
     });

     app.get('/foodlist',(req,res)=>{
          res.json(dataObject['2_foodList.json']);
     });


});

app.listen(3000);
console.log("Server listening at http://localhost:3000");