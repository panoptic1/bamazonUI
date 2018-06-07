CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR (100),
    department_name VARCHAR (100),
    price INTEGER,
    stock_quantity INTEGER,
);