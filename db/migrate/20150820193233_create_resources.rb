class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :name, :nil => false
      t.string :summary, :nil => false
      t.string :source_url

      t.timestamps
    end
  end
end
