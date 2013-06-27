When(/^I go to the homepage$/) do
  visit "/"
end

And(/^I (?:click|press) "(.*?)"$/) do |text|
  click_link_or_button text
end

And(/^I (?:click|press) the "(.*?)" button$/) do |text|
  click_link_or_button text
  page.driver.browser.switch_to.alert.accept
end

And(/^I should not see "(.*?)"$/) do |content|
  page.should_not have_content(content)
end

And(/^I fill in "(.*?)" for "(.*?)"$/) do |value, email|
  fill_in email, with: value
end

Then(/^I should see "(.*?)"$/) do |content|
  page.should have_content(content)
end

Given(/^the user "(.*?)" with password "(.*?)"$/) do |email, password|
  user = User.create( email: email, password: password)
  refute user.new_record?
end

