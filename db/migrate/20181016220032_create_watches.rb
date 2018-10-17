class CreateWatches < ActiveRecord::Migration[5.2]
  def change
    create_table :watches do |t|
      t.references :user, foreign_key: true
      t.string :symbol, null: false

      t.timestamps
    end
    add_index :watches, [:symbol, :user_id], unique: true
  end
end
