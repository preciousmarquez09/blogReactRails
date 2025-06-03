Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }, defaults: { format: :json }

  # Route for checking if user log in
  devise_scope :user do
    get "/users/check_auth", to: "users/sessions#check_auth"
  end

  resources :reading_lists
  resources :posts do
    resources :comments
  end
  get "/userPost/:id", to: "posts#userPost"
  get "/currentUser/:id", to: "posts#current_user_info"

  root to: "home#index"
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  get "home/show", to: "home#show"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
