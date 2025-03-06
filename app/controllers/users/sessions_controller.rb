class Users::SessionsController < Devise::SessionsController
<<<<<<< HEAD

  #ensure that the controller only responds with JSON
  respond_to :json
  
  #check if the current_user is logged in
  def check_auth
    if current_user
      render json: { logged_in: true, user: current_user.as_json(only: [:id, :email, :first_name, :last_name]) }
=======
  respond_to :json
  

  def check_auth
    if current_user
      render json: { logged_in: true, user: current_user.as_json(only: [:id, :email]) }
>>>>>>> feat: Crud app with react-rails
    else
      render json: { logged_in: false }
    end
  end
  
<<<<<<< HEAD

  private

  #check if the user credentials match in the database and return the data
  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: "Logged in successfully." },
      data: resource.as_json(only: [:id, :email, :first_name, :last_name])
    }, status: :ok
  end

  #once it is successful logout, it returns the message
=======
  private

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: "Logged in successfully." },
      data: resource.as_json(only: [:id, :email])
    }, status: :ok
  end

>>>>>>> feat: Crud app with react-rails
  def respond_to_on_destroy
    if current_user
      render json: { status: 200, message: "Logged out successfully" }, status: :ok
    else
      head :no_content
    end
  end
  
end
