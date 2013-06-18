class AddColumnToTickers < ActiveRecord::Migration
  def change
    add_column :tickers, :portfolio_id, :string
  end
end
