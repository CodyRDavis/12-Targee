const mysql = require ('mysql');
const inquirer = require ('inquirer');
var easytable = require('easy-table');

//outlining connection properties
const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Socorro!3401',
    database: 'targee'
});

//connects to the DB
con.connect(function(err){
    if (err) throw err;
    console.log("Connected: id =  " + con.threadId);

    mainMenu();
});

function mainMenu(){

    inquirer.prompt([
        {
          type: "list",
          name: "selection",
          message: `What would you like to do?`,
          choices: ["List Inventory",
                    "View Low Stock",
                    "Add Stock",
                    "Add NEW Product",
                    "Exit Program"]
        }
      ]).then((userInput => {
        switch (userInput.selection){
            case "List Inventory":
                listInventory();
                break;
            case "View Low Stock":
                console.log("View Low Stock");
                break;
            case "Add Stock":
                console.log("Add Stock");
                break;
            case "Add Stock":
                console.log("Add NEW Product");
                break;
            case "Exit Program":
                console.log("Quitting");
                con.end();
                break;
            default:
                console.log("Something Had gone wrong.");
        }
    }));
}

function listInventory(){
    console.clear();
    console.log();
    con.query("SELECT * FROM products", function(err, data){
        var t = new easytable;

        data.forEach(function(product) {
            t.cell('Product Id', product.id, easytable.number(0))
            t.cell('Product Name', product.product_name)
            t.cell('Department', product.department_name)
            t.cell('Price, USD', product.price, easytable.number(2))
            t.cell('Number in Stock', product.stock_quantity, easytable.number(0))
            t.newRow()
          })
           
        console.log(t.toString());
    mainMenu();
    });
    
}