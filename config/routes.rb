Rails.application.routes.draw do

  root 'events#index'

  devise_for :users, :controllers => {
      registrations: 'users/registrations',
      sessions: 'users/sessions'
    }
   
  devise_scope :user do
    get '/sessions/current' => 'users/sessions#current'
  end

  resources :events, :only => [:index]

  namespace :api do
    namespace :v1 do
      resources :events, :only => [:index]
      resources :resources, :only => [:create]
    end
  end

end
