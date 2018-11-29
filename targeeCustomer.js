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
});