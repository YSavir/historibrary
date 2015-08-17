class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, :nil => false
      t.string :start_date, :nil => false

      t.timestamps
    end
  end
end
