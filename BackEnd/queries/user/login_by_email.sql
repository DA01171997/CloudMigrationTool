-- :name login_by_email :one
SELECT * FROM users
WHERE uEmail = :uEmail