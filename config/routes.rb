Rails.application.routes.draw do

  root 'events#index'

  devise_for :users, :controllers => { registrations: 'users/registrations' }
   
  resources :events, :only => [:index]

  namespace :api do
    namespace :v1 do
      resources :events, :only => [:index]
      resources :resources, :only => [:create]
    end
  end

end
