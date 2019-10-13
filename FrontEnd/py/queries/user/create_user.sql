-- :name create_user :insert
INSERT INTO users(uName, uUsername, uEmail, uPassword)
VALUES(:uName, :uUsername, :uEmail, :uPassword)