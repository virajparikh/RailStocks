Given(/^the user "(.*?)" with password "(.*?)"$/) do |email, password|
  user = User.create( email: email, password: password)
  refute user.new_record?
end

When(/^I go to the homepage$/) do
  visit "/"
end

And(/^I (?:click|press) "(.*?)"$/) do |text|
  click_link_or_button text
end

And(/^I should not see "(.*?)"$/) do |content|
  page.should_not have_content content
end

When(/^I fill in "(.*?)" for "(.*?)"$/) do |value, email|
  fill_in email, with: value
end

Then(/^I should see "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should not see "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the Railstocks app page$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I should not see "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see links to "(.*?)", "(.*?)", and "(.*?)"$/) do |arg1, arg2, arg3|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should still see "(.*?)" for "(.*?)"$/) do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end