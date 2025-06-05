# To deliver this notification:
#
# NewCommentNotifier.with(post: @post).deliver_later(current_user)
# NewCommentNotifier.with(post: @post).deliver(current_user)

class NewCommentNotifier < Noticed::Base
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
  def message
    comment =  params[:comment] if params[:comment].present?
    reading_list = params[:reading_list] if params[:reading_list].present?
    action = params[:action] || "interacted"
  
    if action == "commented" && comment&.user
      "#{comment.user.first_name} #{comment.user.last_name} #{action} on your blog"
    elsif action == "reading_list" && reading_list&.user
      "#{reading_list.user.first_name} #{reading_list.user.last_name} added your blog to their reading list"
    else
      "Someone #{action} on your blog"
    end
  end
  
  
  #
  def url
    "/show/#{params[:post].id}"
  end
  
end
