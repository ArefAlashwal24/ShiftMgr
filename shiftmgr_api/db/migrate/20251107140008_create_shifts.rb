class CreateShifts < ActiveRecord::Migration[8.1]
  def change
    create_table :shifts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :location, null: false, foreign_key: true
      t.datetime :starts_at
      t.datetime :ends_at
      t.text :notes

      t.timestamps
    end
  end
end
