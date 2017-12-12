Rails.application.routes.draw do
  root :to     => 'calendar#index'
  get 'detail' => 'calendar#detail'

  get 'hello_world', to: 'hello_world#index'
  get 'hello_world/show', to: 'hello_world#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html





end
