class Post < ApplicationRecord
    has_many :comments, dependent: :destroy
<<<<<<< HEAD
    belongs_to :user
=======
    
>>>>>>> feat: Crud app with react-rails
    validates :title, :body, presence: true

end
