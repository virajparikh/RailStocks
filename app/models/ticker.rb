class Ticker < ActiveRecord::Base
  attr_accessible :name
  belongs_to :portfolio

  # validates_uniqueness_of :name, :scope => :portfolio_id, message: "Ticker already in portfolio"
    
end
