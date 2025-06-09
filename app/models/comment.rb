class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  has_many :notifications, as: :record, dependent: :destroy

  validates :commenter, :body, presence: true
end
