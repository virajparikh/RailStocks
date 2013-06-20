    var TickerDomainObject = function(ticker){
    	this.ticker = ticker;
    };

    TickerDomainObject.prototype.calcSTMomentum = function() {
			var ticker = this.ticker,
				price_GT_50Day_GT_200Day = ticker.LastTradePriceOnly > ticker.FiftydayMovingAverage
											&& ticker.FiftydayMovingAverage > ticker.TwoHundreddayMovingAverage,
				price_LT_50Day_GT_200Day = ticker.LastTradePriceOnly < ticker.FiftydayMovingAverage 
				  						    && ticker.FiftydayMovingAverage > ticker.TwoHundreddayMovingAverage,
				price_GT_50day_LT_200Day = ticker.LastTradePriceOnly > ticker.FiftydayMovingAverage 
					   						&& ticker.FiftydayMovingAverage < ticker.TwoHundreddayMovingAverage,
				price_LT_50day_LT_200Day = ticker.LastTradePriceOnly < ticker.FiftydayMovingAverage 
					   						&& ticker.FiftydayMovingAverage < ticker.TwoHundreddayMovingAverage;

			if ( price_GT_50Day_GT_200Day ) {
				return "Positive ST Momentum"

			} else if ( price_LT_50Day_GT_200Day || price_GT_50day_LT_200Day ){
				return "Neutral ST Momentum"

			} else if (price_LT_50day_LT_200Day) {
				return "Negative ST Momentum"

			} else {
				return "!! Bad Data !!"
				}
	};
    
    TickerDomainObject.prototype.calcLTMomentum = function(){
		if (this.ticker.FiftydayMovingAverage > this.ticker.TwoHundreddayMovingAverage) { //_50Day_GT_200Day = ticker.FiftydayMovingAverage > ticker.TwoHundreddayMovingAverage,
			return "Positive LT Momentum";
		} else {
			return "Negative LT Momentum";
		}		
	};  

    TickerDomainObject.prototype.calcForwardPE = function(){
		return parseFloat(this.ticker.LastTradePriceOnly, 10) / parseFloat(this.ticker.EPSEstimateNextYear, 10);
    }
	
	TickerDomainObject.prototype.calcPriceToBook = function(){
    	return parseFloat(this.ticker.LastTradePriceOnly, 10) / parseFloat(this.ticker.BookValue, 10);
    };

	