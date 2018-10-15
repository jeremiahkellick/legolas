json.partial! 'api/users/user', user: current_user
json.shares_of do
  json.set! @transaction.symbol, @shares_of
end
