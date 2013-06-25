var TickerDomainObject = function(ticker){
  this.ticker = ticker;
};

TickerDomainObject.prototype.calcSTMomentum = function() {
	// var ticker = this.ticker,
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

// TickerDomainObject.prototype.calcForwardPE = function(){
// 	return (this.ticker.last_trade_price) / (this.ticker.eps_estimate_next_year);
// }

// TickerDomainObject.prototype.calcPriceToBook = function(){
// 	return (this.ticker.last_trade_price) / (this.ticker.book_value);
// };

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

	