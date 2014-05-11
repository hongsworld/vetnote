class CreateUserquests < ActiveRecord::Migration
  def change
    create_table :userquests do |t|
      t.integer :user_id
      t.integer :quest_id
      t.string :case_number
      t.string :picture_url
      t.timestamps
    end
  end
end
