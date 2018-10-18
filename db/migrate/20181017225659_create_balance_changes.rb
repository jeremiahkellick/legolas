class CreateBalanceChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :balance_changes do |t|
      t.references :user, foreign_key: true
      t.integer :amount_cents, null: false
      t.datetime :time, null: false

      t.timestamps
    end
    add_index :balance_changes, :time
  end
end
