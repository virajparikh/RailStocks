class Portfolio < ActiveRecord::Base
  attr_accessible :name, :tickers_attributes
  belongs_to :user
  has_many :tickers
  
  accepts_nested_attributes_for :tickers

  validates_presence_of :user, :name
  validates_uniqueness_of :name, scope: :user_id, message: "Portfolio name already exists"
end
