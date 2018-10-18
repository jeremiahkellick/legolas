class RemoveBalanceCentsFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :balance_cents, :integer, default: 0, null: false
    remove_column(
      :users,
      :balance_currency,
      :integer,
      default: "USD",
      null: false
    )
  end
end
