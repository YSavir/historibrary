class CreateEventResources < ActiveRecord::Migration
  def change
    create_table :event_resources do |t|
      t.references :event
      t.references :resource

      t.timestamps
    end
  end
end
