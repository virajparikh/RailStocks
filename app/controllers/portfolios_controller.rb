require 'YahooFinance'

class PortfoliosController < ApplicationController
  before_filter :authenticate_user!

  # def initialize params
  #   @params = params
  # end

  def index
    portfolios = Portfolio.all
    portfolios.each_with_index do |portfolio, i|
      puts  "#{i+1}. #{portfolio.name}"
    end
  end

  def create
    portfolio = Portfolio.new(params[:portfolio])
    if portfolio.save
      puts "Success!  Your '#{portfolio.name}' portfolio has been created."
    else  
      puts "Sorry!  Your '#{portfolio.name}' portfolio did not save.  That portfolio name already exists."
    end
  end

  def destroy
    matching_portfolios = Portfolio.where(name: params[:portfolio][:name]).all
    matching_portfolios.each do |portfolio|
      portfolio.destroy
    puts "Destroyed!  Your '#{portfolio.name}' portfolio has been deleted."
    end
  end

  private

  def params
    @params
  end

end
