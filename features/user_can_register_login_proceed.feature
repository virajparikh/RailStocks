Feature: User can register, log in, or proceed straight to the app
  In order to save my portfolios
  I want to register or log-in

Scenario: Successful Registration
  Given the user "bob@example.com" with password “password1”
  When I go to the homepage
  And I click "Register"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Re-Type Password"
  And I press "Sign Up"
  Then I should see "Congratulations! You have successfully registered as a RailStocks user."
  And I should not see "Log In"

Scenario: Successful Log-In
  Given the user "bob@example.com" with password “password1”
  When I go to the homepage
  And I click "Log-In"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I press "Log In"
  Then I should see "bob@example.com, you are now logged into RailStocks."
  And I should not see "Log In"