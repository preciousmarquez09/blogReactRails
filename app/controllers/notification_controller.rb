class NotificationController < ApplicationController
  def index
    notifications = current_user.notifications.order(created_at: :desc)
  
    render json: notifications.map { |n|
      notif = n.to_notification
      params = n.params
      actor_user = nil
  
      # Handle actor extraction
      if params[:comment].is_a?(Comment)
        actor_user = User.find_by(id: params[:comment].user_id)
      elsif params[:reading_list].is_a?(ReadingList)
        actor_user = User.find_by(id: params[:reading_list].user_id)
      elsif params[:user_id]
        actor_user = User.find_by(id: params[:user_id])
      end
  
      actor_data = actor_user && {
        id: actor_user.id,
        name: "#{actor_user.first_name} #{actor_user.last_name}",
        #coverimg_url: actor_user.coverimg.attached? ? url_for(actor_user.coverimg) : nil
      }
  
      post = params[:post]
      post_data = if post.is_a?(Post)
        { id: post.id, title: post.title }
      elsif post.is_a?(Hash)
        { id: post["id"] || post[:id], title: post["title"] || post[:title] }
      else
        {}
      end
  
      {
        id: n.id,
        type: n.type,
        message: notif.message,
        url: notif.url,
        read_at: n.read_at,
        created_at: n.created_at,
        actor: actor_data,
        params: {
          post: post_data
        }
      }
    }
  end
  

  def friendRequest
    request = current_user.follow_requests.order(id: :desc)

    data = request.map do |n|
      user = User.find(n.followerable_id)
      
      {
        id: n.id,
        status: n.status,
        created_at: n.created_at,
        followerable_id: n.followerable_id,
        followable_id: n.followable_id,
        follower_name: "#{user.first_name} #{user.last_name}",
        follower_email: user.email,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      }
    end
    
    render json: data
    
  end
  
  
  def counter
    postNotifier = current_user.notifications.where(read_at: nil).count
    friendNotifier = current_user.follow_requests.count
  
    render json: { postNotifier: postNotifier, friendNotifier: friendNotifier }
  end

  def mark_as_read
    notification = current_user.notifications.find(params[:id])
    notification.update(read_at: Time.current)
    head :no_content
  end
end
