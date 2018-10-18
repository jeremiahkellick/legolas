class Api::SessionsController < ApplicationController
  before_action :require_log_in, only: :charts

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      log_in(@user)
    else
      render plain: "Incorrect email or password", status: 401
    end
  end

  def destroy
    if logged_in?
      log_out
      render plain: "Logged out successfully"
    else
      render(
        plain: "You must be logged in to log out. Please log in to log out.",
        status: 401
      )
    end
  end
end
