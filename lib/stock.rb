class Stock
  def self.price(symbol)
    url = "https://api.iextrading.com/1.0/stock/#{symbol.downcase}/price"
    res = HTTParty.get(url).parsed_response
    return "Unknown stock symbol '#{symbol}'" unless res.is_a?(Numeric)
    Money.from_amount(res)
  end

  def self.info(symbol)
    symbol = symbol.upcase
    stock = { symbol: symbol };
    fiveMinURL = "https://www.alphavantage.co/query" +
      "?function=TIME_SERIES_INTRADAY&symbol=#{symbol}&interval=5min" +
      "&apikey=#{ENV["API_KEY"]}&outputsize=full"
    res = HTTParty.get(fiveMinURL).parsed_response
    return nil if res.key?("Error Message")
    fiveMin = res["Time Series (5min)"]
    stock[:price_cents] = (fiveMin.first.last["4. close"].to_f * 100).round
    stock["1D"] = extract_times(fiveMin, 1, 1)
    stock["1W"] = extract_times(fiveMin, 5, 2)
    dailyURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY" +
      "&symbol=#{symbol}&outputsize=full&apikey=#{ENV["API_KEY"]}"
    res = HTTParty.get(dailyURL).parsed_response
    return nil if res.key?("Error Message")
    daily = res["Time Series (Daily)"]
    stock["1M"] = extract_days(daily, 31, 1)
    stock["3M"] = extract_days(daily, 91, 1)
    stock["1Y"] = extract_days(daily, 365, 1)
    stock["5Y"] = extract_days(daily, 1_826, 7)
    stock
  end

  private

  def self.extract_times(time_series, days, divisor)
    points = []
    day_changes = -1
    day = nil
    time_series.each.with_index do |(datetime, data), i|
      next unless (i + 1) % divisor == 0
      datetime = parse_datetime(datetime) - 5.minutes
      day_changes += 1 if day != datetime.day
      break if day_changes >= days
      day = datetime.day
      points << {
        price_cents: (data["1. open"].to_f * 100).round,
        time: datetime
      }
    end
    points
  end

  def self.extract_days(day_series, days, divisor)
    points = []
    first = true
    first_day = nil
    day_series.each.with_index do |(date, data), i|
      next unless i % divisor == 0
      date = parse_date(date)
      if first
        first_day = date
        first = false
      end
      points << {
        price_cents: (data["4. close"].to_f * 100).round,
        date: date
      }
      break if first_day - date >= days
    end
    points
  end

  def self.parse_datetime(datetime)
    Time.new(*datetime.split(/[- :]/).push("-04:00"))
  end

  def self.parse_date(date)
    Date.new(*date.split("-").map(&:to_i))
  end
end
