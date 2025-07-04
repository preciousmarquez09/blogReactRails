class Users::ProfilesController < ApplicationController
    before_action :authenticate_user!

    def show
        render json: current_user.as_json.merge({
          cover_img: current_user.cover_img.attached? ? url_for(current_user.cover_img) : nil
        })
    end
      
    def update
        if current_user.update(user_params)
          bypass_sign_in(current_user) # <- Keeps the user signed in
          render json: { success: true, user: current_user }
        else
          render json: { success: false, errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
    
      private
    
      def user_params
        params.require(:user).permit(:first_name, :last_name, :bio, :birthday, :email, :password, :password_confirmation, :cover_img)
      end
    
end