    var StockDomainObject = function(stock){
    	this.stock = stock;
    };

    StockDomainObject.prototype.calcSTMomentum = function() {
			var stock = this.stock,
				price_GT_50Day_GT_200Day = stock.LastTradePriceOnly > stock.FiftydayMovingAverage
											&& stock.FiftydayMovingAverage > stock.TwoHundreddayMovingAverage,
				price_LT_50Day_GT_200Day = stock.LastTradePriceOnly < stock.FiftydayMovingAverage 
				  						    && stock.FiftydayMovingAverage > stock.TwoHundreddayMovingAverage,
				price_GT_50day_LT_200Day = stock.LastTradePriceOnly > stock.FiftydayMovingAverage 
					   						&& stock.FiftydayMovingAverage < stock.TwoHundreddayMovingAverage,
				price_LT_50day_LT_200Day = stock.LastTradePriceOnly < stock.FiftydayMovingAverage 
					   						&& stock.FiftydayMovingAverage < stock.TwoHundreddayMovingAverage;

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
    
    StockDomainObject.prototype.calcLTMomentum = function(){
		if (this.stock.FiftydayMovingAverage > this.stock.TwoHundreddayMovingAverage) { //_50Day_GT_200Day = stock.FiftydayMovingAverage > stock.TwoHundreddayMovingAverage,
			return "Positive LT Momentum";
		} else {
			return "Negative LT Momentum";
		}		
	};  

    StockDomainObject.prototype.calcForwardPE = function(){
		return parseFloat(this.stock.LastTradePriceOnly, 10) / parseFloat(this.stock.EPSEstimateNextYear, 10);
    }
	
	StockDomainObject.prototype.calcPriceToBook = function(){
    	return parseFloat(this.stock.LastTradePriceOnly, 10) / parseFloat(this.stock.BookValue, 10);
    };

	