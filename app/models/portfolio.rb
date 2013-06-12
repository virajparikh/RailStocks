class Portfolio < ActiveRecord::Base
  attr_accessible :name

  validates_uniqueness_of :name, message: "Portfolio name already exists"
	has_many :tickers
end
