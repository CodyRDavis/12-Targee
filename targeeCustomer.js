const mysql = require ('mysql');
const inquirer = require ('inquirer');

const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Socorro!3401',
    database: 'targee'
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected: id =  " + con.threadId);
    displayInventory();
});

function displayInventory(){

    con.query("SELECT * FROM products", function(err, data){
        for(let i = 0; i<data.length; i++){
            let item = data[i];
            console.log(item.id, item.product_name, item.price, item.stock_quantity);
        }
        userInputId();
    });
};

//doesnt do anything but allow the user to see the console before going to the main menu again.
//intended to wait for user to hit enter
function backToMain(){

    inquirer.prompt([{
        name: 'enter',
        type: 'input',
        message: 'Press ENTER to return to main menu'
    }]).then((userInput => {
        //calls main menu drawing function.
        displayInventory();
    }));
};

//gets the users users ID and goes to next step of input
function userInputId(){

    inquirer.prompt([{
            name: 'id',
            type: 'input',
            message: 'enter Item ID or Q to quit: ',
        }]).then((userInput) => {
            if (userInput.id === 'q' || userInput.id === 'Q'){
                con.end();
            }
            else{
                con.query("SELECT * FROM products WHERE id = ?",[userInput.id], function(err, data){
                    if (err) throw err;
                    if(data.length === 0){
                        console.log("Item number not found.");
                        backToMain();
                    }
                    else{
                        userInputQuantity(userInput.id);
                    }
                });
            }
        });    
};

//gets quantity of item intended to be purchased
function userInputQuantity(id){
    inquirer.prompt([{
        name: 'quantity',
        type: 'input',
        message: 'quantity desired: '
    }]).then((userInput => {
        if(userInput.quantity <= 0){
            console.log("You must purchase at least a quantity of 1");
            backToMain();   
        }
        else{
            buyItem(id, userInput.quantity);    
        }
        
    }));
};

//runs when a user wants to purchase an item.
//intended to do some screening and make sure the item number and quantity are good
function buyItem(id, desiredNumber){
    console.log("Inside buyItem: ", id, desiredNumber);
    con.query("SELECT * from products WHERE id= ?", [id], function(err, data){
        let stock = parseInt(data[0].stock_quantity);
        let quantity = parseInt(desiredNumber);
        if (quantity <= 0){
            console.log ("You can not buy less than 1 of an item.")
        }
        else if (quantity > stock){
            console.log("Insificiant quantity in stock. Please select a different ammount");
        }
        else{
            let totalPrice = quantity * parseFloat(data[0].price);
            console.log ("Total for purchase: $" + totalPrice);

            //runs function to update db.
            updateStock(id, (stock-quantity));
        }

        //lets the user look at their total spent before returning to main menu
        backToMain();
    });

};

//runs to update the stock of an item...when item(s) are purchased.
function updateStock(id, quantity){

    let sql = "UPDATE products SET stock_quantity = ? WHERE id = ?";
    con.query(sql,[quantity, id],function(err, result){
        if (err) throw err;
    });
}