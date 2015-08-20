class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, :nil => false
      t.string :start_date, :nil => false
      t.string :end_date, :nil => false
      t.text :summary, :nil => false

      t.timestamps
    end
  end
end
