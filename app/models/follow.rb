class Follow < ApplicationRecord
  belongs_to :follower, polymorphic: true
  belongs_to :followee, polymorphic: true
end
