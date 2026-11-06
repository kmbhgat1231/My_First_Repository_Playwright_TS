Feature: OrangeHRM login
  As an OrangeHRM user
  I want to sign in with my credentials
  So that I can access the application securely

  Background:
    Given I open the OrangeHRM login page

  Scenario: Login with valid credentials
    When I log in with valid credentials
    Then I should be taken to the OrangeHRM dashboard

  Scenario: Login with invalid credentials
    When I log in with invalid credentials
    Then I should see an invalid credentials message

  Scenario: Login without a username
    When I log in without a username
    Then I should see a required message for the username

  Scenario: Login without a password
    When I log in without a password
    Then I should see a required message for the password
