class CreateSmallquests < ActiveRecord::Migration
  def change
    create_table :smallquests do |t|
      t.integer :quest_id
      t.string  :content
      t.timestamps
    end
  end
end
