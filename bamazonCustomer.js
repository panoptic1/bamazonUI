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
            connection.query("SELECT stock_quantity FROM products WHERE id= ?",
            id, 
            function(err, res){
                if(err) throw err;

                if(quantity > res[0].stock_quantity){
                    console.log("Sorry! Our inventory is too low!");
                    console.log("Our current stock for that item is: " + res[0].stock_quantity)
                    } else {

                        connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?",
                            [
                                res[0].stock_quantity - quantity,
                                id
                            ],
                            function(err){
                                if(err) throw err;

                                console.log("Your order has been placed!");
                                showPrice(id, quantity);
                            }
                        )
                    }
                }
            )
        })
    })
}

function showPrice(item, quantity){
    connection.query("SELECT product_name, price FROM products WHERE id= ?",
        [item],
    function(err, res){
        var price = quantity * res[0].price
        if(err) throw err;
        console.log("The total cost for your order of " + quantity + " " + res[0].product_name + "s is $" + price);
        }
    )
}
