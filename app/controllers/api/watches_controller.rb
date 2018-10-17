class Api::WatchesController < ApplicationController
  before_action :require_log_in

  def create
    @watch = current_user.watches.build(symbol: params[:symbol].upcase)
    if @watch.save
      render plain: "Watch created successfully"
    else
      render json: @watch.errors.full_messages, status: 422
    end
  end

  def destroy
    @watch = current_user.watches.find_by(symbol: params[:symbol].upcase)
    if @watch
      @watch.destroy
      render plain: "Watch destroyed successfully"
    else
      render(
        plain: "No watch for that stock was found on the current user",
        status: 404
      )
    end
  end
end
