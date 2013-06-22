// lastTrade: 413.5
// marketCap: "388.1B"
// movingAve50days: "431.59"
// movingAve200days: "505.657"
// name: "Apple Inc."
// pricePerBook: 2.89
// pricePerEPSEstimateNextYear: "9.53"
// symbol: "AAPL"
// volume: 17187478

    var TickerDomainObject = function(ticker){
    	this.ticker = ticker;
    };

    TickerDomainObject.prototype.calcSTMomentum = function() {
			var ticker = this.ticker,
				price_GT_50Day_GT_200Day = ticker.lastTrade > ticker.											movingAve50days
											&& ticker.movingAve50days > ticker.movingAve200days,
	// :last_trade_price > :moving_average_50_day && :moving_average_50_day >:moving_average_200_day 
				price_LT_50Day_GT_200Day = ticker.lastTrade < ticker.											movingAve50days 
				  						    && ticker.movingAve50days > ticker.movingAve200days,
	// :last_trade_price < :moving_average_50_day && :moving_average_50_day >:moving_average_200_day 
				price_GT_50day_LT_200Day = ticker.lastTrade > ticker.											movingAve50days 
					   						&& ticker.movingAve50days < ticker.movingAve200days,
	// :last_trade_price > :moving_average_50_day && :moving_average_50_day <:moving_average_200_day 
				price_LT_50day_LT_200Day = ticker.lastTrade < ticker.											movingAve50days 
					   						&& ticker.movingAve50days < ticker.movingAve200days;
	// :last_trade_price < :moving_average_50_day && :moving_average_50_day <:moving_average_200_day 

			if ( price_GT_50Day_GT_200Day ) {
				return "Positive ST Momentum"
	// :last_trade_price > :moving_average_50_day && :moving_average_50_day >:moving_average_200_day 

			} else if ( price_LT_50Day_GT_200Day || price_GT_50day_LT_200Day ){
				return "Neutral ST Momentum"
	// :last_trade_price > :moving_average_50_day && :moving_average_50_day <:moving_average_200_day 
	// :last_trade_price < :moving_average_50_day && :moving_average_50_day >:moving_average_200_day 

			} else if (price_LT_50day_LT_200Day) {
				return "Negative ST Momentum"
	// :last_trade_price < :moving_average_50_day && :moving_average_50_day <:moving_average_200_day 

			} else {
				return "!! Bad Data !!"
				}
	};
    
    TickerDomainObject.prototype.calcLTMomentum = function(){
		if (this.ticker.movingAve50days > this.ticker.movingAve200days) { //_50Day_GT_200Day = ticker.movingAve50days > ticker.movingAve200days,
			return "Positive LT Momentum";
	// :moving_average_50_day >:moving_average_200_day 
		} else {
			return "Negative LT Momentum";
	// :moving_average_50_day <:moving_average_200_day 

		}		
	};  

    TickerDomainObject.prototype.calcForwardPE = function(){
		return parseFloat(this.ticker.lastTrade, 10) / parseFloat(this.ticker.EPSEstimateNextYear, 10);
    }
    // :last_trade_price / :eps_estimate_next_year 
	
	TickerDomainObject.prototype.calcPriceToBook = function(){
    	return parseFloat(this.ticker.lastTrade, 10) / parseFloat(this.ticker.BookValue, 10);
    };
    // :price_per_book

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

	