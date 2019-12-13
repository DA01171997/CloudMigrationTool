use cloud_db;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    uID INT AUTO_INCREMENT,
    uName VARCHAR(255),
    uEmail VARCHAR(255),
    uPassword VARCHAR(255),
    UNIQUE(uEmail),
    PRIMARY KEY(uID)
);