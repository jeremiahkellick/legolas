Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :transactions, only: [:create]
    get '/stocks/:symbol', to: 'stocks#show'
    get '/stocks/:symbol/week', to: 'stocks#week'
    resources :news, only: :index
    resources :watches, only: :create
    delete '/watches/:symbol', to: 'watches#destroy'
    get '/charts/day', to: 'charts#day'
    get '/charts/five_years', to: 'charts#five_years'
    get '/charts/week', to: 'charts#week'
  end
end
