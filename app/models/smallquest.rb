class Smallquest < ActiveRecord::Base
  # attr_accessible :title, :body
  attr_accessible :content, :quest_id
  belongs_to :quest
end
