class CreateQnas < ActiveRecord::Migration
  def change
    create_table :qnas do |t|
      t.integer :major_id
      t.integer :user_id
      t.string  :user_name
      t.string  :content
      t.string  :answer
      t.string  :answerer_id
      t.timestamps
    end
  end
end
