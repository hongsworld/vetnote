#coding:utf-8
require 'csv'

csv_text = File.read('./small.csv')

csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
   major = Major.find(row[1])
   puts major.name
   q = major.quests.first(row[2].to_i).last.smallquests.new
   q.content = row[0]
   q.save
   puts q
   puts "--------------------"
end

