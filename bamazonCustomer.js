//Require mysql and inquirer in order to access and manipulate database
var mysql = require("mysql")
require("console.table")
var inquirer = require("inquirer")

//Create connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  //Create a callback function called that will call when the connection is established
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    loadProducts();
  });

//Define the callback function so that it displays the inventory before invoking another function for UI
function loadProducts(){
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);
        getInput();
    })
}

//Define getinput function so that it enables the user to indicate what they would like by using inquirer088
function getInput() {
    
    inquirer.prompt([
        {
        type: "input",
        name: "id",
        message: "What is the ID of the item that you would you like to purchase?",
        },
        {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase?"
        }
    ])
    .then(function(value){
      var id = value.id;
      var quantity = value.quantity;
      console.log(id);
      console.log(quantity);
      //This thing right here. 
      //connection.query("UPDATE products SET stock_quantity = stock_quantity -" + quantity + "WHERE id = " + id )
    })
}

