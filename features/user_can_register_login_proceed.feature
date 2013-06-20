Feature: User can register, log in, or proceed straight to the app
  In order to use RailStocks
  I want to register, log-in, or go straight to the app

Scenario: Successful Registration
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Password confirmation"
  And I click "Sign up"
  Then I should see "Sign out"

Scenario: Successful Log-In
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I click "Sign in"
  And I should see "Sign out"

Scenario: Unsuccessful Registration - bad username
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I fill in "bobexample.com" for "Email"
  And I fill in "password1" for "Password"
  And I fill in "password1" for "Password confirmation"
  And I click "Sign up"
  And I should see "Sign in"

Scenario: Unsuccessful Registration - bad password
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I fill in "bob@example.com" for "Email"
  And I fill in "p" for "Password"
  And I fill in "p1" for "Password confirmation"
  And I click "Sign up"
  And I should see "Sign up"
  And I should see "Sign in"

Scenario: Unsuccessful Registration - wrong password confirmation
  When I go to the homepage
  And I click "Register"
  And I should not see "Register"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password1" for "Password"
  And I fill in "password" for "Password confirmation"
  And I click "Sign up"
  And I should see "Sign up"
  And I should see "Sign in"

Scenario: Unsuccessful Log In - wrong username
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bobexample.com" for "Email"
  And I fill in "password1" for "Password"
  And I click "Sign in"
  And I should see "Sign up"
  And I should see "Sign in"

Scenario: Unsuccessful Log In - wrong password
  Given the user "bob@example.com" with password "password1"
  When I go to the homepage
  And I click "Log In"
  And I should not see "Log In"
  And I fill in "bob@example.com" for "Email"
  And I fill in "password" for "Password"
  And I click "Sign in"