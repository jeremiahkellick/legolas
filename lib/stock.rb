class Stock
  def self.price(symbol)
    url = "https://api.iextrading.com/1.0/stock/#{symbol.downcase}/price"
    res = HTTParty.get(url).parsed_response
    return "Unknown stock symbol '#{symbol}'" unless res.is_a?(Numeric)
    Money.from_amount(res)
  end

  def self.info(symbol)
    symbol = symbol.upcase
    lwrSymbol = symbol.downcase
    stock = { symbol: symbol }
    minURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/1d"
    min = HTTParty.get(minURL).parsed_response
    return nil if min == "Unknown symbol"
    stock[:price_cents] = (min.first["close"].to_f * 100).round
    stock["1D"] = extract_times(min, 5)
    dailyURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/5y"
    daily = HTTParty.get(dailyURL).parsed_response
    return nil if daily == "Unknown symbol"
    stock["1M"] = extract_days(daily, 1, 30)
    stock["3M"] = extract_days(daily, 1, 90)
    stock["1Y"] = extract_days(daily, 1, 365)
    stock["5Y"] = extract_days(daily, 7)
    stock
  end

  private

  def self.extract_times(time_series, divisor = 1)
    points = []
    time_series.each_with_index do |data, i|
      next unless i % divisor == 0
      close = data["close"] || data["marketOpen"]
      points << {
        price_cents: (close.to_f * 100).round,
        time: parse_datetime(data)
      }
    end
    points
  end

  def self.extract_days(day_series, divisor, days = nil)
    points = []
    first = true
    first_day = nil
    day_series.reverse_each.with_index do |data, i|
      date = parse_date(data["date"])
      if first
        first_day = date
        first = false
      end
      day_count = first_day - date
      next unless day_count % divisor == 0
      points.unshift({
        price_cents: (data["open"].to_f * 100).round,
        date: date
      })
      break if days && day_count >= days
    end
    points
  end

  def self.parse_datetime(data)
    args = [data["date"][0..3], data["date"][4..5], data["date"][6..7]]
    args += data["minute"].split(":")
    args << "00"
    args << "-04:00"
    Time.new(*args)
  end

  def self.parse_date(date)
    Date.new(*date.split("-").map(&:to_i))
  end
end
