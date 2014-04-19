class Qna < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :major
  belongs_to :user
end
