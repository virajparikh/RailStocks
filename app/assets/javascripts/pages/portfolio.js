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
	    return portfolio;  // this is passed into the createPortfolio function below
	};

	var processTicker = function(ticker) {
		var tdo = new TickerDomainObject(ticker);
		ticker.stMomentum = tdo.calcSTMomentum();
		ticker.ltMomentum = tdo.calcLTMomentum();
	};

	var showPortfolio = function(portfolio) { 
		// replaces the old stock table with the new stock table		
		$("#portfolioNameInHeader").empty();
		$("#stockTable").empty();
		$('#portfolioNameInHeader').html("Portfolio Analysis: <em>" + portfolio.name + "</em>");
		
		$.ajax({
			url: '/portfolios/' + portfolio.id + '/details.json',
			type: "GET",
			dataType: "json",
			success: function(hashOfTickers) {
				for(symbol_which_is_key in hashOfTickers){
					ticker = hashOfTickers[symbol_which_is_key]
					processTicker(ticker);
					addStocksToTable(ticker);
				}
			    $("#portfolioAnalysisTable");
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
	   			var symbols = "";
	   			
	   			for(var i = 0; i < portfolio.tickers.length; i++){
	   				symbols += portfolio.tickers[i].name + " ";
	   			};
	   			
	   			$("#updateTickerInput").val(symbols);
	   		}
	   	});
	};

//+++++++++++ for use with Edit Portfolio button ++++++++++++++++++++++++++++++++++++++++++++
	var	updatePortfolio = function(portfolio){	
		var id = $("#updatePortfolioName").attr("data-portfolioId");
		debugger;
		portfolio.id = id;	
		$.ajax({
			url: '/portfolios/' + id +'.json',
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
				alert("The '"+ $("#" + id + " td h4").html() + "' portfolio was deleted.");  
				$('#' + id).remove();  
			} // End success
		}); // End .ajax()
	};

//+++++++++++ Create Portfolio Analysis Table ++++++++++++++++++++++++++++++++++++++++
	var addStocksToTable = function (ticker) {
      $('#stockTable').append(      	
	      	"<tr class='stockRow' id='" + ticker.id + "'>" +
	        "<td class='ticker'>" + ticker.symbol + "</td>" +
	        "<td class='companyName'>" + ticker.name + "</td>" +
	        "<td class='price'>$" + ticker.lastTrade + "</td>" +
	        "<td class='mktCap'>$" + ticker.marketCap + "</td>" +
	        "<td class='divYield'>" + ticker.dividendYield + "%</td>" +
	        "<td class='priceSales'>" + ticker.pricePerSales + "x</td>" +
	        "<td class='trailingPE'>" + ticker.peRatio + "x</td>" +
	        "<td class='currentPE'>" + ticker.pricePerEPSEstimateCurrentYear + "x</td>" +
	        "<td class='fwdPE'>" + ticker.pricePerEPSEstimateNextYear + "x</td>" +
	        "<td class='priceBook'>" + ticker.pricePerBook + "x</td>" +
	        "<td class='pegRatio'>" + ticker.pegRatio + "x</td>" +
	        "<td class='shortRatio'>" + ticker.shortRatio + "%</td>" +
	        "<td class='stMomentum'>" + ticker.stMomentum + "</td>" +
	        "<td class='ltMomentum'>" + ticker.ltMomentum + "</td>" +
	        "</tr>"  
		    );
        };  

//+++++++++++ Create Portfolio List ++++++++++++++++++++++++++++++++++++++++   
    var addPortfolioToTable = function(portfolio) {
      $('#portfolioList').append(      	
      	'<tr class="portfolioRow" id="' + portfolio.id + '">' + '<td class="portfolioName">' + '<em><h4>' + portfolio.name + '</h4></em>' + '</td>' + '<td>' + '<div class="pull-right">' + 
      	'<button role="button" class="viewPortfolioBtn btn btn-info" >View Portfolio</button>' + '  ' + 
      	'<a href="#editPortfolioModal" role="button" data-toggle="modal" class="editPortfolioBtn btn btn-warning">Edit Portfolio</a>' + '  ' +
        '<button role="button" class="deletePortfolioBtn btn btn-danger" >Delete Portfolio</button></div>' + "</tr>"
        );
  	};

//+++++++++++++++ Button Clicks ++++++++++++++++++++++++++++++++++++++++++   

  	//clear fields in form
  	var clearForm = function() {
      $(".clearInputs").val("")
    };

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

