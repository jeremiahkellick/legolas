json.current_user do
  json.charts @charts[:user_charts]
  json.shares_of @shares_of
end

json.stocks @charts[:stocks]
