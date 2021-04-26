
-- Run this script
CREATE TABLE users (
  u_id int IDENTITY(1,1) PRIMARY KEY,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  contact_number varchar(15) NOT NULL,
  email varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  role varchar(10) NOT NULL,
  is_deleted int DEFAULT 0
) 

c

CREATE TABLE advertistmentImages (
        id int IDENTITY(1,1) PRIMARY KEY,
        adId int not null,
        path varchar(255) NOT NULL,
) 

CREATE TABLE brands (
        id int IDENTITY(1,1) PRIMARY KEY,
        name varchar(255) NOT NULL,
) 

CREATE TABLE comments (
        id int IDENTITY(1,1) PRIMARY KEY,
        commentedby int not null,
        postId int not null,
        message varchar(255) NOT NULL,
) 

CREATE TABLE ratings (
        id int IDENTITY(1,1) PRIMARY KEY,
        postId int not null,
        reviewedUserId int not null,
        rate int null,
        description varchar(255) NULL,
) 
--
