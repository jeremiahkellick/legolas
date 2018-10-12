class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.references :user, foreign_key: true
      t.string :symbol, null: false
      t.integer :shares, null: false
      t.datetime :time, null: false

      t.timestamps
    end
    add_index :transactions, [:symbol, :time]
    add_index :transactions, :time
  end
end
