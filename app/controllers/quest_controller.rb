#coding:utf-8
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
    major = Quest.find(quest_id).major.name
    error_code = 1
    data = {:title => title, :error_code => error_code, :large_title => large_title, :major => major}
    logger.info (data)
    render :json => data.to_json

  end

  def record_case
#    quest = Quest.find(params[:q_id])
#    pf = Photofile.new
    photo = params[:image]
    uq = Userquest.new
    logger.info (photo)
    logger.info (params[:number])
#    pf.pet_quest_id = pq.id
    savedname = SecureRandom.hex(5) + ".jpg"
    uq.picture_url = savedname
    uq.case_number = params[:number]
    uq.quest_id = params[:quest_id]
    uq.save
    img_name = savedname
    img_magick = Magick::Image.from_blob(params[:image].read).first
    img_magick.format = "JPEG"
    img_magick.resize_to_fill!(700, 700){
        self.gravity = Magick::CenterGravity
    }
    f = File.open(Rails.root.join("public", "img", img_name), "wb")
    f.write(img_magick.to_blob)
    f.close
#    pq.done_picture_path = img_name
#    pq.done_memo = params[:done_memo]
#    pq.save
    error_code = 1
    data = {:error_code => error_code}
    render :json => data.to_json
    
  end
  
end
