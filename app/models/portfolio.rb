class Portfolio < ActiveRecord::Base
  attr_accessible :name

  validates_uniqueness_of :name, message: "Portfolio name already exists"
    belongs_to :user
    has_many :tickers
end
