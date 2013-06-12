class CreatePortfolios < ActiveRecord::Migration
  def change
    create_table :portfolios do |t|

      t.timestamps
    end
  end
end
