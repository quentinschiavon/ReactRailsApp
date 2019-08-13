Rails.application.routes.draw do
  #root 'greetings#hello'
  #get 'greetings/hello'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'
  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :destroy, :update],  defaults: { format: 'json' }
      get '/item/:id', to: 'item#index', defaults: { format: 'json' }
      get '/sort/:sortedBy', to: 'sort#index', defaults: { format: 'json' }
    end
  end
  get '*page', to: 'site#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

end
