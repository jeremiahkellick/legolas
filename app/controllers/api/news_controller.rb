class Api::NewsController < ApplicationController
  def index
    render json: HTTParty.get(
      "http://newsapi.org/v2/everything?apiKey=#{ENV["NEWS_API_KEY"]}" +
      "&q=#{CGI.escape(params[:q])}&language=en&pageSize=30" +
      "&sources=bloomberg,business-insider,cnbc,cnn,fortune,reuters," +
      "the-new-york-times,the-wall-street-journal"
    ).parsed_response["articles"].uniq { |article| article["title"] }
  end
end
