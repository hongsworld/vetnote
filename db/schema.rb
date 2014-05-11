# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140502002015) do

  create_table "dailies", :force => true do |t|
    t.integer  "user_id"
    t.string   "more_learn"
    t.string   "student_comment"
    t.string   "professor_comment"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  create_table "evaluations", :force => true do |t|
    t.integer  "major_id"
    t.integer  "user_id"
    t.integer  "item_1"
    t.integer  "item_2"
    t.integer  "item_3"
    t.integer  "item_4"
    t.integer  "item_5"
    t.integer  "item_6"
    t.integer  "item_7"
    t.integer  "item_8"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "majors", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "qnas", :force => true do |t|
    t.integer  "major_id"
    t.integer  "user_id"
    t.string   "user_name"
    t.string   "content"
    t.string   "answer"
    t.string   "answerer_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "quests", :force => true do |t|
    t.integer  "major_id"
    t.string   "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "smallquests", :force => true do |t|
    t.integer  "quest_id"
    t.string   "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "syllabuses", :force => true do |t|
    t.integer  "major_id"
    t.string   "html_content"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "userquests", :force => true do |t|
    t.integer  "user_id"
    t.integer  "quest_id"
    t.string   "case_number"
    t.string   "picture_url"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "token"
    t.string   "identification"
    t.string   "password"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

end
