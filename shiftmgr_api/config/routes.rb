Rails.application.routes.draw do
  post 'auth/register', to: 'auth#register'
  post 'auth/login',    to: 'auth#login'
  resources :locations, only: %i[index create update destroy]
  resources :shifts
end
