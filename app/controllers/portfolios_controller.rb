
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
                                          .find_by_id(params[:id])
                                          .as_json(:include => :tickers)}
    end
  end

  def update(incoming_portfolio)
    portfolio = Portfolio.new(incoming_portfolio.id)
    portfolio.tickers = incoming_portfolio.tickers
    portfolio.save()
  end

  def destroy
    portfolio = Portfolio.find(params[:id])
    portfolio.destroy
    index
  end

  def details 
    symbols = Array.new() #["GOOG", "YHOO", "AAPL"]

    tickers = Ticker.find_all_by_portfolio_id(params[:id])
    tickers.each{ |t| 
      symbols << t.name
    }

    e_data = YahooFinance.get_extended_quotes(symbols)
    q_data = YahooFinance.get_standard_quotes(symbols)

    portfolio_hash = Hash.new()

    symbols.each do |symbol|

      portfolio_hash[symbol] = Hash.new()
      ticker4Client = portfolio_hash[symbol]

      standardQuote = q_data[symbol]
      extendedQuote = e_data[symbol]

      ticker4Client["symbol"] = extendedQuote.symbol
      ticker4Client["name"] = standardQuote.name
      ticker4Client["lastTrade"] = standardQuote.lastTrade
      ticker4Client["volume"] = standardQuote.volume
      ticker4Client["marketCap"] = extendedQuote.marketCap
      ticker4Client["dividendYield"] = extendedQuote.dividendYield
      ticker4Client["pricePerSales"] = extendedQuote.pricePerSales
      ticker4Client["peRatio"] = extendedQuote.peRatio
      ticker4Client["pricePerEPSEstimateCurrentYear"] = extendedQuote.pricePerEPSEstimateCurrentYear
      ticker4Client["pricePerEPSEstimateNextYear"] = extendedQuote.pricePerEPSEstimateNextYear
      ticker4Client["pricePerBook"] = extendedQuote.pricePerBook
      ticker4Client["pegRatio"] = extendedQuote.pegRatio
      ticker4Client["shortRatio"] = extendedQuote.shortRatio
      ticker4Client["movingAve50days"] = extendedQuote.movingAve50days
      ticker4Client["movingAve200days"] = extendedQuote.movingAve200days
    end

    respond_to do |format|
       format.json{ render json: portfolio_hash}
    end

  end

  private
   
  def get_user_id
    session["warden.user.user.key"][0][0]
  end
end
