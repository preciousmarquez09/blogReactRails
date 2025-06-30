# To deliver this notification:
#
# FriendNotifier.with(post: @post).deliver_later(current_user)
# FriendNotifier.with(post: @post).deliver(current_user)

class FriendNotifier < Noticed::Base
  # Add your delivery methods
  #
  deliver_by :database
  # deliver_by :email, mailer: "UserMailer"
  # deliver_by :slack
  # deliver_by :custom, class: "MyDeliveryMethod"

  # Add required params
  #
  # param :post

  # Define helper methods to make rendering easier.
  #
  param :follower
  param :action
  param :user_id
  param :follow_id

  # This method builds the message shown in the frontend
  def message
    action = params[:action] || "interacted"
    follower = params[:follower] || "Someone"

    if action == "friendReq"
      "#{follower[:first_name]} #{follower[:last_name]} wants to follow you!"
    elsif action == "accept"
      "#{follower[:first_name]} #{follower[:last_name]} accepted follow request!"
    else
      "Someone interacted to your profile"
    end
  end


  def url
    user_id = params[:user_id] || "unknown"
    "/profile/#{user_id}"
  end
end
