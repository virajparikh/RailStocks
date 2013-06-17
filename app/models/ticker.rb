class Ticker < ActiveRecord::Base
  attr_accessible :name

  validates_uniqueness_of :name, :scope => :portfolio_id, message: "Stock ticker already exists"
    belongs_to :portfolio
end
