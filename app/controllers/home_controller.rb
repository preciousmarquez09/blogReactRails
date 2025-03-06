class HomeController < ApplicationController
  def index
  end
<<<<<<< HEAD

  def show
    render json: current_user if user_signed_in?
  end

=======
>>>>>>> feat: Crud app with react-rails
end
