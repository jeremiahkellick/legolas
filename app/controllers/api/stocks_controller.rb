class Api::StocksController < ApplicationController
  def show
    symbol = params[:symbol].upcase
    stock = Stock.info(symbol)
    if stock
      render json: stock
    else
      render plain: "Stock not found", status: 404
    end
  end
end
