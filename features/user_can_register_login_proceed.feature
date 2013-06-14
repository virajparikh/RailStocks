Feature: User can register, log in, or proceed straight to the app
  In order to use RailStocks
  I want to register, log-in, or go straight to the app

Scenario: Successful Registration
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Re-Type Password"
  And I click "Sign Up"
  Then I should see "Congratulations bob@example.com, you have successfully registered as a RailStocks user."
  And I should see "Proceed to RailStocks"
  And I should not see "Log In"
  And I should see "Log Out"

Scenario: Successful Log-In
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I click "Log In"
  Then I should see "Signed in as bob@example.com. Not you? Sign out."
  And I should not see "Log In"
  And I should see "Log Out"

Scenario: Unsuccessful Registration - bad username
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in "bobexample.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Re-Type Password"
  And I click "Sign Up"
  Then I should see "Sorry, that is an invalid username or password.  You must enter a valid e-mail address and 8 digit password."
  And I should see "Sign Up"
  And I should see "Log In"
  And I should see "Just take me to RailStocks"

Scenario: Unsuccessful Registration - bad password
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in "bob@example.com" for "Username"
  And I fill in "password" for "Password"
  And I fill in "password" for "Re-Type Password"
  And I click "Sign Up"
  Then I should see "Sorry, that is an invalid username or password.  You must enter a valid e-mail address and 8 digit password."
  And I should see "Sign Up"
  And I should see "Log In"
  And I should see "Just take me to RailStocks"

Scenario: Unsuccessful Registration - wrong re-typed password
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Register"
  And I should not see "Register" or "Log In"
  And I fill in "bob@example.com" for "Username"
  And I fill in "password1" for "Password"
  And I fill in "password" for "Re-Type Password"
  And I click "Sign Up"
  Then I should see "Sorry, your password and re-typed password did not match."
  And I should see "Sign Up"
  And I should see "Log In"
  And I should see "Just take me to RailStocks"

Scenario: Unsuccessful Log In - wrong username
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bobexample.com" for "Username"
  And I fill in "password1" for "Password"
  And I click "Log In"
  Then I should see "Sorry, that is not a valid username or password."
  And I should still see "bob@example.com" for "Username"
  And I should still see "password1" for "Password"
  And I should see "Sign Up"
  And I should see "Log In"
  And I should see "Just take me to RailStocks"

Scenario: Unsuccessful Log In - wrong password
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Username"
  And I fill in "password" for "Password"
  And I click "Log In"
  Then I should see "Sorry, that is not a valid username or password."
  And I should still see "bob@example.com" for "Username"
  And I should still see "Password" for "Password"
  And I should see "Sign Up"
  And I should see "Log In"
  And I should see "Just take me to RailStocks"