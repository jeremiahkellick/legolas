class Stock
  def self.price(symbol)
    url = "https://api.iextrading.com/1.0/stock/#{symbol.downcase}/price"
    res = HTTParty.get(url).parsed_response
    return nil unless res.is_a?(Numeric)
    Money.from_amount(res)
  end

  def self.info(symbol)
    symbol = symbol.upcase
    lwrSymbol = symbol.downcase
    stock = {}
    stock.merge!(charts(symbol))
    iexCompanyURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/company"
    iexCompany = HTTParty.get(iexCompanyURL).parsed_response
    unless iexCompany == "Unknown symbol"
      stock.merge!(iexCompany.slice("companyName", "description"))
    end
    stock
  end

  def self.charts(symbol, key_by_time: false, clear_zeroes: true)
    symbol = symbol.upcase
    lwrSymbol = symbol.downcase
    stock = { symbol: symbol }
    iexDayURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/1d"
    before = Time.now
    iexDay = HTTParty.get(iexDayURL).parsed_response
    $api_calls_time += Time.now - before
    return nil if iexDay == "Unknown symbol"
    fiveYearURL = "https://api.iextrading.com/1.0/stock/#{lwrSymbol}/chart/5y"
    before = Time.now
    iexFiveYear = HTTParty.get(fiveYearURL).parsed_response
    $api_calls_time += Time.now - before
    return nil if iexFiveYear == "Unknown symbol"
    stock.merge!(charts_from_iex_data(
      iexDay,
      iexFiveYear,
      key_by_time: key_by_time,
      clear_zeroes: clear_zeroes
    ))
  end

  private

  def self.charts_from_iex_data(
    iexDay,
    iexFiveYear,
    key_by_time: false,
    clear_zeroes: true
  )
    close = iexDay.last["close"] || iexDay.last["marketClose"]
    {
      price_cents: (close.to_f * 100).round,
      "1D" => extract_times(
        iexDay,
        divisor: 5,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      ),
      "1W" => extract_days(
        iexFiveYear,
        1,
        5,
        by_count: true,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      ),
      "1M" => extract_days(
        iexFiveYear,
        1,
        30,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      ),
      "3M" => extract_days(
        iexFiveYear,
        1,
        90,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      ),
      "1Y" => extract_days(
        iexFiveYear,
        1,
        365,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      ),
      "5Y" => extract_days(
        iexFiveYear,
        7,
        1_826,
        key_by_time: key_by_time,
        clear_zeroes: clear_zeroes
      )
    }
  end

  def self.extract_times(
    time_series,
    divisor: 1,
    key_by_time: false,
    clear_zeroes: true
  )
    points = []
    points = {} if key_by_time
    time_series.each_with_index do |data, i|
      next unless i % divisor == 0
      close = data["close"] || data["marketClose"] || nil
      next if clear_zeroes && close.nil?
      time = parse_datetime(data).to_i * 1000
      price = (close.to_f * 100).round
      next if clear_zeroes && price.zero?
      if key_by_time
        points[time] = { price_cents: price, time: time }
      else
        points << { price_cents: price, time: time }
      end
    end
    d = Time.now.getlocal("-04:00")
    d = d.yesterday if ([d.hour, d.min] <=> [9, 30]) == -1
    min = Time.new(d.year, d.month, d.day, 9, 30, 0, "-04:00")
    max = Time.new(d.year, d.month, d.day, 15, 55, 0, "-04:00")
    { min: min.to_i * 1000, max: max.to_i * 1000, points: points }
  end

  def self.extract_days(
    day_series,
    divisor,
    days,
    by_count: false,
    key_by_time: false,
    clear_zeroes: true
  )
    points = []
    points = {} if key_by_time
    first = true
    first_day = nil
    min = days.days.ago
    day_series.reverse_each.with_index do |data, i|
      date = parse_date(data["date"])
      if first
        first_day = date
        first = false
      end
      day_count = ((first_day - date) / 86400).round
      day_count = i + 1 if by_count
      next unless day_count % divisor == 0
      time = date.to_i * 1000
      price = (data["close"].to_f * 100).round
      unless clear_zeroes && price == 0
        if key_by_time
          points[time] = { price_cents: price, time: time }
        else
          points.unshift({ price_cents: price, time: time })
        end
      end
      if day_count >= days
        min = date
        break
      end
    end
    { max: first_day.to_i * 1000, min: min.to_i * 1000, points: points }
  end

  def self.parse_datetime(data)
    args = [data["date"][0..3], data["date"][4..5], data["date"][6..7]]
    args += data["minute"].split(":")
    args << "00"
    args << "-04:00"
    Time.new(*args)
  end

  def self.parse_date(date)
    Time.new(*date.split("-").map(&:to_i), 16, 0, 0, "-04:00")
  end
end
