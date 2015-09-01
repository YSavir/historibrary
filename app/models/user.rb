class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Validations
  validates :username,
    :presence => true,
    :length => { :maximum => 16, :minimum => 3 }

  # Associations
  has_many :created_resources,
              class_name: 'Resource',
              foreign_key: 'creator_id'
end
