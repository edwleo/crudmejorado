CREATE DATABASE crudnode;
USE crudnode;

/*
CREATE TABLE vehiculos
(
	id			INT AUTO_INCREMENT PRIMARY KEY,
    tipo 		VARCHAR(40) 		NOT NULL,
    marca 		ENUM('Kia','Toyota','Nissan','Hyundai','Javal') NOT NULL,
	color 		VARCHAR(40) 		NOT NULL
)ENGINE = INNODB;
*/

CREATE TABLE marcas
(
	id 			INT AUTO_INCREMENT PRIMARY KEY,
    marca 		VARCHAR(40) 		NOT NULL
)ENGINE = INNODB;

CREATE TABLE vehiculos
(
	id			INT AUTO_INCREMENT PRIMARY KEY,
    tipo 		VARCHAR(40) 		NOT NULL,
    idmarca 	INT 				NOT NULL,
	color 		VARCHAR(40) 		NOT NULL,
    CONSTRAINT fk_idmarca_veh FOREIGN KEY (idmarca) REFERENCES marcas (id)
)ENGINE = INNODB;

INSERT INTO marcas (marca) VALUES 
	(''),
    (''),
    (''),
    (''),
    (''),
    ('');

INSERT INTO vehiculos (tipo, marca, color) VALUES
	('Hatchback', 'Kia', 'Blanco'),
    ('Camioneta','Javal','Negro');