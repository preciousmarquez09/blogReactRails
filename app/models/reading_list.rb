class ReadingList < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :notifications, as: :record, dependent: :destroy
  
  validates :post_id, uniqueness: { scope: :user_id, message: "is already added to your reading list" }
end
