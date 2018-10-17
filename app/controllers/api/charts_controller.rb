class Api::ChartsController < ApplicationController
  def day
    @charts = current_user.day_charts
    @shares_of = current_user.shares_hash
    render 'api/sessions/charts'
  end

  def five_years
    @charts = current_user.five_years_charts
    render 'api/sessions/charts'
  end
end
