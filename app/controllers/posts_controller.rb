class PostsController < ApplicationController
<<<<<<< HEAD
  before_action :authenticate_user!
  before_action :set_user
  before_action :set_post, only: %i[show update destroy]
 
=======
  before_action :set_post, only: %i[show update destroy]
>>>>>>> feat: Crud app with react-rails
  include Pagy::Backend

  #use json response for sending the data since react relies on api to fetch and receive data
  #to serialize object and send as a response / json
  def index
<<<<<<< HEAD
    # @pagy, @posts = pagy(@user.posts.order(created_at: :desc), items: 5) # Set per user
    @pagy, @posts = pagy(Post.order(created_at: :desc), items: 5) # Set items per page
=======
    @pagy, @posts = pagy(Post.all.order(created_at: :desc), items: 5) # Set items per page
>>>>>>> feat: Crud app with react-rails
    render json: {
      #get posts and pages that sends to the react component
      #left will be the variable that use to access in react component
      #right the valus that will be passed
<<<<<<< HEAD
      posts: @posts.as_json(include: { user: { only: [:id, :first_name, :last_name] } }),
      page: @pagy.page,
      pages: @pagy.pages,
      next: @pagy.next ? @pagy.next : nil,
      prev: @pagy.prev ? @pagy.prev : nil,
      current_user: @user ? @user.as_json(only: [:id, :first_name, :last_name, :email]) : {}
=======
      posts: @posts,
      page: @pagy.page,
      pages: @pagy.pages,
      next: @pagy.next ? @pagy.next : nil,
      prev: @pagy.prev ? @pagy.prev : nil
>>>>>>> feat: Crud app with react-rails
    }
  end
  
  def show
<<<<<<< HEAD
    render json: {
      post: @post.as_json(include: { comments: { include: :user }, user: {} }),
      current_user: @user || {}
    }
  end  

  def create
    @post = Post.new(post_params)
    @post.user = current_user
=======
    render json: @post, include: :comments
  end

  def create
    @post = Post.new(post_params)
>>>>>>> feat: Crud app with react-rails

    if @post.save
      render json: @post, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
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

<<<<<<< HEAD
  def set_user
    @user = current_user
  
    unless @user
      render json: { error: "User not found" }, status: :not_found
    end
  end
  
=======
>>>>>>> feat: Crud app with react-rails
  def post_params
    params.require(:post).permit(:title, :body)
  end
end
