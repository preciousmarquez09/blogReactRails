class Post < ApplicationRecord
    
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :reading_lists, dependent: :destroy
    has_one_attached :coverimg
    has_many :notifications, as: :record, dependent: :destroy

    acts_as_votable

    validates :title, :body, presence: true

    before_destroy :remove_related_notifications

    #get image url to display
    def coverimg_url
        coverimg.attached? ? Rails.application.routes.url_helpers.rails_blob_url(coverimg, only_path: true) : nil
    end

    def self.ransackable_attributes(auth_object = nil)
        super + ["title", "description"]
    end

    def self.ransackable_associations(auth_object = nil)
        super + ["user"]
    end

    def likes_count
        get_upvotes.size
    end
      
    def liked_by?(user)
        user ? user.voted_for?(self) : false
    end

    private

    def remove_related_notifications
        Notification.where(
        type: "NewCommentNotifier",
        record_type: "Like",
        record_id: self.id
        ).destroy_all
    end
      
end
