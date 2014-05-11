class PracticeController < ApplicationController

  def index
    e = Evaluation.all
    @item_1 = Array.new
    @item_2 = Array.new
    @item_3 = Array.new
    @item_4 = Array.new
    @item_5 = Array.new
    @item_6 = Array.new
    @item_7 = Array.new
    @item_8 = Array.new
    e.each do |x|
      @item_1 << x.item_1
      @item_2 << x.item_2
      @item_3 << x.item_3
      @item_4 << x.item_4
      @item_5 << x.item_5
      @item_6 << x.item_6
      @item_7 << x.item_7
      @item_8 << x.item_8
    end
  end
  def change_date

    input_date = params[:input_date]
    modified_date = input_date[3..5] + input_date[0..2] + input_date[6..9]
    parsed_date = Date.parse(modified_date)
    log_title = Array.new
    log_case_number = Array.new
    log_picture_url = Array.new
    log_quest_id = Array.new
    more_learn_text = Array.new
    more_learn_id = Array.new
    uq = Userquest.where('DATE(created_at) = ?', parsed_date)
    uq.each do |x|
      log_title << Quest.find(x.quest_id).content
      log_case_number << x.case_number
      log_picture_url << x.picture_url
      log_quest_id << x.quest_id
    end

    selectedMajor = Major.find(params[:selectedMajor])
    q = selectedMajor.qnas.where(:created_at => 1.week.ago..1.second.ago)
    qna_content = Array.new
    qna_id = Array.new
    q.each do |x|
      qna_content << x.content
      qna_id << x.id
    end
    ml = Daily.where(:student_comment => nil).where('DATE(created_at) =?', parsed_date)
    ml.each do |x|
      more_learn_text << x.more_learn
      more_learn_id << x.id
    end
    error_code = 1
    sc = Daily.where(:more_learn => nil).where('DATE(created_at) =?', parsed_date)
    if sc.empty?
      comment_code = 1 #학생 코멘트 없음
      data = {:log_title => log_title, :log_case_number => log_case_number , :log_picture_url => log_picture_url , :log_quest_id => log_quest_id, :qna_content => qna_content, :qna_id => qna_id, :more_learn_text => more_learn_text, :more_learn_id => more_learn_id, :error_code => error_code, :comment_code => comment_code}
    else
      comment_code = 2 #학생 코멘트 있음
      comment_text = sc.last.student_comment
      data = {:log_title => log_title, :log_case_number => log_case_number , :log_picture_url => log_picture_url , :log_quest_id => log_quest_id, :qna_content => qna_content, :qna_id => qna_id, :more_learn_text => more_learn_text, :more_learn_id => more_learn_id, :error_code => error_code, :comment_code => comment_code, :comment_text => comment_text}
    end
    logger.info (data)
    render :json => data.to_json
  end
  def daily
    log_title = Array.new
    log_case_number = Array.new
    log_picture_url = Array.new
    log_quest_id = Array.new
    more_learn_text = Array.new
    more_learn_id = Array.new
    uq = Userquest.where('DATE(created_at) = ?', Date.today)
    uq.each do |x|
      log_title << Quest.find(x.quest_id).content
      log_case_number << x.case_number
      log_picture_url << x.picture_url
      log_quest_id << x.quest_id
    end
    selectedMajor = Major.find(params[:selectedMajor])
    q = selectedMajor.qnas.where(:created_at => 1.week.ago..1.second.ago)
    qna_content = Array.new
    qna_id = Array.new
    q.each do |x|
      qna_content << x.content
      qna_id << x.id
    end
    ml = Daily.where(:student_comment => nil).where('DATE(created_at) =?', Date.today)
    ml.each do |x|
      more_learn_text << x.more_learn
      more_learn_id << x.id
    end
    error_code = 1
    sc = Daily.where(:more_learn => nil).where('DATE(created_at) =?', Date.today)
    if sc.empty?
      comment_code = 1 #학생 코멘트 없음
      data = {:log_title => log_title, :log_case_number => log_case_number , :log_picture_url => log_picture_url , :log_quest_id => log_quest_id, :qna_content => qna_content, :qna_id => qna_id, :more_learn_text => more_learn_text, :more_learn_id => more_learn_id, :error_code => error_code, :comment_code => comment_code}
    else
      comment_code = 2 #학생 코멘트 있음
      comment_text = sc.last.student_comment
      data = {:log_title => log_title, :log_case_number => log_case_number , :log_picture_url => log_picture_url , :log_quest_id => log_quest_id, :qna_content => qna_content, :qna_id => qna_id, :more_learn_text => more_learn_text, :more_learn_id => more_learn_id, :error_code => error_code, :comment_code => comment_code, :comment_text => comment_text}
    end
    logger.info (data)
    render :json => data.to_json


  end
  def more_learn
    memo = params[:more_learn]
    add_memo = Daily.new
    add_memo.more_learn = memo
    add_memo.save
    error_code = 1
    data = {:error_code => error_code}
    render :json => data.to_json
  end 
  def student_comment
    comment = params[:student_comment]
    add_comment = Daily.new
    add_comment.student_comment = comment
    add_comment.save
    error_code = 1
    data = {:error_code => error_code}
    render :json => data.to_json

  end


  def valuation
    r1 = params["radio-choice-1"]
    r2 = params["radio-choice-2"]
    r3 = params["radio-choice-3"]
    r4 = params["radio-choice-4"]
    r5 = params["radio-choice-5"]
    r6 = params["radio-choice-6"]
    r7 = params["radio-choice-7"]
    r8 = params["radio-choice-8"]

    e = Evaluation.new
    e.item_1 = r1
    e.item_2 = r2
    e.item_3 = r3
    e.item_4 = r4
    e.item_5 = r5
    e.item_6 = r6
    e.item_7 = r7
    e.item_8 = r8
    e.save
    error_code = 1
    data = {:error_code => error_code}
    render :json => data.to_json

  end
end
