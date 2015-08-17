Rails.application.routes.draw do

  resources :events, :only => [:index]

  namespace :api do
    namespace :v1 do
      resources :events, :only => [:index]
    end
  end

end
