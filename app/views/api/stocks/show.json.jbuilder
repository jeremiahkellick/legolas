json.stock do
  json.merge! @stock
end

json.current_user do
  json.shares_of do
    json.set! @stock[:symbol], @shares_of
  end
end
