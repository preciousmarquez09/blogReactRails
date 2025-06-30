class FollowController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:following, :unfollow, :accept, :remove, :decline]

  def following
    current_user.send_follow_request_to(@user)
  
    relationship = Followability::Relationship.find_by(
      followerable: current_user,
      followable: @user
    )
  
    FriendNotifier.with(
      user_id: current_user.id,
      follow_id: relationship.id,
      follower: {
        first_name: current_user.first_name,
        last_name: current_user.last_name
      },
      action: "friendReq"
    ).deliver(@user)
  
    head :ok
  end
  

  def decline
    current_user.decline_follow_request_of(@user)
    #Followability::Relationship.where(id: params[:id]).destroy
    head :ok
  end
  
  def unfollow
    current_user.unfollow(@user)
    head :ok
  end

  def accept
    current_user.accept_follow_request_of(@user)

    relationship = Followability::Relationship.find_by(
      followerable_id: @user,
      followable_id: current_user
    )
    FriendNotifier.with(
      user_id: current_user.id,
      follow_id: relationship.id,
      follower: {
        first_name: current_user.first_name,
        last_name: current_user.last_name
      },
      action: "accept"
    ).deliver(@user)
    head :ok
  end

  def remove
    current_user.remove_follow_request_for(@user)
    head :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
