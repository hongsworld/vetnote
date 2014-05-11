class User < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :daily
  has_many :userquests
  has_many :quests , :through => :userquests
end
