class CreateDailies < ActiveRecord::Migration
  def change
    create_table :dailies do |t|
      t.integer :user_id
      t.string :more_learn
      t.string :student_comment
      t.string :professor_comment
      t.timestamps
    end
  end
end
