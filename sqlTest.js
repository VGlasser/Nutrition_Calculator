var mysql = require('mysql');
var fs = require('fs');

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
    
    `SELECT food_names.FoodID, food_names.FoodDescription, nutrient_name.NutrientName, nutrient_amount.nutrientValue, nutrient_name.NutrientUnit, measure_name.MeasureDescription, ROUND(conversion_factor.ConversionFactorValue*100,2)
FROM (nutrient_amount
JOIN food_names ON food_names.FoodID = nutrient_amount.FoodID)
JOIN nutrient_name ON nutrient_amount.nutrientID = nutrient_name.nutrientID
LEFT JOIN conversion_factor ON conversion_factor.FoodID = food_names.FoodID
LEFT JOIN measure_name ON measure_name.MeasureID =  conversion_factor.MeasureID 
WHERE nutrient_name.NutrientName IN 
('FAT (TOTAL LIPIDS)', 'PROTEIN', 'ENERGY (KILOCALORIES)', 'CARBOHYDRATE, TOTAL (BY DIFFERENCE)','FIBRE, TOTAL DIETARY','MOISTURE'
'RETINOL', 'RETINOL ACTIVITY EQUIVALENTS','VITAMIN B-6','VITAMIN B-12','VITAMIN B12, ADDED','VITAMIN C','VITAMIN D (D2 + D3)','VITAMIN D (INTERNATIONAL UNITS)','VITAMIN D2, ERGOCALCIFEROL','ALPHA-TOCOPHEROL','ALPHA-TOCOPHEROL, ADDED','VITAMIN K','THIAMIN','RIBOFLAVIN','NIACIN (NICOTINIC ACID) PREFORMED','NATURALLY OCCURRING FOLATE','FOLIC ACID','PANTOTHENIC ACID','BIOTIN','CHOLINE, TOTAL',
'CALCIUM','COPPER','IRON','MAGNESIUM','MANGANESE','PHOSPHORUS','POTASSIUM','SELENIUM','SODIUM','ZINC');`
    
    , function (err, result, fields) {
    if (err) throw err;
    result.forEach(row=>{
      //ID of current food
      FoodID = row.FoodID;
      //name of current food
      FoodName = row.FoodDescription;
      //Serving size
      FoodServingSize = row.YieldDescription;
      //name of nutrient
      NutrientName = row.NutrientName;

      //nutrient information for food
      NutrientData = {
        NutrientValue: row.nutrientValue,
        NutrientUnit: row.NutrientUnit
      };

      if([FoodID] in foodData){
        foodData[FoodID][NutrientName]=NutrientData;
        foodData[FoodID].portions[FoodServingSize]=FoodServingSize;
      }
      else{
        foodData[FoodID]={FoodName,FoodServingSize};
        foodData[FoodID][NutrientName]=NutrientData;
      }
    });

    // console.log(foodData);

    fs.writeFile('./data/3_foodData.json', JSON.stringify(foodData, null, 2), function(err) {
      if (err) throw err;
      console.log('Data has been saved to 3_foodData.json');
    });

  });
});

