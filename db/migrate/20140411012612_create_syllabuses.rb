class CreateSyllabuses < ActiveRecord::Migration
  def change
    create_table :syllabuses do |t|
      t.integer :major_id
      t.string :html_content
      t.timestamps
    end
  end
end
