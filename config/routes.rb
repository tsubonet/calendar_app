Rails.application.routes.draw do
  root :to                    => 'calendar#month'
  get 'month/:year/:month'    => 'calendar#month'
  get 'day/:year/:month/:day' => 'calendar#day'

  get 'hello_world',      to: 'hello_world#index'
  get 'hello_world/show', to: 'hello_world#show'

  resources :records



end
