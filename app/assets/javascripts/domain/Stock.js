    var TickerDomainObject = function(ticker){
    	this.ticker = ticker;
    };

    TickerDomainObject.prototype.calcSTMomentum = function() {
			var ticker = this.ticker,
				price_GT_50Day_GT_200Day = ticker.lastTrade > ticker.movingAve50days
										&& ticker.movingAve50days > ticker.movingAve200days,
				price_LT_50Day_GT_200Day = ticker.lastTrade < ticker.movingAve50days 
				  						&& ticker.movingAve50days > ticker.movingAve200days
				price_GT_50day_LT_200Day = ticker.lastTrade > ticker.movingAve50days 
					   					&& ticker.movingAve50days < ticker.movingAve200days,
				price_LT_50day_LT_200Day = ticker.lastTrade < ticker.movingAve50days 
					   					&& ticker.movingAve50days < ticker.movingAve200days;

			if ( price_GT_50Day_GT_200Day ) {
				return "Positive"

			} else if ( price_LT_50Day_GT_200Day || price_GT_50day_LT_200Day ){
				return "Neutral"

			} else if (price_LT_50day_LT_200Day) {
				return "Negative"
			
			} else {
				return "!! Bad Data !!"
				}
	};
    
    TickerDomainObject.prototype.calcLTMomentum = function(){
		if (this.ticker.movingAve50days > this.ticker.movingAve200days) { 
			return "Positive";
		
		} else {
			return "Negative";
		}		
	};  

    TickerDomainObject.prototype.calcForwardPE = function(){
		return (this.ticker.last_trade_price) / (this.ticker.eps_estimate_next_year);
    }

	TickerDomainObject.prototype.calcPriceToBook = function(){
    	return (this.ticker.last_trade_price) / (this.ticker.book_value);
    };

// for Apple: 

// YahooFinance::StandardQuote
// symbol = AAPL
// name = Apple Inc.
// lastTrade = 413.5
// date = 6/21/2013
// time = 4:00pm
// change = -3.338 - -0.80%
// changePoints = -3.338
// changePercent = -0.8
// previousClose = 416.838
// open = 418.9
// dayHigh = 420.0
// dayLow = 408.1001
// volume = 17187478
// dayRange = 408.1001 - 420.00
// lastTradeWithTime = Jun 21 - <b>413.50</b>
// tickerTrend = &nbsp;======&nbsp;
// averageDailyVolume = 17939600
// bid = 412.5
// ask = 413.1
// **********************************************************************
// YahooFinance::ExtendedQuote
// symbol = AAPL
// name = Apple Inc.
// weeks52Range = 385.10 - 705.07
// weeks52ChangeFromLow = 28.4
// weeks52ChangePercentFromLow = +7.37%
// weeks52ChangeFromHigh = -291.57
// weeks52ChangePercentFromHigh = -41.35%
// earningsPerShare = 41.896
// peRatio = 9.95
// shortRatio = 1.50
// dividendPayDate = May 16
// exDividendDate = Feb  7
// dividendPerShare = 7.95
// dividendYield = 1.91
// marketCap = 388.1B
// oneYearTargetPrice = 541.04
// epsEstimateCurrentYear = 39.61
// epsEstimateNextYear = 43.76
// epsEstimateNextQuarter = 8.27
// pricePerEPSEstimateCurrentYear = 10.52
// pricePerEPSEstimateNextYear = 9.53
// pegRatio = 0.5
// bookValue = 144.124
// pricePerBook = 2.89
// pricePerSales = 2.31
// ebitda = 57.381B
// movingAve50days = 431.59
// movingAve50daysChangeFrom = -18.09
// movingAve50daysChangePercentFrom = -4.19%
// movingAve200days = 505.657
// movingAve200daysChangeFrom = -92.157
// movingAve200daysChangePercentFrom = -18.23%
// sharesOwned = -
// pricePaid = -
// commission = -
// holdingsValue = -
// dayValueChange = - - -0.80%
// holdingsGainPercent = - - -
// holdingsGain = -
// tradeDate = -
// annualizedGain = -
// highLimit = -
// lowLimit = -
// notes = -
// stockExchange = NasdaqNM


// The full list of YahooFinance fields follows:
//      :ask
//      :average_daily_volume
//      :ask_size
//      :bid
//      :ask_real_time
//      :bid_real_time
//      :book_value b4
//      :bid_size b6
//      :chance_and_percent_change
//      :change
//      :comission
//      :change_real_time
//      :after_hours_change_real_time
//      :dividend_per_share
//      :last_trade_date
//      :trade_date
//      :earnings_per_share
//      :error_indicator 
//      :eps_estimate_current_year 
//      :eps_estimate_next_year 
//      :eps_estimate_next_quarter 
//      :float_shares 
//      :low 
//      :high 
//      :low_52_weeks 
//      :high_52_weeks 
//      :holdings_gain_percent 
//      :annualized_gain 
//      :holdings_gain 
//      :holdings_gain_percent_realtime 
//      :holdings_gain_realtime 
//      :more_info 
//      :order_book 
//      :market_capitalization 
//      :market_cap_realtime 
//      :ebitda 
//      :change_From_52_week_low 
//      :percent_change_from_52_week_low 
//      :last_trade_realtime_withtime 
//      :change_percent_realtime 
//      :last_trade_size 
//      :change_from_52_week_high 
//      :percent_change_from_52_week_high 
//      :last_trade_with_time 
//      :last_trade_price
//      :close 
//      :high_limit 
//      :low_limit 
//      :days_range
//      :days_range_realtime 
//      :moving_average_50_day 
//      :moving_average_200_day 
//      :change_from_200_day_moving_average 
//      :percent_change_from_200_day_moving_average 
//      :change_from_50_day_moving_average 
//      :percent_change_from_50_day_moving_average 
//      :name 
//      :notes 
//      :open 
//      :previous_close 
//      :price_paid 
//      :change_in_percent 
//      :price_per_sales 
//      :price_per_book 
//      :ex_dividend_date
//      :pe_ratio 
//      :dividend_pay_date 
//      :pe_ratio_realtime 
//      :peg_ratio 
//      :price_eps_estimate_current_year 
//      :price_eps_Estimate_next_year 
//      :symbol 
//      :shares_owned 
//      :short_ratio 
//      :last_trade_time 
//      :trade_links 
//      :ticker_trend 
//      :one_year_target_price 
//      :volume
//      :holdings_value 
//      :holdings_value_realtime 
//      :weeks_range_52 
//      :day_value_change 
//      :day_value_change_realtime 
//      :stock_exchange 
//      :dividend_yield 

	