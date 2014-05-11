class QnaController < ApplicationController
  def list
    major = Major.where(:id => params[:selectedMajor]).last
    qna = major.qnas.all
    writer = Array.new
    content = Array.new
    id = Array.new
    qna.each_with_index do |q,i|
      writer << q.user_name
      content << q.content
      id << q.id
    end
    error_code = 1
    data = {:id => id, :writer => writer, :content => content , :error_code => error_code}
    render :json => data.to_json
  end

  def write
    major = Major.where(:id => params[:selectedMajor]).last

    logger.info (params[:selectedMajor])
    logger.info (params[:selectedMajor])
    logger.info (params[:selectedMajor])
    logger.info (params[:selectedMajor])

    q = major.qnas.new
    q.user_name = "Tester"
    q.content = params[:content]
    q.save
    error_code = 1
    number = major.qnas.all.count
    data = {:error_code => error_code, :number => number}

    render :json => data.to_json
  end

end
