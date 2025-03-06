class Comment < ApplicationRecord
<<<<<<< HEAD
  belongs_to :post, dependent: :destroy
  belongs_to :user, dependent: :destroy
  
=======
  belongs_to :post

>>>>>>> feat: Crud app with react-rails
  validates :commenter, :body, presence: true
end
