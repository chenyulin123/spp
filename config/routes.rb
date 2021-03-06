Rails.application.routes.draw do
  # mount UeditorRails::Engine => '/ueditor'
  #1，我们指定自己的 Controller 来处理；
  #2，继承 devise；
  #3  , 只重写我们想定制的部分action

  devise_for :users, controllers: {
    sessions: "user/sessions",
    registrations: "user/registrations",
    passwords: "user/passwords",
  }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root :to => "home#index"
  resources :home do
    collection do
      get :products
      get :informations
      get :abouts
      get :contacts
      get :ajax_query
      get :infos_extras
      get :prod_extras
      get :map_nts
      get :map_bjs
      get :map_shs
      get :map_gzs
    end
  end
  
  namespace :backend do
         #ueditor编辑器
  mount UeditorRails::Engine => '/ueditor'
    get '/' => 'home#index'
    resources :catalogs
    resources :articles
    resources :infos
    resources :home_page
    resources :pictures
    resources :abouts do
      collection do
        get :edit_detail
        get :countrys
        post :save_about_picture   
        get :cultures 
        get :new_cultures
        get :edit_culture
        post :create_culture
        post :save_about_culture
        delete :destroy_culture
      end
      member do
        patch :up_picture
        patch :up_culture
      end
    end
    resources :contacts 
    resources :products do
      collection do
        get :file_delete
        get :file_download
      end
    end
    resources :product_manages
    resources :programmes
  end




  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
