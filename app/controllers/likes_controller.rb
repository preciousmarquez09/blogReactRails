class LikesController < ApplicationController

    before_action :authenticate_user!
    before_action :set_post

    def create
      
      @post.liked_by current_user
      unless @post.user_id === current_user.id
        NewCommentNotifier.with(
          like: current_user.votes.find_by(votable: @post, vote_flag: true),
          post: @post,
          action: "like",
          record_type: "Like",
          record_id: @post.id
        ).deliver(@post.user)
      
        render json: {
          liked: true,
          likes_count: @post.get_upvotes.size,
          dislikes_count: @post.get_downvotes.size
        }
      end
    end

      def destroy
        vote = current_user.votes.find_by(votable: @post, vote_flag: true)
      
        if vote
          @post.unliked_by current_user
      
          Notification.where(
            recipient: @post.user,
            type: "NewCommentNotifier",
            record_type: "Like",
            record_id: @post.id,
            user_id: current_user.id
          ).destroy_all
        end
      
        render json: {
          liked: false,
          likes_count: @post.get_upvotes.size,
          dislikes_count: @post.get_downvotes.size
        }
      end
      
    def set_post
        @post = Post.find(params[:post_id])
    end
end
