#coding:utf-8
require 'rubygems'
require 'nokogiri'
require 'open-uri'
class ApiController < ApplicationController

  def menu
    page = Nokogiri::HTML(open("http://vet.snu.ac.kr/kor/html/bbs/menu/index.jsp"))
    day_array = Array.new
    lunch_array = Array.new
    dinner_array = Array.new
    0.upto(5) do |day|
      day_array << page.css('table')[10].css('td')[3 + 3*day].text.gsub("\r\n","").gsub(" ","")
      lunch_array << page.css('table')[10].css('td')[4 + 3*day].text.gsub("\r\n","").gsub(" ","")
      dinner_array << page.css('table')[10].css('td')[5 + 3*day].text.gsub("\r\n","").gsub(" ","")
    end
    error_code = 1
    data = {:error_code => error_code, :day_array => day_array, :lunch_array => lunch_array, :dinner_array => dinner_array } 
    render :json => data.to_json
  end
end
