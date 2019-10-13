-- :name user_by_username :one
SELECT userID, uName, userUsername, uEmail FROM users
WHERE uUsername = :username;
