DROP DATABASE IF EXISTS targee;
CREATE DATABASE targee;
USE targee;

CREATE TABLE targee(
	id INTEGER(11) AUTO_INCREMENT,
    product_name VARCHAR (100),
    department_name VARCHAR(50),
    price DOUBLE (6, 2),
    stock_quantity INTEGER (10),
    PRIMARY KEY (id)
);

INSERT INTO targee(product_name, department_name, price, stock_quantity)
	VALUE("Nintendo Switch", "electronics", 299.99, 100),
		("Pokemon: Let's go Pikachu", "video games", 59.99, 100),
        ("Pokemon: Let's go Eevee", "video games", 59.99, 100),
        ("Xbox One S", "electronics", 199.99, 100),
        ("PS4 slim", "electronics", 199.99, 100),
        ("Marvel's Spider-Man", "video games", 59.99, 100),
        ("God of War", "video games", 59.99, 100),
        ("Guacamelee 2", "video games", 29.99, 100),
        ("Super Smash Brothers: Ultimate", "video games", 59.99, 100),
        ("Super Mario: Odyssey", "video games", 49.99, 100);
