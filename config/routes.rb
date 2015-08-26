Rails.application.routes.draw do

  root 'events#index'

  devise_for :users
  resources :events, :only => [:index]

  namespace :api do
    namespace :v1 do
      resources :events, :only => [:index]
    end
  end

end
