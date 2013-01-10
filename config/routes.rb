Spree::Core::Engine.routes.draw do
  namespace :admin do
    resource :editor_settings, :only => ['update', 'edit']
    resources :uploads
    resources :ckeditor_uploads
  end
end
