const mysql = require ('mysql');

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
    console.log("Attempting to display Inventory...");
    con.query("SELECT * from products", function(err, data){
        for(let i = 0; i<data.length; i++){
            let item = data[i];
            console.log(item.id, item.product_name, item.price, item.stock_quantity);
        }
    });
}