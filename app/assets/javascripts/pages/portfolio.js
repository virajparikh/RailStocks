$(document).ready(function() {

	var createPortfolioFromInput = function (name, strTickers) { 
	    var portfolio = {
	        name: name,
	        tickers_attributes: []
	    };
	    //replace any commas or semicolons the user might insert with spaces (g = global)
	    var space = ' ';
	    var tickers = strTickers.replace(/,/g, space).replace(/;/g, space).split(' ');  
		    for (var i = 0; i < tickers.length; i++) {
		        if (tickers[i]) {
		        	var tickerObj = { name: tickers[i] };
		            portfolio.tickers_attributes.push(tickerObj);
		        }	
		    }
	    return portfolio;
	};

	// var createYQLURL = function(portfolio){
	//     var baseYQLURL = 'https://query.yahooapis.com/v1/public/yql?env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json&q=';
	//     //.stocks = portfolio.stock.split("', '");
	// 	var yqlQuery = 'select * from yahoo.finance.quotes where symbol in (';
	// 	    for( var i = 0; i < portfolio.stocks.length; i++){
	// 	        yqlQuery += '"' + portfolio.stocks[i] + '"';
	// 	        yqlQuery += i === (portfolio.stocks.length - 1) ? "" : ",";		        
	// 	    }
	// 	    yqlQuery += ')';
	
	//     var yqlURL = baseYQLURL + encodeURI(yqlQuery);
	//     return yqlURL;
	// };

	var processTicker = function(ticker) {
		var tdo = new TickerDomainObject(ticker);
		ticker.id = ticker.symbol;
		ticker.ForwardPE = tdo.calcForwardPE();
		ticker.PriceToBook = tdo.calcPriceToBook();
		ticker.stMomentum = tdo.calcSTMomentum();
		ticker.ltMomentum = tdo.calcLTMomentum();
	};

	var showPortfolio = function(id) { 
		// replace the old stock table with the new stock table		
		$("#portfolioNameInHeader").empty();
		$("#stockTable").empty();
		$('#portfolioNameInHeader').html("Portfolio Analysis: <em>" + portfolio.name + "</em>");
		
		// var yqlurl = createYQLURL(portfolio);
		
		$.ajax({
			url: '/portfolios/' + id +'.json',
			type: "GET",
			dataType: "json",
			success: function() {
				
				processStock(stock);
				addStocksToTable(stock);
			    $("#portfolioAnalysisTable").tablesorter();

			// success: function(stocksjson) {
			// 	if ( stocksjson.query.results && stocksjson.query.results.quote ) {
			// 			for (var i = 0; i < stocksjson.query.count; i++) {  
			// 				var stock = stocksjson.query.results.quote[i]; //digs into the layers of the json file and returns only the relevant stock data
			// 				processStock(stock);
			// 				addStocksToTable(stock);	
			// 				$("#portfolioAnalysisTable").tablesorter();	//not working properly	
			// 			}
			// 	} else {
			// 		alert("Failed to retrieve data from Yahoo Finance. Please try again later.");
			// 	}
			} // End success
		}); // End .ajax()
	};

	var getPortfolios = function(){
		$.ajax({
			url: '/portfolios.json',
			type: "GET",			
			dataType: "json",
			success: function(portfolios) {   			 
	   			for (var i = 0; i < portfolios.length; i ++) {	   
	   				addPortfolioToTable(portfolios[i]);
	   			}
	   		}
	   	});
	}

//load portfolios created on document.ready
	getPortfolios();

//+++++++++++ Create Portfolio ++++++++++++++++++++++++++++++++++++++++++++
	var createPortfolio = function(portfolio){
		$.ajax({
			url: '/portfolios.json',
			type: "POST",
			data: JSON.stringify({portfolio: portfolio}),
			dataType: 'json',
			contentType:'application/json',
			success: function(portfolio) {    
	   			showPortfolio(portfolio);
	   			addPortfolioToTable(portfolio);  
	   		}
	   	});
	};

//+++++++++++ View Portfolio ++++++++++++++++++++++++++++++++++++++++++++
	var getAndShowPortfolio = function(id){
		$.ajax({
			url: '/portfolios/' + id +'.json',
			type: "GET",
			dataType: "json",
			success: function(portfolio) {
	   			showPortfolio(portfolio);
	   		}
	   	});
	};

//+++++++++++ Edit Portfolio ++++++++++++++++++++++++++++++++++++++++++++
	var getPortfolioForEdit = function(id){
		$.ajax({
			url: '/portfolios/' + id +'.json',   
			type: "GET",
			dataType: "json",
			success: function(portfolio) {
				$("#updatePortfolioName").attr("data-portfolioId", id);
	   			$("#updatePortfolioName").html(portfolio.name);
	   			$("#updateTickerInput").val(portfolio.stocks.join(' '));
	   		}
	   	});
	};

//+++++++++++ for use with Edit Portfolio button ++++++++++++++++++++++++++++++++++++++++++++
	var	updatePortfolio = function(portfolio){	
		var id = $("#updatePortfolioName").attr("data-portfolioId");
		portfolio.id = id;	
		$.ajax({
			url: '/portfolios/' + portfolio.id +'.json',
			type: "PUT",
			data: JSON.stringify(portfolio),
			contentType:'application/json',
			success: function() {
	   			showPortfolio(portfolio);
	   		}
	   	});
	};

//+++++++++++ Delete Portfolio ++++++++++++++++++++++++++++++++++++++++++++
	var deletePortfolio = function(id) {
		$.ajax({
			url: '/portfolios/' + id +'.json',
			type: "DELETE",
			dataType: "json",
			success: function() {   
				alert("The '"+ $("#" + id + " td h5").html() + "' portfolio was deleted.");  
				$('#' + id).remove();  
			} // End success
		}); // End .ajax()
	};

//+++++++++++ Create Portfolio Analysis Table ++++++++++++++++++++++++++++++++++++++++
	var addStocksToTable = function (ticker) {
      $('#stockTable').append(      	
	      	"<tr class='stockRow' id='" + ticker.id + "'>" +
	        "<td class='ticker'>" + ticker.id + "</td>" +
	        "<td class='name'>" + ticker.Name + "</td>" +
	        "<td align='right' class='right mktcap'>" + ticker.MarketCapitalization + "</td>" +
	        "<td align='center' class='fwdPE'>" + ticker.ForwardPE.toFixed(2) + "x</td>" +
	        "<td align='center' class='priceToBook'>" + ticker.PriceToBook.toFixed(2) + "x</td>" +
	        "<td class='stMomentum'>" + ticker.stMomentum + "</td>" +
	        "<td class='ltMomentum'>" + ticker.ltMomentum + "</td>" +
	        //"<td class='deleteStockIcon'>" + "<i class='icon-remove'></i>" + "</td>"
	        "</tr>"  
		    );
        };  

//+++++++++++ Create Portfolio List ++++++++++++++++++++++++++++++++++++++++   
    var addPortfolioToTable = function(portfolio) {
      $('#portfolioList').append(      	
      	'<tr class="portfolioRow" id="' + portfolio.id + '">' + '<td class="portfolioName">' + '<h5>' + portfolio.name + '</h5>' + '</td>' + '<td>' + '<div class="pull-right">' + 
      	'<button role="button" class="viewPortfolioBtn btn btn-info" >View Portfolio</button>' + '  ' + 
      	'<a href="#editPortfolioModal" role="button" data-toggle="modal" class="editPortfolioBtn btn btn-warning">Edit Portfolio</a>' + '  ' +
        '<button role="button" class="deletePortfolioBtn btn btn-danger" >Delete Portfolio</button></div>' + "</tr>"
        );
  	};

  	//clear fields in form
  	var clearForm = function() {
      $(".clearInputs").val("")
    };

//+++++++++++ Button Clicks ++++++++++++++++++++++++++++++++++++++++++   
	
	//Create Portfolio button
	$("#createPortfolioBtn").click(function(){
		var portfolio = createPortfolioFromInput($("#createPortfolioName").val(), $("#addTickerInput").val());
		createPortfolio(portfolio);
		clearForm();
		addPortfolioToTable(portfolio);
	});

	//View Portfolio button
	$("body").on("click", ".viewPortfolioBtn", function() {
		var p_id = $(this).closest("tr").attr('id')
		getAndShowPortfolio(p_id);
	})

	//Edit Portfolio button
	$("body").on("click", ".editPortfolioBtn", function() {
		var p_id = $(this).closest("tr").attr('id')
		getPortfolioForEdit(p_id);
	})
	//Edit Portfolio modal, Update Portfolio button
	$("#submitUpdatePortfolioBtn").click(function(){
		getPortfolioForEdit(portfolio);

		var portfolio = createPortfolioFromInput($("#updatePortfolioName").html(), $("#updateTickerInput").val());

		updatePortfolio(portfolio);
		clearForm();
	});

	//Delete Portfolio button
	$("body").on("click", ".deletePortfolioBtn", function() {
		var p_id = $(this).closest("tr").attr('id')
		deletePortfolio(p_id);
	})

	//Delete individual stocks from the table and the displayed portfolio
	$("body").on("click", ".deleteStockIcon", function(stock) {
		var st = $(this).closest("tr").attr('id')
		deleteStock(stock);
	})

	//Cancel and 'x' button
	$(".cancelBtn").click(function(){
		clearForm();
	});

}); // END DOC .READY() ========================================================= -->

