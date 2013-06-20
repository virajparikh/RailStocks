# How to get nested associations in JSON
# u.as_json(:include=>{ :portfolios => { :include => :tickers } } )
# u.as_json()

class PortfoliosController < ApplicationController
  before_filter :authenticate_user!

  # def initialize params
  #   @params = params
  # end

  def index
    portfolios = Portfolio.find_all_by_user_id(get_user_id)
    respond_to do |format|
      format.json{ render json: Portfolio.includes(:tickers)
                                         .find_all_by_user_id(get_user_id)
                                         .as_json(:include => :tickers)
                  }
      format.html{ render :index }
    end

 
  end

  def create
       
    portfolio = Portfolio.new(params[:portfolio])
    portfolio.user = User.find_by_id(get_user_id)
    
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

  def show
    respond_to do |format|
       format.json{ render json: Portfolio.includes(:tickers)
                                          .find_by_id_and_by_user_id(params[:id], get_user_id)
                                          .as_json(:include => :tickers)
                   }
    end
  end

  private
   
  def get_user_id
    session["warden.user.user.key"][0][0]
  end
end
