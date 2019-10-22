-- :name create_account :insert
INSERT INTO accounts(aName, aEmail, aPassword)
VALUES(:aName, :aEmail, :aPassword)