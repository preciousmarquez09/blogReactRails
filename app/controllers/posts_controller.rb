class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_post, only: %i[show update destroy]
 
  include Pagy::Backend

  #use json response for sending the data since react relies on api to fetch and receive data
  #to serialize object and send as a response / json
  #with pagy

  def current_user_info
    user = User.find_by(id: params[:id])
    render json: { user: user, current_user: current_user,
    total_likes: user.total_votes_received, 
    already_sent_request: current_user.sent_follow_request_to?(user),
    already_following: current_user.following?(user),
    received_request: user.sent_follow_request_to?(current_user),
    mutual_following: current_user.mutual_following_with?(user),
    they_follow_me: user.following?(current_user),
    following_count: user.following.count,
    followers_count: user.followers_count.count,
    following_users: user.following,
    followers_users: user.followers,
    current_user_followers_id: current_user.followers.pluck(:id),
    current_user_following_id: current_user.following.pluck(:id),
    current_user_pending_request: current_user.pending_requests.pluck(:followable_id),
    current_user_follow_request: current_user.follow_requests.pluck(:followerable_id)
   }
  end


  def index
    @q = Post.ransack(params[:q])
    posts_scope = @q.result.includes(:user)
  
    if params[:tab] == "following"
      # Show posts from users the current user follows
      following_ids = current_user.following.pluck(:id)
      posts_scope = posts_scope.where(user_id: following_ids)
    end
  
    @posts = posts_scope.order(created_at: :desc)
  
    render json: {
      posts: @posts.map { |post|
        post.as_json(
          include: {
            user: { only: [:id, :first_name, :last_name] },
            comments: {}
          },
          methods: [:coverimg_url]
        ).merge(
          likes_count: post.likes_count,
          liked_by_current_user: post.liked_by?(current_user)
        )
      },
      current_user: current_user ? current_user.as_json(only: [:id, :first_name, :last_name, :email]) : {}
    }
  end
  
  
  def userPost
    user = User.find_by(id: params[:id])
    
    if user
      posts = user.posts.order(created_at: :desc)
  
      posts_json = posts.map do |post|
        post.as_json(
          include: {
            comments: {},
            user: { only: [:id, :first_name, :last_name] }
          },
          methods: [:coverimg_url]
        ).merge(
          likes_count: post.likes_count,
          liked_by_current_user: post.liked_by?(current_user)
        )
      end
  
      render json: {
        posts: posts_json,
        user: user.as_json(only: [:id, :first_name, :last_name, :email, :bio, :birthday]),
        current_user: current_user.as_json(only: [:id, :first_name, :last_name, :email])
      }
    else
      render json: { errors: "User not found" }, status: :not_found
    end
  end
  
  
  def show
    render json: {
      post: @post.as_json(
        include: {
          comments: { include: :user, order: 'created_at DESC' },
          user: {}
        },
        methods: [:coverimg_url]
      ).merge(
        likes_count: @post.likes_count,
        liked_by_current_user: @post.liked_by?(current_user)
      ),
      current_user: current_user || {}
    }
  end
  
  

  def create
    @post = Post.new(post_params)
    @post.user = current_user

    if @post.save
      render json: { post: @post, image_url: @post.coverimg.attached? ? url_for(@post.coverimg) : nil }, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if params[:post][:remove_coverimg] == "true"
      @post.coverimg.purge
    end
    if @post.update(post_params)
      render json: { post: @post, image_url: @post.coverimg.attached? ? url_for(@post.coverimg) : nil }, status: :ok
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  
  def destroy
    @post.destroy
    #returns 204 No Content with no body
    head :no_content
  end

  private

  def set_post
    @post = Post.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Post not found" }, status: :not_found
  end

  def set_user
    @user = current_user
  
    unless @user
      render json: { error: "User not found" }, status: :not_found
    end
  end
  
  def post_params
    params.require(:post).permit(:title, :body, :description, :coverimg)
  end
end
