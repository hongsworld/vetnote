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
