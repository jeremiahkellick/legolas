Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, as: nil, defaults: { format: :json } do
    devise_for :users, controllers: {
      sessions: 'api/users/sessions',
      registrations: 'api/users/registrations'
    }
  end
end
