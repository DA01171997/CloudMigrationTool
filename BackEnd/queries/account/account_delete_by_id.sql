-- :name account_delete_by_id :affected
DELETE FROM accounts
WHERE aID = :aID;