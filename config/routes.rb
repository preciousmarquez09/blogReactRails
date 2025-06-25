Rails.application.routes.draw do

  get 'users/follow'
  get 'users/unfollow'
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
    resource :like, only: [:create, :destroy]
  end

  post "following/:id", to: "follow#following"
  delete "decline/:id", to: "follow#decline"
  delete "remove/:id", to: "follow#remove"
  post "unfollow/:id", to: "follow#unfollow"
  post "accept/:id",     to: "follow#accept"
  

  get "/userPost/:id", to: "posts#userPost"
  get "/currentUser/:id", to: "posts#current_user_info"
  get "showNotification", to: "notification#index"
  get "showFriendRequest", to: "notification#friendRequest"
  get "counter", to: "notification#counter"
  patch "/notifications/:id/read", to: "notification#mark_as_read"

  root to: "home#index"
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  get "home/show", to: "home#show"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
