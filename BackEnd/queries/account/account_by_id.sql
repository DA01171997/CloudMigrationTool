-- :name account_by_id :one
SELECT * FROM accounts
WHERE aID = :aID;