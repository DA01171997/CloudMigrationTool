-- :name user_update_password :affected
UPDATE users
SET uPassword = :uPassword
WHERE uUsername = :uUsername;