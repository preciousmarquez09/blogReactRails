class Post < ApplicationRecord
    
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :reading_lists, dependent: :destroy
    has_one_attached :coverimg
    has_many :notifications, as: :record, dependent: :destroy

    validates :title, :body, presence: true

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
      
end
