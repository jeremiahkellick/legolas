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
    iexDayURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/1d"
    iexDay = HTTParty.get(iexDayURL).parsed_response
    return nil if iexDay == "Unknown symbol"
    stock[:price_cents] = (iexDay.first["close"].to_f * 100).round
    fiveYearURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/5y"
    iexFiveYear = HTTParty.get(fiveYearURL).parsed_response
    return nil if iexFiveYear == "Unknown symbol"
    stock.merge!(charts(iexDay, iexFiveYear))
    iexCompanyURL = "https://api.iextrading.com/1.0/stock/#{symbol}/company"
    iexCompany = HTTParty.get(iexCompanyURL).parsed_response
    unless iexCompany == "Unknown symbol"
      stock.merge!(iexCompany.slice("companyName", "description"))
    end
    stock
  end

  private

  def self.charts(iexDay, iexFiveYear)
    {
      "1D" => extract_times(iexDay, 5),
      "1M" => extract_days(iexFiveYear, 1, 30),
      "3M" => extract_days(iexFiveYear, 1, 90),
      "1Y" => extract_days(iexFiveYear, 1, 365),
      "5Y" => extract_days(iexFiveYear, 7)
    }
  end

  def self.extract_times(time_series, divisor = 1)
    points = []
    time_series.each_with_index do |data, i|
      next unless i % divisor == 0
      close = data["close"] || data["marketClose"] || nil
      next if close.nil?
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
