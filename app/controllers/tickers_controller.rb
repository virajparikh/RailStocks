class TickersController < ApplicationController
  def initialize params
    @portfolio_id = Portfolio.where(name: params[:portfolio][:name]).first.id
  end

  def view
  	tickers = Ticker.where(portfolio_id: @portfolio_id).all
    tickers.each_with_index do |ticker, i|
      puts  "#{i+1}. #{ticker.name}"
    end
  end

  def edit
  	view
  	puts "Would you like to add or delete stock tickers from this portfolio? [a/d]"
  	input = $stdin.gets.chomp
    if input == "a"
      return add_ticker
    else delete_ticker
    end
  end

  def add_ticker
  	puts "Add a stock ticker:"
  	stock_name = $stdin.gets.chomp.upcase
    Ticker.create(name: stock_name, portfolio_id: @portfolio_id)
  	while stock_name != "QUIT" do
  	  puts "Add another stock ticker (press 'quit' to exit):"
  	  stock_name = $stdin.gets.chomp.upcase
      Ticker.create(name: stock_name, portfolio_id: @portfolio_id) unless stock_name == "QUIT" || stock_name == ""
    end
    view
  end

  def delete_ticker
  	puts "Delete which stock ticker?"
    stock_name = $stdin.gets.chomp.upcase
    matching_ticker = Ticker.where(name: stock_name, portfolio_id: @portfolio_id)
    matching_ticker.each do |ticker|
      ticker.destroy
    end
    
    while stock_name != "QUIT" do
      puts "Delete another stock ticker (press 'quit' to exit):"
      stock_name = $stdin.gets.chomp.upcase
      matching_ticker = Ticker.where(name: stock_name, portfolio_id: @portfolio_id)
      matching_ticker.each do |ticker|
        ticker.destroy unless stock_name == "QUIT" || stock_name == ""
      end
    end
    view
  end

  def ticker
  	puts "See all portfolios for the following ticker:"
  	ticker_name = $stdin.gets.chomp.upcase
  	portfolios = Ticker.where(name: ticker_name).all
  	portfolios.each_with_index do |p, i|
  		puts "#{i + 1}. #{p.portfolio.name}"
  	end
  end

  private

  def params
    @params
  end
end
