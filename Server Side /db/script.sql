
-- Run this script
CREATE TABLE users (
  u_id int IDENTITY(1,1) PRIMARY KEY,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  contact_number varchar(15) NOT NULL,
  email varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  role varchar(10) NOT NULL
) 

CREATE TABLE advertistments (
        id int IDENTITY(1,1) PRIMARY KEY,
        title varchar(255) NOT NULL,
        price int null,
        condition varchar(255) NULL,
        transmission varchar(100) NULL,
        model varchar(20) NULL,
        brand varchar(20) NULL,
        colour varchar(20) NULL,
        year varchar(20) NULL,
        fuel varchar(20) NULL,
        miles int null,
        description varchar(255) NULL,
        region varchar(100) NULL,
        city varchar(20) NULL,
        address varchar(255) NULL,
        name varchar(100) NULL,
        contact varchar(11) NULL,
        uid int not null,
        approved int DEFAULT 0,
        rejected int DEFAULT 0
) 

CREATE TABLE advertistmentImages (
        id int IDENTITY(1,1) PRIMARY KEY,
        adId int not null,
        path varchar(255) NOT NULL,
) 

CREATE TABLE brands (
        id int IDENTITY(1,1) PRIMARY KEY,
        name varchar(255) NOT NULL,
) 
-- 
-- AUTO_INCREMENT = IDENTITY(1, 1)