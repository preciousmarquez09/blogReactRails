class NotificationController < ApplicationController
  def index
    notifications = current_user.notifications.order(created_at: :desc)

    render json: notifications.map { |n|
      notif = n.to_notification
      params = n.params
      actor_user = nil

      # Handle :comment param as model object
      if params[:comment].is_a?(Comment)
        actor_user = User.find_by(id: params[:comment].user_id)

      # Handle :reading_list param as model object
      elsif params[:reading_list].is_a?(ReadingList)
        actor_user = User.find_by(id: params[:reading_list].user_id)
      end

      # Build actor data if present
      actor_data = if actor_user
        {
          id: actor_user.id,
          name: "#{actor_user.first_name} #{actor_user.last_name}",
          #coverimg_url: actor_user.coverimg.attached? ? Rails.application.routes.url_helpers.url_for(actor_user.coverimg) : nil
        }
      else
        nil
      end

      {
        id: n.id,
        type: n.type,
        message: notif.message,
        url: notif.url,
        read_at: n.read_at,
        created_at: n.created_at,
        actor: actor_data,
        params: n.params
      }
    }
  end

  def counter
    notifcount = current_user.notifications.where(read_at: nil).count
    render json: notifcount
  end

  def mark_as_read
    notification = current_user.notifications.find(params[:id])
    notification.update(read_at: Time.current)
    head :no_content
  end
end
