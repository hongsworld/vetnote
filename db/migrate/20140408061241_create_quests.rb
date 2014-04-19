class CreateQuests < ActiveRecord::Migration
  def change
    create_table :quests do |t|
      t.integer :major_id
      t.string :content
      t.timestamps
    end
  end
end
