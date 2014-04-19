class Major < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :qnas
  has_many :quests
  has_many :evaluations
end
