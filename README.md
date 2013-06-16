Purpose
-------
RailStocks is a portfolio management and valuation app.


Project Status
--------------

[![Code Climate](https://codeclimate.com/github/virajparikh/RailStocks.png)](https://codeclimate.com/github/virajparikh/RailStocks)

[![Build Status](https://travis-ci.org/virajparikh/RailStocks.png)](https://travis-ci.org/virajparikh/RailStocks)


Features
--------
1. User sign-in and authentication
2. Portfolio(s) creation
3. Add, edit, delete tickers in a portfolio
4. Obtain a range of about 80 stock and valuation data points from Yahoo Finance
5. Historical stock prices for customized date ranges
6. View a pre-packaged stock and valuation summary of your portfolio

User Experience
-
1. When you go to the RailStocks site for the first time, you will see buttons to:
-
- Register for RailStocks
- Log into RailStocks
- go directly to RailStocks
- Other resources - to be developed in future versions of RailStocks:
- - SEC Edgar database access
- - StockTwits functionality
- - Investor education resources
- Help

2. If you register for a RailStocks account, you will see:
-
- your e-mail address (which is your username)
- button to Log Out
- button to go to RailStocks.  If you go to RailStocks, you will see a:
- - Create Portfolio button to create a stock portfolio or multiple portfolios.  You will then be given the option to:
- - - Save the portfolio(s)
- - - Add and delete stock tickers in a portfolio
- - - Evaluate a portfolio of stocks on a variety of metrics that are available through Yahoo Finance
- - - Field to input a stock ticker.  This will return:
- - - - data and analytics
- - - - historical price quote options

3. If you go directly to RailStocks without registering for an account, you will see a list of functions:
-
- Create Portfolio button  
- - If pressed, you be prompted to register for an account.  You cannot create portfolio(s) without registering

- - User is prompt to return to #1
- Input ticker field.  This will return:
- - data and analytics
- - historical price quote options

4. Upon returning to RailStocks, you be given the option to:
-
- Register for an account
- Log into current account.  User sees:
- - all previously created portfolios
- - grid display of portfolio #1
- Log Out button
- - see #2
- Just go to RailStocks - see #3
- Help button


Gems Used
--------
Devise - user sign-in and authentication
YahooFinance - stock data

Bugs
----
Yup

About Author
------------
Viraj Parikh is an investment research analyst and portfolio manager for most of his professional career.  He has worked with the most widely used data services on the market, including Bloomberg, Capital IQ and Factset.  He has also made extensive use of free web sites, including Yahoo Finance, Google Finance and Finviz.  These experiences have shaped his vision for this app.

License
--------
The MIT License (MIT)

Copyright (c) 2013 Viraj Parikh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.