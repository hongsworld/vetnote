class QuestController < ApplicationController
  def large
    major = Major.find(params[:selectedMajorId])
    quests = major.quests.all
    title = Array.new
    quest_id = Array.new
    quests.each do |q|
      title << q.content
      quest_id << q.id
    end
    error_code = 1
    data = {:title => title, :quest_id => quest_id, :error_code => error_code}
    render :json => data.to_json
  end

  def small
    quest_id = params[:questId]
    smallquests = Quest.find(quest_id).smallquests.all
    large_title = Quest.find(quest_id).content
    title = Array.new
    smallquests.each do |s|
      title << s.content
    end
    error_code = 1
    data = {:title => title, :error_code => error_code, :large_title => large_title}
    render :json => data.to_json

  end
end
