Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    get '/charts', to: 'sessions#charts'
    resources :transactions, only: [:create]
    get '/stocks/:symbol', to: 'stocks#show'
    resources :news, only: :index
  end
end
