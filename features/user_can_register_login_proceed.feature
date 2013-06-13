Feature: User can register, log in, or proceed straight to the app
  In order to save my portfolios
  I want to register or log-in

Scenario: Successful Registration
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Re-Type Password"
  And I press "Sign Up"
  Then I should see "Congratulations! You have successfully registered as a RailStocks user."
  And I should not see "Log In"

Scenario: Successful Log-In
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Log-In"
  And I should not see "Log In"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I press "Log In"
  Then I should see "bob@example.com, you are now logged into RailStocks."
  And I should not see "Log In"

Scenario: Unsuccessful Registration - wrong username
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in e-mail "bobexample.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Re-Type Password"
  And I press "Sign Up"
  Then I should see "Sorry, that is an invalid username or password.  You must enter a valid e-mail address and 8 digit password."
  And I should see links to "Sign Up", "Log-In", and "Forget this, take me to RailStocks"

Scenario: Unsuccessful Registration - wrong password
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password" for "Password"
  And I fill in "password" for "Re-Type Password"
  And I press "Sign Up"
  Then I should see "Sorry, that is an invalid username or password.  You must enter a valid e-mail address and 8 digit password."
  And I should see links to "Sign Up", "Log-In", and "Forget this, take me to RailStocks"

Scenario: Unsuccessful Registration - wrong re-typed password
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in e-mail "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password" for "Re-Type Password"
  And I press "Sign Up"
  Then I should see "Sorry, your password and re-typed password did not match."
  And I should see links to "Sign Up", "Log-In", and "Forget this, take me to RailStocks"

Scenario: Unsuccessful Log In - wrong username
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click "Log-In"
  And I should not see "Log In"
  And I fill in e-mail "bobexample.com" for "Username"
  And I fill in "password1" for "Password"
  And I press "Log In"
  Then I should see "Sorry, that is not a valid username."
  And I should see links to "Home", "Log-In", and "Forget this, take me to RailStocks"