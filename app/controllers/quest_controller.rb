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
    quest_id = params[:quest_id]
    pointer = 0
    var a = 0
    Smallquest.all.each do |s|
      if a == s.content
      else
        pointer+=1
      end
      a = s.content

      if pointer == params[:quest_id]
        break
      end
    end

    smallquests = quest.smallquests.all
    title = Array.new
    smallquests.each do |s|
      title << s.content
    end
    data = {:title => title}
    render :json => data.to_json

  end
end
