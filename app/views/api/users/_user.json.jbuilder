json.extract!(
  user,
  :id,
  :email,
  :first_name,
  :last_name,
  :balance_cents,
  :watched_stocks
)

json.shares_of user.shares_hash
