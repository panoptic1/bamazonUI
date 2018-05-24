var mysql = require("mysql")
require("console.table")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    loadProducts();
  });
  
function loadProducts(){
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.table(result);
        getInput();
    })
}

function getInput() {
    
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What is the ID of the item that you would you like to purchase?",
    }])
    .then(function(value){
        console.log("This is the user's value.", value)
    })
}

