class AddColumnToPortfolio < ActiveRecord::Migration
  def change
    add_column :portfolios, :user_id, :string
  end
end
