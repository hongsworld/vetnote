class CreateEvaluations < ActiveRecord::Migration
  def change
    create_table :evaluations do |t|
      t.integer :major_id
      t.integer :user_id
      t.integer :item_1
      t.integer :item_2
      t.integer :item_3
      t.integer :item_4
      t.integer :item_5
      t.integer :item_6
      t.integer :item_7
      t.integer :item_8
      t.timestamps
    end
  end
end
