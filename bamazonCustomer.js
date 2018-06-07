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
    console.log("Welcome to the Bamazon User Interface powered by Node");
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
    
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        inquirer.prompt([
            {
                name: "id",
                message: "Please indicate the id of the product you would like to purchase...",
                type: "input",
                //validate that a number is entered
                validate: function(value) {
                
                    return /^[0-9]+$/.test(value);
                }
            },
            {
                name: "quantity",
                message: "How many units would you like?",
                type: "input",
                validate: function(value) {
                
                    return /^[0-9]+$/.test(value);
                }
            },
        ]).then(function(answers){
            var id = answers.id
            var quantity= answers.quantity
            console.log ("You want " + quantity + " of item number " + id);
            //runOrder(id, quantity);
        })
    })
}

//create a function that takes user input and checks the supply of the database
function runOrder(id, quantity){
    //locate the item in the database
    
    //if the item does not exist, alert the user and ask them to try again
    
    //if the stock_quantity of the requested item is less than the amount requested
        //alert the user "Sorry! Our inventory for this item is too low to complete your order."
        //loadProducts();
    
    //else 
        //1. decrement the requested amount from the database
        //2. Inform the user that their order has been filled and what the final price is.
}

