@wip
Feature: User can create a stock portfolio
  In order to use RailStocks
  I want to to be able to create multiple stock portfolios
@javascript
Scenario: Create portfolio
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Password confirmation"
  And I click "Sign up"
  Then I should see "Sign out"
  And I should see "bob@example.com"
  And I should see "Create Portfolio"
  And I click "Create Portfolio"
  And I should see "Input your stock tickers here"
  And I fill in "Technology" for "Portfolio Name"
  And I fill in "AAPL GOOG MSFT FB" for "Tickers"
  And I click the "Add Portfolio" button
  And I should see "Apple Inc." 
  And I should see "Google Inc."
  And I should see "MSFT"
  And I should see "FB"
  And I should see "Technology"

Scenario: View portfolio
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I click "Sign in"
  And I click "Create Portfolio"
  And I should see "Create Your Portfolio"
  And I fill in "Banks" for "Portfolio Name"
  And I fill in "BAC C WFC JPM" for "Tickers"
  And I click the "Add Portfolio" button
  And I should see "Banks"
  And I click "View Portfolio"
  And I should see "Bank of America"

Scenario: Edit portfolio
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I click "Sign in"
  And I click "Create Portfolio"
  And I should see "Create Your Portfolio"
  And I fill in "Banks" for "Portfolio Name"
  And I fill in "BAC C WFC JPM" for "Tickers"
  And I click the "Add Portfolio" button
  And I should see "Banks"
  And I click "View Portfolio"
  And I should see "Bank of America"
  And I click the "Edit Portfolio" button
  

Scenario: Delete portfolio
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I click "Sign in"
  And I click "Create Portfolio"
  And I should see "Create Your Portfolio"
  And I fill in "Technology" for "Portfolio Name"
  And I fill in "AAPL GOOG MSFT FB" for "Tickers"
  And I click the "Add Portfolio" button
  And I should see "Technology"
  And I click "Delete Portfolio"
  And I click "OK"
  And I should not see "Technology"






