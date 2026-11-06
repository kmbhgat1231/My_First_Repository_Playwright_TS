Feature: OrangeHRM dashboard page
  As a logged-in OrangeHRM user
  I want to access the dashboard
  So that I can view the dashboard page

  Scenario: Open the dashboard page
    Given I open the OrangeHRM login page
    And I login with valid credentials
    When I open the dashboard URL
    Then I should see the dashboard page
    And I should see the Dashboard heading