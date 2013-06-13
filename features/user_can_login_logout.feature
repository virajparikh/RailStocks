Feature: Users can log in and log out
  In order to save my portfolios
  As a user
  I want to log in

Scenario: Happy Path
  Given the user “bob@example.com” with password “password1”
  When I go to the homepage
  And I click “Log In”
  And I fill in "password1" for "Password"
  And I press "Log In"
  Then I should see "You are now loggin in"
  And I should not see "Log In"

Scenario: Wrong Password
  Given the user “bob@example.com” with password “password1”
  When I got to the homepage
  And I click “Log In”
  And I fill in "password1" for "Password"
  And I fill in "wrong password" for "Password"
  And I press "Log In"
  Then I should see "Your username and password is incorrect.  Please try again."

Scenario: Wrong Username
  Given the user “bob@example.com” with password “password1”
  When I got to the homepage
  And I click “Log In”
  And I fill in "wrong username" for "Username"
  And I press "Log In"
  Then I should see "Your username and password is incorrect.  Please try again."