#coding:utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
major=%w[내과 마취과 산과 안과 야생동물과 영상의학과 일반외과 임상병리과 임상기초 정형외과 피부과]

major.each do |m|
  a = Major.new
  a.name = m
  a.save
end
