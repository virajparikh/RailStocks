
class PortfoliosController < ApplicationController
  before_filter :authenticate_user!

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
    portfolio.save
    render :nothing => true, :status => 200
    if portfolio.save
      flash[:notice] = "Success! Your '#{portfolio.name}' portfolio has been created."
    else  
      flash[:notice] = "Sorry! Your '#{portfolio.name}' portfolio did not save. That portfolio name already exists."
    end
  end

  def show
    respond_to do |format|
       format.json{ render json: Portfolio.includes(:tickers)
                                          .find_by_id_and_by_user_id(params[:id], get_user_id)
                                          .as_json(:include => :tickers)                   }
    end
  end

  def edit
  
  end

  def destroy
    portfolio = Portfolio.find(params[:id])
    portfolio.destroy
    index
  end

  private
   
  def get_user_id
    session["warden.user.user.key"][0][0]
  end
end
