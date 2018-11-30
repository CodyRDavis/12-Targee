# 12-Targee
simple terminal based store front

## Description:
a Node App designed to simulate navigating a CLI based store. Main screen prints the inventory and asks the user for input.
the input expected is the item number, and then is prompted for the number of that item they wish to purchase.

with those two pieces of data, a total is given.

there is some basic data validation.
* id provide is that of an item in the db
* quantity requested is over 1 (buying -1 of an item is not allowed)
* quantity requested does not exceed the store's stock.

## Requirements:
run npm install to automatically install necessary files, with the exception being node.js
>npm install
### required
* easy-table
* mysql
* inquirer

## Technology used:
* Node.js
* mySQL
* inquirer
* easy-table

## Screen-shots
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.08.51%20PM.png?raw=true)
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.09.01%20PM.png?raw=true)
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.09.20%20PM.png?raw=true)
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.09.30%20PM.png?raw=true)
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.09.42%20PM.png?raw=true)
![screenshot](https://github.com/CodyRDavis/12-Targee/blob/master/images/Screen%20Shot%202018-11-29%20at%206.09.53%20PM.png?raw=true)


## Breakdown:
#### Main Menu:
  all items in the database are printed in a table
  calls to get user input - id
  
#### user input: ID
  this screen asks for the user to enter Q or to give an ID number.
  if Q is provided the connection to the store is terminated.
  ID number is validated to ensure it exists in the database.
  if valid, makes a call to get user input -quantity.
  else returns to main menu.
  
### user input: quantity
  this screen propts the user for quantity, the number of the item they wish to purchase.
  validation is run on the quantity. APP rules out negative numbers and 0 quantities
  checks to make sure the store has enough stock to fill this request.
  if all checks pass, the ID and quantity are sent to a function that updates the DB.
  else returns to main menu.
### update the DB
  having been passed the ID and quantity, the app updates the quantity of stock appropriatly.
  the user is told their total. returns to main Menu.
