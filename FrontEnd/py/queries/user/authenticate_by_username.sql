-- :name authenticate_by_username :one
SELECT * FROM users
WHERE uEmail = :uEmail