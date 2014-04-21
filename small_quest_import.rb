#coding:utf-8
require 'csv'

csv_text = File.read('./small.csv')

csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
   s = Smallquest.new
   s.id = row[0]
   s.content = row[1]
   s.quest_id = row[2]
   s.save
   puts s.content
   puts "--------------------"
end

