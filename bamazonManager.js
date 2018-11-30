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
                listInventory(1);
                break;
            case "View Low Stock":
                viewLowStock();
                break;
            case "Add Stock":
                addStock();
                break;
            case "Add NEW Product":
                newProduct();
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

function listInventory(screen){
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

        if (screen == 1){
            mainMenu();
        }
    });
}

function viewLowStock(){
    console.clear();
    console.log();
    con.query("SELECT * FROM products WHERE stock_quantity <10", function(err, data){
        if (err) throw err;
        
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

        if (data.length === 0){
            console.log("No Stock items are currently low.");
        }
    mainMenu();
    });
}

function addStock(){
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter ID of Item to update: "
        },{
            type: "input",
            name: "quantity",
            message: "Add quantity to stock: "
        }
    ]).then((input) =>{
        let updatedQty = 0
        con.query("SELECT stock_quantity FROM products WHERE ?", {id: input.id}, function(err, data){
            if(err) throw err;
            updatedQty = parseInt(data[0].stock_quantity) + parseInt(input.quantity);
            console.log(parseInt(data[0].stock_quantity), input.quantity, updatedQty);
        });
        con.query("UPDATE products SET stock_quantity = ? WHERE ?",[updatedQty,{id: input.id}], function(err,res){
            if (err) throw err;
            console.log (updatedQty);
            mainMenu();
        });
    }); 
}

function newProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Product Name: "
        },{
            type: "input",
            name: "department",
            message: "Item Department: ",

        },{
            type: "input",
            name: "price",
            message: "Price: "
        },{
            type: "input",
            name: "quantity",
            message: "Quantity"
        }
    ]).then((input) => {
        con.query("INSERT INTO products (product_name, department_name, price, stock_quantity)VALUE(?,?,?,?)",
        [input.name, input.department, input.price, input.quantity], 
        function(err, data){
            if (err) throw err;
            mainMenu();
        });
    });
}