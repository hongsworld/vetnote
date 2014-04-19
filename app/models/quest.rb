class Quest < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :major_id, :content
  belongs_to :major
  has_many :smallquests
end
