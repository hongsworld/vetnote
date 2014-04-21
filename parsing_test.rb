#coding:utf-8
require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'pry'

page = Nokogiri::HTML(open("http://vet.snu.ac.kr/kor/html/bbs/menu/index.jsp"))
0.upto(5) do |day|
  print "날짜 : "
  puts page.css('table')[10].css('td')[3 + 3*day].text.gsub("\r\n","").gsub(" ","")
  print "중식 : "
  puts page.css('table')[10].css('td')[4 + 3*day].text.gsub("\r\n","").gsub(" ","")
  print "석식 : "
  puts page.css('table')[10].css('td')[5 + 3*day].text.gsub("\r\n","").gsub(" ","")
  puts "/////////////////////////////"
end
