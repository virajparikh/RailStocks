class AddNameToTickers < ActiveRecord::Migration
  def change
    add_column :tickers, :name, :string
  end
end
