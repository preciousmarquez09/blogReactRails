class ReadingListsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_reading_list, only: [:destroy]

  def index
    # Use params[:q] for ransack search params
    # We start from posts that belong to the user's reading list
    posts = Post.joins(:reading_lists)
                .where(reading_lists: { user_id: @user.id })
                .includes(:comments, :user)
  
    # Apply ransack search on posts with params[:q]
    @q = posts.ransack(params[:q])
    filtered_posts = @q.result.order(created_at: :desc)
  
    # Get the reading list entries with filtered posts only
    @reading_list = ReadingList.where(user: @user, post_id: filtered_posts.pluck(:id))
                               .includes(post: [:comments, :user])
  
    render json: {
      reading_list: @reading_list.as_json(
        include: {
          post: {
            include: {
              comments: {},
              user: { only: [:id, :first_name, :last_name] }
            },
            methods: [:coverimg_url]
          }
        }
      )
    }
  end
  
  
  def show
    
  end

  def create
    @readingList = ReadingList.new(reading_list_params)
    @readingList.user = current_user
    @post = Post.find_by(id: @readingList.post_id)
  
    if @readingList.save
      if @post.user.present? && @readingList.user != @post.user
  
        NewCommentNotifier.with(
          reading_list: @readingList,
          post: @post,
          action: "reading_list",
          record_type: @readingList.class.name,
          record_id: @readingList.id
        ).deliver_later(@post.user)
      end
  
      render json: { reading_list: @readingList }, status: :created
    else
      Rails.logger.error "Failed to save ReadingList: #{@readingList.errors.full_messages}"
      render json: { errors: @readingList.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @reading_list.destroy
    head :no_content
  end


  private
  def set_user
    @user = current_user
  
    unless @user
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def set_reading_list
    @reading_list = current_user.reading_list.find_by(id: params[:id])
    render json: { error: "Reading list item not found" }, status: :not_found unless @reading_list
  end

  def reading_list_params
    params.require(:reading_list).permit(:post_id)
  end
end
