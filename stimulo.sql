CREATE DATABASE stimulo;
USE stimulo;

CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(45) NOT NULL,
birthday DATE NOT NULL,
email VARCHAR(45) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
is_admin TINYINT NOT NULL,
avatar TEXT
);

CREATE TABLE file (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(45) NOT NULL,
user_id INT NOT NULL, 
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE package (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(45) NOT NULL,
user_id INT NOT NULL, 
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE file_has_package (
id INT AUTO_INCREMENT PRIMARY KEY,
package_id INT ,
file_id INT ,
FOREIGN KEY (file_id) REFERENCES file(id),
FOREIGN KEY (package_id) REFERENCES package(id)
);

SELECT * FROM user;

INSERT INTO user(name, birthday, email, password, is_admin)
VALUES ("admin", '2006-03-14', "obernardoquineper@gmail.com", "adminadmin", TRUE)