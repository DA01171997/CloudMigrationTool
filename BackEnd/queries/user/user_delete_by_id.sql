-- :name user_delete_by_id :affected
DELETE FROM users
WHERE uID = :uID;