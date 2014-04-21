#coding:utf-8
require 'csv'

csv_text = File.read('./large.csv')

csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
   q = Quest.new
   q.id = row[0]
   q.content = row[1]
   q.major_id = row[2]
   q.save
   puts q.content
   puts "--------------------"
end

