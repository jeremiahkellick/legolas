json.current_user do
  json.charts @charts[:user_charts]
end

json.stocks @charts[:stocks]
