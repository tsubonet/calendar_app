class CreateRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :records do |t|
      t.date :done_on
      t.string :result

      t.timestamps
    end
    add_index :records, :done_on, unique: true
  end
end
