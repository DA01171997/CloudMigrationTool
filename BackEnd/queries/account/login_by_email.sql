-- :name login_by_email :one
SELECT * FROM accounts
WHERE aEmail = :aEmail