-- :name create_user :insert
INSERT INTO users(uName, uEmail, uPassword)
VALUES(:uName, :uEmail, :uPassword)