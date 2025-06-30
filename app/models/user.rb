class User < ApplicationRecord

  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :reading_list, dependent: :destroy
  has_many :notifications, as: :recipient, dependent: :destroy

  acts_as_voter
  followability

  validates :first_name, :last_name, :birthday, presence: true

  validate :first_last_name
  validate :email_regex

  validate :age_is_16_above

  validates :password, confirmation: true

  has_many :follows, as: :follower, dependent: :destroy
  has_many :followed_users, through: :follows, source: :followee, source_type: 'User'

  has_many :reverse_follows, as: :followee, class_name: 'Follow', dependent: :destroy
  has_many :followers, through: :reverse_follows, source: :follower, source_type: 'User'

  def mutual_following_with?(other)
    self.following?(other) && other.following?(self)
  end

  def followers_count
    Followability::Relationship
      .where(followable_type: self.class.name, followable_id: id, status: "following")
  end

  def followers
    follower_ids = Followability::Relationship
      .where(followable_type: "User", followable_id: id, status: "following")
      .pluck(:followerable_id)
  
      User.where(id: follower_ids).pluck(:id, :first_name, :last_name).map do |id, first, last|
        { id: id, first_name: first, last_name: last }
      end
  end

  def total_votes_received
    posts.joins(:votes_for).where(votes: { vote_flag: true }).count
  end
  
  
  
  private

  def email_regex
    if email.present? && (email.match(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]{3,}\z/i).nil?)
      errors.add(:email, "must be a valid email address")
    end
  end

  #validate age if 16 above
  def age_is_16_above
    if birthday.present? && birthday > 16.years.ago.to_date
      errors.add(:base, "Date of birth must be at least 16 years old")
    end
  end

  def first_last_name
    if first_name.present? && first_name.length < 2
      errors.add(:first_name, "must be at least 2 letters")
    end
    if first_name.present? && first_name.match(/\A[a-zA-Z]+\z/).nil?
      errors.add(:first_name, "must contain only alphabets") 
    end
    
    if last_name.present? && last_name.length < 2
      errors.add(:last_name, "must be at least 2 letters") 
    end
    if last_name.present? && last_name.match(/\A[a-zA-Z]+\z/).nil?
      errors.add(:last_name, "must contain only alphabets")
    end
  end


end
